import axios from "axios"


export const getCountries = async () => {
    const request = axios.create({
        baseURL: 'https://restcountries.com/v2/all',
        // timeout: 1000,
    });

    return new Promise((resolve) => {
        console.log('API countries')
        request.get().then((res) =>
            resolve(res)
        )
    })


}



