
import axios from "../../../utils/api/customAxios";
import { LOCATION_URL } from "../../../utils/api/urls";
export const getAirports = (origin_id) => {
    let id = origin_id ? origin_id +'/' : 0
    return new Promise((resolve,reject) =>{
     axios.get(LOCATION_URL.GET_AIRPORTS+id).then((res) => resolve(res))
    .catch((err) => {
        // alert(`${JSON.stringify(err.response.data.detail)}`)
        console.warn(`${JSON.stringify(err.response.data)}`)
        reject(err.response.data)
        })}
    );}
  