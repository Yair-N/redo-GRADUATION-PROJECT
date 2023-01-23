import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { Routes, Route } from 'react-router-dom';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { theme } from './theme';
import { sessionStorageItems } from './utils/constants';

import { selectAuth } from './context/auth/authSlice';
import { checkUser } from './context/auth/authSlice';
import Navigation from './pages/Navigation';

const App = () => {

  const dispatch = useDispatch()

  const authState = useSelector(selectAuth)

 

  useEffect(() => {
    const syncStorage = () => {
      sessionStorageItems.map(title => {
        if (sessionStorage.getItem(title) === null) {
          sessionStorage.setItem(title, null)
        }
      })
      
    }
    syncStorage()
    if(!authState.authenticated)
      dispatch(checkUser())
  }, []);





  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />

    <Routes>
      <Route path='/' element={<Navigation />}>
        {/* <Route index element={<FarAway />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/flights' element={<FindFlight />} />
        <Route path='/account' element={<Account />} />
        <Route path='/airline' element={<Airline />} />
        <Route path='/bookings' element={<BookingsPage />} /> */}

        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Route>
    </Routes>
  </ThemeProvider>

  )
}

export default App
