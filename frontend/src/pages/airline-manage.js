import * as React from 'react';
import AirlineDashboard from '../screens/airline-dashboard/dashboard'
import { showPopUp, selectAuth } from '../context/auth/authSlice';
import { selectUser } from '../context/user/userSlice';
import { useSelector } from 'react-redux/es/exports';
import { useNavigate } from 'react-router-dom';
import { Grid, Box } from '@mui/material';

const Airline = () => {

  const { role } = useSelector(selectUser)


  const navigate = useNavigate()

  React.useEffect(() => {
    if (role !== 3) {
      navigate('/')
    }
  }, [role])

  return (
    

        <AirlineDashboard />
     
    
  )
}

export default Airline