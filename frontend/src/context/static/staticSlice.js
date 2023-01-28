import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAirports, fetchCountries } from './staticAPI';


const initialState = {
    countries: [],
    airports: [],
    airlines: [],
    origin:{},
};

export const getAirportAsync = createAsyncThunk(
    "static/airport_list",
    async () => {
        const response = await fetchAirports();
        return response.data;
    }
);


export const getCountriesAsync = createAsyncThunk(
    "static/countries_list",
    async () => {
        const response = await fetchCountries();
        return response.data;
    }
);



export const staticSlice = createSlice({
    name: 'static',
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
        }


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


export const staticActions = staticSlice.actions
export const selectStatic = (state) => state.static
export const selectAirports = (state) => state.static.airports

export default staticSlice.reducer