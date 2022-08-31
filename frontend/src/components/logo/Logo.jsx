import React from 'react'
import Box from '@mui/material/Box';
import { ReactComponent as EscLogo } from '../../assets/esc.svg';
import './logo.style.scss'


const Logo = () => {
  return (
    <Box
      sx={{
        marginRight: 3,
        width: 50,
        height: 50,
        backgroundColor: 'inherit',
        cursor: 'pointer',
      }}
    >
      <EscLogo className='logo' />
    </Box>
  );
}

export default Logo