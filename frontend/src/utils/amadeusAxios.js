import axios from 'axios';
import { AMADEUS_AUTH ,AMADEUS_BASE} from './urls';



const body = {
        client_id: process.env.AMADEUS_API_Key,
        client_secret: process.env.AMADEUS_API_Secret,
        grant_type:'client_credentials' 
}

const amadeusAxios = axios.create({
    timeout: 4000,
    baseURL: AMADEUS_BASE,
    headers: { 'Content-Type': 'application/json' },
});


amadeusAxios.interceptors.request.use(function (config) {
    const sessionToken = sessionStorage.getItem("amadeus_token");
    if (!config.headers['Authorization']) {
        config.headers['Authorization'] = `Bearer ${sessionToken}`;
    }
    return config;
}, (error) => Promise.reject(error)
);

amadeusAxios.interceptors.response.use(
    (response) => {
        return response;
    },
    async function (error) {
        const originalRequest = error.config;

        if (typeof error.response === 'undefined') {
            alert(
                'A server/network error occurred. ' +
                'Looks like CORS might be the problem. ' +
                'Sorry about this - we will get it fixed shortly.'
            );
            return Promise.reject(error);
        }

        if (
            error.response.status === 401 &&
            originalRequest.url === AMADEUS_BASE + AMADEUS_AUTH
        ) {
            return Promise.reject(error);
        }
        

        if (
            // error.response.data.code === 'token_not_valid' |
            error.response.status === 401 |
            error.response.statusText === 'Unauthorized'
        ) {
            
            return amadeusAxios
            .post(
                AMADEUS_AUTH,
               {
                    client_id: process.env.AMADEUS_API_Key,
                    client_secret: process.env.AMADEUS_API_Secret,
                    grant_type:'client_credentials' }
            ,
                {headers:{
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization':""
            }})
            .then((response) => {
                sessionStorage.setItem('amadeus_token', response.data.access);

                amadeusAxios.defaults.headers['Authorization'] =
                    'Bearer ' + response.data.access;
                originalRequest.headers['Authorization'] =
                    'Bearer ' + response.data.access;
                                
                return amadeusAxios(originalRequest);
            })
            .catch((err) => {
                console.log(err);
            });
        }

        return Promise.reject(error);
    }
);


export default amadeusAxios