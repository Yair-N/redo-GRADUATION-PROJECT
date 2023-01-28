
import baseAxios from '../../utils/customAxios'
import axios from 'axios';
import { STATIC_URL } from '../../utils/urls'

export const fetchAirports = () => {
    return new Promise((resolve) => {
        console.log('fired fetchAirports')
        baseAxios.get(STATIC_URL.AIRPORTS_LIST).then((res) => resolve(res))
            .catch((error) => {
                alert(error.response.data)
            })
    })
        ;
}




export const fetchAirlines = () => {
    return new Promise((resolve) => {
        baseAxios.get(STATIC_URL.AIRLINES_LIST).then((res) => resolve(res))
            .catch((error) => {
                alert(error.response.data)
            })
    })
        ;
}


// stock axios for external request
export const fetchCountries = () => {
    return new Promise((resolve) => {
        console.log('fired fetchCountris')

        axios.get(STATIC_URL.COUNTRIES_LIST).then((res) => resolve(res))
            .catch((error) => {
                alert(error.response.data)
            })
    })
        ;
}