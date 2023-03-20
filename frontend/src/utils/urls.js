

// export const BASE_URL = process.env.NODE_ENV !== 'production'?"http://127.0.0.1:8000":"http://3.135.201.138/"
export const BASE_URL ="http://127.0.0.1:8000"
export const IMAGE_URL = (src_url)=>(BASE_URL+`${src_url}`)

export const LOCATION_URL = {
    GET_AIRPORTS: "/general/fetch_airports/",
    GET_COUNTRIES: "/general/fetch_countries/"
}

export const AUTH_URL = {
    LOGIN:"/auth/authenticate/",
    REGISTER:"/auth/signup/",
    REFRESH:'/auth/authenticate/refresh/',
}


export const ADMIN_URL = {
    ALL_USERS:"/system/user-list/",
}

export const USER_URL = {
    USER_PROFILE:"/user/userprofile/",
    CREATE_PROFILE:"/user/create_profile/",
    UPLOAD_IMAGE: "/user/upload_image/"
}

export const FLIGHT_URL =(origin_id,dest_id,depart,back) =>({
    SEARCH_FLIGHT:`flight_search/anon/${origin_id}/${dest_id}/${depart}/${back &&`${back}/`}`,
})

export const BOOK_FLIGHT = (flight, seats=1) =>(
`/user/book_flight/${flight}/1/`
)

export const AIRLINE_URL = {
    AIRLINES_LIST:"/supplier/airline_list/",
    AIRLINE:"/supplier/get_airline_private/"

}

export const AIRLINE_LOGO = (iata='ly',height=75,width=150) =>
(`https://daisycon.io/images/airline/?
width=${width}
&
height=${height}
&
color=ffffff
&
iata=${iata}`)


export const AMADEUS_BASE = "https://test.api.amadeus.com/v2/"

export const AMADEUS_AUTH = "https://test.api.amadeus.com/v1/security/oauth2/token"


export const AMADEUS_FLIGHT_OFFERS = "shopping/flight-offers"
