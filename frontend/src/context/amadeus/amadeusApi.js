import axios from "../../utils/amadeusAxios";
import { AMADEUS_FLIGHT_OFFERS } from '../../utils/urls';


const today = new Date();
const future = new Date().setDate(new Date().getDate() + 5)
const defaultParameters = {
originLocationCode:'TLV',
destinationLocationCode:'LON',
departureDate: today,
returnDate:future,
adults:2,
max:5
}

export const searchFlights = (params = defaultParameters) => {
    return new Promise((resolve,reject) =>{
    axios.get(AMADEUS_FLIGHT_OFFERS, params).then((res) => resolve(res))
    .catch((err) => {
        reject(err.response.data)
        })})


;}


