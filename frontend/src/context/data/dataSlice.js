import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAirports, fetchCountries } from './dataAPI';


const initialState = {
    countries: [],
    extendedCountries:[],
    airports: [],
    countriesAirportsByRange:[],
    airlines: [],
    origin:{},
};

export const getAirportAsync = createAsyncThunk(
    "data/airport_list",
    async () => {
        const response = await fetchAirports();
        return response.data;
    }
);


export const getCountriesAsync = createAsyncThunk(
    "data/countries_list",
    async () => {
        const response = await fetchCountries();
        return response.data;
    }
);



export const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        initState: (state,) => {
            let keys = Object.keys(state);
            keys.forEach((key) => {
                state[key] = state.initialState[key]
            });

        },
        getItems: (state,)=>{
            state.countries = JSON.parse(sessionStorage.getItem('countries'))
            state.airports = JSON.parse(sessionStorage.getItem('airports'))
        },
        setOrigin: (state,action)=>{
            state.origin = action.payload
        },
        clearOrigin:(state) =>{
            state.origin = initialState.origin
        },
        setCountriesAirportsByRange: (state, action) =>{
            state.countriesAirportsByRange = action.payload
        },
        clearRangedAirports: (state) =>{
            state.rangedAirports = []
        },


    },
        extraReducers: (builder) => {
            builder
                .addCase(getCountriesAsync.fulfilled, (state,action) => {
                    sessionStorage.setItem('countries',JSON.stringify( action.payload))
                    state.countries = action.payload

                })

                .addCase(getAirportAsync.fulfilled, (state, action) => {
                    sessionStorage.setItem('airports', JSON.stringify( action.payload))
                    state.airports = action.payload
                })

        }
    

})


export const dataActions = dataSlice.actions
export const selectData = (state) => state.data
export const selectAirports = (state) => state.data.airports

export default dataSlice.reducer