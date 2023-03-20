import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAirports } from './airportsAPI'

const initialState = {
    range: 0,
    allAirportsList: [],
    rangedAirportsList: [],
    airportsInRange: [],
    chartPending:false,
};


export const fetchAirportsAsync = createAsyncThunk(
    `all`,
    async () => {
        const response = await getAirports()
        return response.data
    }
);

export const suggestAirportsInRange = (range, rangedAirportsList) => {
    const suggestions = rangedAirportsList.filter(airport => ((airport.range > (range - 50)) && (airport.range < (range + 50))) && airport)
    return (dispatch) => {
        dispatch(setSuggestedAirports(suggestions))
    }
}

export const fetchRangedAirportsAsync = createAsyncThunk(

    `ranged`,
    async (id) => {
        // console.log(id)
        // const airport_id = state.originAirportId
        const response = await getAirports(id)
        return response.data
    }
);


export const airportsSlice = createSlice({
    name: 'airports',
    initialState,
    reducers: {
        setAirports: (state, action) => {
            state.airportsList = action.payload;
        },
        initRangedAirports: (state) => {
            state.rangedAirportsList = [];

        },
        clearAirports: (state) => {
            state.airportsList = initialState.airportsList;
        },
        setRange: (state, action) => {
            state.range = action.payload;
        },
        setSuggestedAirports: (state, action) => {
            state.suggestAirportsInRange = action.payload;
        }

    },
    extraReducers: (builder) => {
        builder

            .addCase(fetchAirportsAsync.rejected, (action) => {
                console.log(action)
            })
            .addCase(fetchAirportsAsync.fulfilled, (state, action) => {
                state.airportsList = action.payload;
            }
            )
            .addCase(fetchRangedAirportsAsync.pending, (state) => {
                state.chartPending = true
                
            }
            )
            .addCase(fetchRangedAirportsAsync.fulfilled, (state, action) => {
                state.chartPending = false

                state.rangedAirportsList = JSON.parse(action.payload);
                
            }
            )
    }
})

export const { setSuggestedAirports, setOriginId, setAirports, clearAirports,initRangedAirports } = airportsSlice.actions;
export const selectAirports = (state) => state.airports.airportsList;
export const selectOriginAirportId = (state) => state.airports.originAirportId
export const selectRangedAirports = (state) => state.airports.rangedAirportsList
export const selectChartPending = (state) => state.airports.chartPending


export default airportsSlice.reducer