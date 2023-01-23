import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth/authSlice';
import userSlice from './user/userSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
  },
});
