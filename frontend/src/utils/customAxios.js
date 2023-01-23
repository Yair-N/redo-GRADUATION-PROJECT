
// source https://github.com/gitdagray/react_Bearer_auth.git

import axios from 'axios';
import { AUTH_URL, BASE_URL } from "./urls";


export const privateAxios = axios.create({
    timeout: 4000,
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    // withCredentials: true
});

privateAxios.interceptors.request.use(function (config) {
    const sessionToken = sessionStorage.getItem("access_token");
    if (!config.headers['Authorization']) {
        config.headers['Authorization'] = `Bearer ${sessionToken}`;
    }
    return config;
}, (error) => Promise.reject(error)
);


privateAxios.interceptors.response.use(
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
            originalRequest.url === BASE_URL + AUTH_URL.REFRESH
        ) {
            // window.location.href = '/login/';
            return Promise.reject(error);
        }


        if (
            error.response.data.code === 'token_not_valid' &&
            error.response.status === 401 &&
            error.response.statusText === 'Unauthorized'
        ) {
            const refreshToken = sessionStorage.getItem('refreshToken');

            if (refreshToken) {
                const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));

                // exp date in token is expressed in seconds, while now() returns milliseconds:
                const now = Math.ceil(Date.now() / 1000);
                console.log(tokenParts.exp);

                if (tokenParts.exp > now) {
                    return privateAxios
                        .post(AUTH_URL.REFRESH, {
                            refresh: refreshToken,
                        })
                        .then((response) => {
                            // alert('got refresh')
                            sessionStorage.setItem('accessToken', response.data.access);
                            sessionStorage.setItem('refreshToken', response.data.refresh);

                            privateAxios.defaults.headers['Authorization'] =
                                'Bearer ' + response.data.access;
                            originalRequest.headers['Authorization'] =
                                'Bearer ' + response.data.access;

                            return privateAxios(originalRequest);
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                } else {
                    console.log('Refresh token is expired', tokenParts.exp, now);
                    alert('you are not logged in')
                    // window.location.href = '/login/';
                }
            } else {
                console.log('Refresh token not available.');
                alert('you are not logged in')
                // window.location.href = '/login/';
            }
        }

        // specific error handling done elsewhere
        return Promise.reject(error);
    }
);


const baseAxios = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },

});


baseAxios.interceptors.response.use(
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
            error.response.status === 401
        ) {
            alert('Check your email or password,\n note that email is also case sensitive')
            // window.location.href = '/login/';
            return Promise.reject(error);
        }
        if (
            error.response.status === 409
        ) {
            // window.location.href = '/login/';
            alert('Email already in use')
            return Promise.reject(error);
        }
        return Promise.reject(error);
    }
)

export default baseAxios