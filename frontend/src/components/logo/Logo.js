import React from 'react'
import Box from '@mui/material/Box';
import EscLogo from '../../assets/esc.svg';


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
            <img src={EscLogo} alt="" />
        </Box>
    );
}

export default Logo


