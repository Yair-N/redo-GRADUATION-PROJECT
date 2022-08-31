
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAirline } from './airlineCompanyAPI'

const initialState = {
    User_Id: 0,
    Code: '',
    Country: '',
    Name: '',
    logo: '',
    flights: [],
    tickets: [],
    customers: [],
};

export const fetchAirlineAsync = createAsyncThunk(
    "airline/privet",

    async () => {
        const response = await getAirline();
        return response.data
    }

);



export const airlineSlice = createSlice({
    name: 'airline',
    initialState,
    reducers: {

        // setAddress: (state, action) => {
        //     state.address = { ...action.payload.address }
        // }
    },
    extraReducers: (builder) => {
        builder

            .addCase(fetchAirlineAsync.fulfilled, (state, action) => {

                const state_keys = Object.keys(state);
                console.log(action.payload)
                state_keys.forEach((key) => {
                    state[key] = action.payload.airline[key]
                });
                state.flights = action.payload.flights
                state.customers = action.payload.customers
                state.tickets = action.payload.tickets
            })
    }


})



export const selectAirline = (state) => state.airline
export const { } = airlineSlice.actions;

export default airlineSlice.reducer