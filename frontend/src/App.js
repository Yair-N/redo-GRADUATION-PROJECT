import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { theme } from './conf';
import { sessionStorageItems } from './utils/constants';

import { getAirportAsync, getCountriesAsync, dataActions } from './context/data/dataSlice';
import { selectAuth, setAuth } from './context/auth/authSlice';
import Navigation from './pages/Navigation';
import Home from './pages/Home';

const App = () => {

  const dispatch = useDispatch()

  const authState = useSelector(selectAuth)

  const [token, setToken] = useState('null')

  useEffect(() => {
    const syncStorage = () => {

      Object.entries(sessionStorageItems).forEach(([key, value]) => {
        if (sessionStorage.getItem(value) === null) {
          switch (value) {
            case sessionStorageItems.accessToken:
              sessionStorage.setItem(value, null)
              break
            case sessionStorageItems.refreshToken:
              sessionStorage.setItem(value, null)
              break
            case sessionStorageItems.airports:
              dispatch(getAirportAsync())
              break
            case sessionStorageItems.countries:
              dispatch(getCountriesAsync())
              break
          }
        }
      })
    }


    syncStorage()
    setToken(sessionStorage.getItem('accessToken'))
    dispatch(dataActions.getItems())

  }, []);


  useEffect(() => {
    if (token !== 'null')
      dispatch(setAuth(token))
  }, [token])



  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Routes>
        <Route path='/' element={<Navigation />}>
          <Route index element={<Home />} />
          {/* <Route path='/admin' element={<Admin />} />
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
