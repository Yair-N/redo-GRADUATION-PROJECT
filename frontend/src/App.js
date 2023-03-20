import { React, useEffect, useRef } from 'react'
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { theme } from './theme';
import { Routes, Route } from 'react-router-dom';
import EscAppBar from './screens/navigation';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { checkUser, selectAuth } from './context/auth/authSlice';
import { fetchAirportsAsync } from './context/locations/airports/airportsSlice'
import { fetchCountriesAsync } from './context/locations/countries/countriesSlice'
import { fetchAirlinesAsync } from './context/airlines/airlinesSlice';
import FarAway from './screens/faraway';
import Admin from './pages/system-manage';
import Airline from './pages/airline-manage'
import FindFlight from './pages/find-flight';
import Places from './pages/places';
import Account from './pages/account';
import { initTrip } from './context/trip/tripSlice';
import BookingsPage from './screens/bookings';

import {searchFlightAsync} from './context/amadeus/amadeusSlice';

function App(props) {
  const dispatch = useDispatch()
  const runCheckUser = useRef(false)
  const runFetchData = useRef(true)

  const { accessToken } = useSelector(selectAuth)

  useEffect(() => {
    dispatch(checkUser())
    if (runCheckUser.current === true) {
      const fetchUser = async () => {
        dispatch(checkUser())
      }
      fetchUser()
    }
    return () => {
      runCheckUser.current = true
    }
    // eslint-disable-next-line
  }, [accessToken]);


  useEffect(() => {
    if (runFetchData.current === true) {
      const fetchData = async () => {
        dispatch(fetchAirportsAsync())
        dispatch(fetchCountriesAsync())
        dispatch(fetchAirlinesAsync())
      
      }
      fetchData()
      return () => {
        runFetchData.current = false
      }
    }

    // eslint-disable-next-line
  }, []);


  return (
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Routes>
          <Route path='/' element={<EscAppBar />}>
            <Route index element={<FarAway />} />
            <Route path='/admin' element={<Admin />} />
            <Route path='/flights' element={<FindFlight />} />
            <Route path='/account' element={<Account />} />
            <Route path='/airline' element={<Airline />} />
            <Route path='/bookings' element={<BookingsPage />} />





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


  );
}

export default App;
