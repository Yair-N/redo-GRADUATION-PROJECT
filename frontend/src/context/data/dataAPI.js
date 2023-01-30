
import baseAxios from '../../utils/customAxios'
import axios from 'axios';
import { DATA_URL } from '../../utils/urls'

export const fetchAirports = () => {
    return new Promise((resolve) => {
        console.log('fired fetchAirports')
        baseAxios.get(DATA_URL.AIRPORTS_LIST).then((res) => resolve(res))
            .catch((error) => {
                alert(error.response.data)
            })
    })
        ;
}




export const fetchAirlines = () => {
    return new Promise((resolve) => {
        baseAxios.get(DATA_URL.AIRLINES_LIST).then((res) => resolve(res))
            .catch((error) => {
                alert(error.response.data)
            })
    })
        ;
}

export const fetchCountries = () => {
    return new Promise((resolve) => {
        console.log('fired fetchCountris')

        baseAxios.get(DATA_URL.COUNTRIES_LIST).then((res) => resolve(res))
            .catch((error) => {
                alert(error.response.data)
            })
    })
        ;
}
// stock axios for external request
export const fetchFullCountries = () => {
    return new Promise((resolve) => {
        console.log('fired fetchCountris')

        axios.get(DATA_URL.FULL_COUNTRIES_LIST).then((res) => resolve(res))
            .catch((error) => {
                alert(error.response.data)
            })
    })
        ;
}