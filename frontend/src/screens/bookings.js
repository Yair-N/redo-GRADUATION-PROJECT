import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import { selectUser } from '../context/user/userSlice';
// import selectFlights
import { useSelector } from 'react-redux';
import Ticket from '../components/booking/ticket';
import { selectAirports } from '../context/locations/airports/airportsSlice';








export default function BookingsPage() {

    const { flights, bookings } = useSelector(selectUser)




    const airports = useSelector(selectAirports)

    const decodeFlights = () => {

        const newFlights = flights.map(flight => {
            const depId = flight.Departure_airport_id;
            const arrId = flight.Arrival_airport_id;
            const depart = airports.find(airport => airport.id === depId)
            console.log(depart)
            const dest = airports.find(airport => airport.id === arrId)
            return (
                {
                    ...flight,
                    depart_city: depart.city,
                    depart_country: depart.country_name,
                    depart_airport: depart.display_name,
                    dest_city: dest.city,
                    dest_country: dest.country_name,
                    dest_airport: dest.display_name,
                }
            )
        })
        return newFlights
    }

    const cards = decodeFlights();


    return (

        <>
            <AppBar position="relative">
                <Toolbar>
                    <AirplaneTicketIcon sx={{ mr: 2, borderTopWidth: '75px' }} />
                    <Typography variant="h5" color="inherit" noWrap>
                        Your Bookings                    </Typography>
                </Toolbar>
            </AppBar>
            <main>

                <Container sx={{ py: 8 }} maxWidth="md">
                    <Grid container spacing={4}>
                        {cards.map((card) => (
                            <Grid item key={card} xs={12} sm={6} md={4}>

                                <Card
                                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                                >

                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Box sx={{ height: '100px', justifyContent: 'space-between', display: 'flex', flexDirection: 'row', alignContent: 'center' }} >
                                            <Typography sx={{ alignSelf: 'center' }} gutterBottom variant="h5" component="h2">
                                                {card.Flight_Number}
                                            </Typography>
                                            <Typography gutterBottom >
                                                <Box sx={{ maxWidth: '100px', justifyContent: 'space-between', display: 'flex', flexDirection: 'column' }} >
                                                    <Typography gutterBottom sx={{ fontWeight:'bold'}} >
                                                        {card.depart_airport}
                                                    </Typography>
                                                    <Typography gutterBottom variant="body2">
                                                        {card.depart_country}
                                                    </Typography>
                                                    <Typography gutterBottom sx={{ fontWeight:'bold'}}>
                                                        {card.dest_airport}
                                                    </Typography>
                                                    <Typography gutterBottom variant="body2">
                                                        {card.dest_country}
                                                    </Typography>
                                                </Box>
                                            </Typography>
                                        </Box>
                                        <Typography>
                                            {card.Departure_time}
                                        </Typography>
                                    </CardContent>

                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>

        </>
    );
}