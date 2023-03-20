import { ADMIN_URL } from "../../utils/urls";
import { privateAxios } from '../../utils/customAxios'

const axios = privateAxios


export const getUsers = () => {
    return new Promise((resolve, reject) => {

        axios.get(ADMIN_URL.ALL_USERS).then((res) => resolve(res))
            .catch((err) => {
                reject(err.response.data)
            })

        
    })
        ;
}