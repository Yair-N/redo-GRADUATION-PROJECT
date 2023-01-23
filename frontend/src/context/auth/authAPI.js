
import  axios from '../../utils/customAxios'
import {AUTH_URL} from '../../utils/urls'

export const signIn = (user) => {
    return new Promise((resolve,reject) =>{
    axios.post(AUTH_URL.LOGIN, user).then((res) => resolve(res))
    .catch((error) => {
        reject(error.response.data)
        })})
;}




export const register = (user) => {
    
    return new Promise((resolve,reject) =>{
    axios.post(AUTH_URL.REGISTER, user).then((res) => resolve(res))
    .catch((err) => {
        reject(err.response.data)
        })})
;}

