import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth/authSlice';
import userSlice from './user/userSlice'
import dataSlice from './data/dataSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    data: dataSlice,
  },
});

