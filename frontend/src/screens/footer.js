import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary">
            {'My final project with React And Django '}
            <Link color="inherit" href="">
                Esc Far away
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function StickyFooter() {
    return (
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }}}>
            <Box
                component="footer"
                sx={{
                    width:'100%',
                    py: 3,
                    px: 2,
                    mt: 'auto',
                    position: 'fixed',
                    bottom: 0,
                    backgroundColor:'background.paper',
                }}
            >
                <Container >
                    <Typography variant="body1">
                    </Typography>
                    <Copyright />
                </Container>
            </Box>
        </Box >
    );
}