import axios from "../../utils/customAxios";
import { FLIGHT_URL } from '../../utils/urls';



export const searchFlights = (parameters) => {
    return new Promise((resolve,reject) =>{
    axios.get(parameters).then((res) => resolve(res))
    .catch((err) => {
        reject(err.response.data)
        })})


;}


