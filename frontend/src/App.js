import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { Routes, Route } from 'react-router-dom';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { theme } from './theme';
import { sessionStorageItems } from './utils/constants';

import { selectAuth, setAuth } from './context/auth/authSlice';
import { checkUser } from './context/auth/authSlice';
import Navigation from './pages/Navigation';
import Home from './pages/Home';
import { initiateUserAsync } from './context/user/userSlice';

const App = () => {

  const dispatch = useDispatch()

  const authState = useSelector(selectAuth)

  const [token, setToken] = useState('null')

  useEffect(() => {
    const syncStorage = () => {
      sessionStorageItems.map(title => {
        if (sessionStorage.getItem(title) === null) {
          sessionStorage.setItem(title, null)
        }
      })
    }
    syncStorage()
    setToken(sessionStorage.getItem('accessToken'))

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
