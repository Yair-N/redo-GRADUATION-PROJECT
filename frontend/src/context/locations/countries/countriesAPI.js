
import axios from "../../../utils/api/customAxios";
import { LOCATION_URL } from "../../../utils/api/urls";

export const getCountries = () => {
    // console.log("bef");
    return new Promise((resolve,reject) =>
    axios.get(LOCATION_URL.GET_COUNTRIES).then((res) => resolve(res))
    .catch((err) => {
        // alert(`${JSON.stringify(err.response.data.detail)}`)
        console.warn(`${JSON.stringify(err.response.data.detail)}`)
        reject(err.response.data)
        })
    );}
  