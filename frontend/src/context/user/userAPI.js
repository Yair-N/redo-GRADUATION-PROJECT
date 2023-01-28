
import { privateAxios } from '../../utils/customAxios'
import { USER_URL, BOOK_FLIGHT } from '../../utils/urls'


export const getUserProfile = () => {
    return new Promise((resolve, reject) => {
        privateAxios.get(USER_URL.USER_PROFILE).then((res) => resolve(res))
            .catch((err) => {
                reject(err.response.data)
            })
    })
        ;
}


export const uploadPicture = (form) => {

    return new Promise((resolve, reject) => {
        privateAxios.put(USER_URL.UPLOAD_IMAGE, form).then((res) => resolve(res))
            .catch((err) => {
                reject(err.response.data)
            })
    })
        ;
}

export const updateUserProfile = (profile) => {

    return new Promise((resolve, reject) => {
        privateAxios.put(USER_URL.USER_PROFILE, profile).then((res) => resolve(res))
            .catch((err) => {
                reject(err.response.data)
            })
    })
        ;
}


export const bookFlight = (flight, seats = 1) => {
    return new Promise((resolve, reject) => {
        privateAxios.get(BOOK_FLIGHT(flight, 1)).then((res) => resolve(res))
            .catch((err) => {
                reject(err.response.data)
            })
    })
        ;
}
