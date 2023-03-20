import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { FLIGHT_URL } from '../../utils/urls';
import { searchFlights } from './tripApi'
// const fullDate = new Date().toUTCString()
const now = new Date()

const init_date = { day: now.getDate(), month: now.getMonth() + 1, year: now.getFullYear() }

export const date_obj = (date) => ({
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
})

export const date_objToString = (date_obj) => (
    `${date_obj.year}-${date_obj.month}-${date_obj.day}`
)


const initialState = {

    departureDate: init_date,
    returnDate: init_date,
    arrivalDate: init_date,

    departureAirport: {},
    destinationAirport: {},

    travelers: 1,
    flight_offers:[],
};

export const searchFlightAsync = createAsyncThunk(

    "trip/search_flights",
    async (arg, { getState }) => {
        const trip = getState().trip
        // console.log(trip)
        const response = await searchFlights(
            FLIGHT_URL(JSON.stringify(trip.departureAirport.id),
                JSON.stringify(trip.destinationAirport.id),
                date_objToString(trip.departureDate),
                date_objToString(trip.returnDate)).SEARCH_FLIGHT)

            console.log(response)
        return response.data
    }



)

export const tripSlice = createSlice({
    name: 'trip',
    initialState,
    reducers: {
        setDepartureDate: (state, action) => {
            state.departureDate = action.payload;
        },
        setReturnDate: (state, action) => {
            state.returnDate = action.payload;
        },

        setArrivalDate: (state) => {
            // state.airportsList = initialState.airportsList;
        },

        setDepartureAirport: (state, action) => {
            state.departureAirport = action.payload;
        },

        setDestinationAirport: (state, action) => {
            state.destinationAirport = action.payload;
        },

        setTravelers: (state, action) => {
            state.travelers = action.payload;
        },
        initTrip: (state) => {
            state = {
                ...initialState
            }
        },


    },
    extraReducers: (builder) => {
        builder

            .addCase(searchFlightAsync.fulfilled, (state, action) => {
                state.flight_offers= action.payload
            })

    }
})

export const { setDepartureDate, setReturnDate, setArrivalDate, setDepartureAirport, setDestinationAirport, initTrip } = tripSlice.actions;
export const selectTrip = (state) => state.trip

export default tripSlice.reducer