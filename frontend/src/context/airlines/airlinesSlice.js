
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAirlines, searchFlights } from './airlineOpenAPI'

const initialState = {
    airlines_list: [],
    active_airlines: []
};

export const fetchAirlinesAsync = createAsyncThunk(
    "airline/airlines",
    async () => {
        const response = await getAirlines();
        return response.data
    }

);



export const airlinesSlice = createSlice({
    name: 'airlines',
    initialState,
    reducers: {

        // setAddress: (state, action) => {
        //     state.address = { ...action.payload.address }
        // }
    },
    extraReducers: (builder) => {
        builder

            .addCase(fetchAirlinesAsync.fulfilled, (state, action) => {

                state.airlines_list = action.payload
                state.active_airlines = action.payload.filter(airline =>airline.Is_Active && airline)
            })
    }


})



export const selectAirlines = (state) => state.airlines
export const { } = airlinesSlice.actions;

export default airlinesSlice.reducer