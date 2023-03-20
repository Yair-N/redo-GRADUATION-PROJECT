
import  axios from '../../utils/customAxios'
import {AIRLINE_URL} from '../../utils/urls'

export const getAirlines = () => {
    return new Promise((resolve,reject) =>{
    axios.get(AIRLINE_URL.AIRLINES_LIST).then((res) => resolve(res))
    .catch((err) => {
        reject(err.response.data)
        })})


;}

