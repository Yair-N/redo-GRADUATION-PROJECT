
import  {privateAxios} from '../../utils/api/customAxios'
import {USER_URL} from '../../utils/api/urls'
import { BOOK_FLIGHT } from '../../utils/api/urls'
const axios = privateAxios

export const getUserProfile = () => {
    return new Promise((resolve,reject) =>{
    axios.get(USER_URL.USER_PROFILE).then((res) => resolve(res))
    .catch((err) => {
        reject(err.response.data)
        })})
;}


export const uploadPicture = (form) => {

    return new Promise((resolve,reject) =>{
    axios.put(USER_URL.UPLOAD_IMAGE, form).then((res) => resolve(res))
    .catch((err) => {
        reject(err.response.data)
        })})
;}

export const updateUserProfile = (profile) => {

    return new Promise((resolve,reject) =>{
    axios.put(USER_URL.USER_PROFILE, profile).then((res) => resolve(res))
    .catch((err) => {
        reject(err.response.data)
        })})
;}


export const bookFlight = (flight, seats=1) => {
    return new Promise((resolve,reject) =>{
    axios.get(BOOK_FLIGHT(flight, 1)).then((res) => resolve(res))
    .catch((err) => {
        reject(err.response.data)
        })})
;}
