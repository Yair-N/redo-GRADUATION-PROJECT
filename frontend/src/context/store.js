import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth/authSlice'
import airportsSlice from './locations/airports/airportsSlice'
import countriesSlice from './locations/countries/countriesSlice'
import userSlice from './user/userSlice'
import adminSlice from './admin/adminSlice';
import airlinesSlice from './airlines/airlinesSlice';
import tripSlice from './trip/tripSlice';
import airlineCompanySlice from './airline_company/airlineCompanySlice';

export const store = configureStore({
  reducer: {
    auth:authSlice,
    airports: airportsSlice,
    countries: countriesSlice,
    user: userSlice,
    admin:adminSlice,
    airlines: airlinesSlice,
    airline: airlineCompanySlice,
    trip: tripSlice,
  },
});

