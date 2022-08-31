import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCountries } from './countriesAPI'

const initialState = {
    countriesList: [],
    suggestedCountries:{range:[],country:[]},
    chart_data: {
        labels: [],
        datasets: [
            {
                data: [],
                backgroundColor: '#3498DB',
            },]
    }
};



export const fetchCountriesAsync = createAsyncThunk(
    `countries/fetch`,
    async () => {
        const response = await getCountries()
        return response.data
    }
);

export const groupCountriesByRange = (rangedAirportsList) => {
    const airports = rangedAirportsList;
    const maxRange = 20000;
    let range = 0
    const dataSet = { labels: [], data: [] }
    while (range <= maxRange) {
        const group = new Set();
        let minRange = range;
        let maxRange = range + 100;
        airports.filter(airport =>
            (parseInt(airport.range) < maxRange && parseInt(airport.range) > minRange)
            &&
            (airport, group.add(airport.country_id)));
        dataSet.labels.push(range);
        dataSet.data.push(group);
        range += 100
    }

    return dataSet
}

export const countriesSlice = createSlice({
    name: 'countries',
    initialState,
    reducers: {
        setCountries: (state, action) => {
            state.countriesList = action.payload;
        },
        setSuggested: (state, action) => {
            state.suggestedCountries = action.payload;
        },
        initSuggested: (state, action) => {
            state.suggestedCountries = initialState.suggestedCountries;
        },
        clearCountries: (state) => {
            state.countriesList = initialState.countriesList;
        },
        setChartData: (state, action) => {
            state.chart_data.labels = action.payload.labels
            state.chart_data.datasets.data = action.payload.data
            console.log(state.chart_data)
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchCountriesAsync.rejected, (state, action) => {
                // console.log(action)
            })
            .addCase(fetchCountriesAsync.fulfilled, (state, action) => {
                state.countriesList = action.payload;
            }
            )
           
    }
})

export const { setCountries, clearCountries, setSuggested, setChartData ,initSuggested} = countriesSlice.actions;
export const selectCountries = (state) => state.countries.countriesList
export const selectSuggested = (state) => state.countries.suggestedCountries
export const selectChartData = (state) => state.countries.chart_data
export default countriesSlice.reducer