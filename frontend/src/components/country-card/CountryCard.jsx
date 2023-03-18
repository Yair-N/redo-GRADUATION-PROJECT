import * as React from 'react';

import {
    Typography, Avatar, Box,
    List,
    ListItem,
    ListItemText,
    Divider,
    ListItemIcon,
    IconButton,
    ListItemButton,
} from '@mui/material';

import { Accordion, AccordionSummary, AccordionDetails } from './countryCard.styles.js'

import FlightLandIcon from '@mui/icons-material/FlightLand';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

import { useSelector } from 'react-redux';
import { selectCountries } from '../../context/locations/countries/countriesSlice';
import { Container } from '@mui/system';




const style = {
    width: '100%',
    bgcolor: 'background.paper',
};


const CountryCard = (props) => {

    const countries = useSelector(selectCountries)
    const { country_id, resultAirports } = props
    const { Name, Flag, id } = countries.find(country => country.id === country_id)

    const active = React.useRef(country_id)
    const [expanded, setExpanded] = React.useState(null);

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const handleAddClicked = (airport_id) => (e) => {
        e.preventDefault();
        console.log('addClicked', airport_id)
    }

    const handleAirportClicked = (airport_id) => (e) => {
        e.preventDefault();
        console.log('airportClicked', airport_id)
    }
    const airports = resultAirports.filter(airport => airport.country_id === id)






    return (
        <div key={id}>
            <Accordion expanded={expanded === active.current} onChange={handleChange(active.current)}>
                <AccordionSummary
                    aria-controls={`panel${country_id}bh-content`}
                    id={active.current}
                >

                    <Container sx={{ alignItems: 'center', display: 'flex' }}>
                        <Avatar alt={Name} src={Flag} />
                        <Typography color='primary' fontWeight={400} fontSize={20} sx={{ marginLeft: 4 }}>{Name}</Typography>
                        <Typography color='primary' fontWeight={400} fontSize={16} sx={{ marginLeft: 4 }}>{airports.length} Airports at your range</Typography>
                    </Container>
                    <Box minWidth={'30%'}>
                    </Box>



                </AccordionSummary>
                <Typography color='primary' fontWeight={600} fontSize={16} sx={{ padding: 2, alignItems: 'center' }}>
                    <span>Choose one of the airport below to continue or </span><AddOutlinedIcon sx={{ alignSelf: 'center' }} /><span>to add to your destinations</span>
                </Typography>
                <AccordionDetails>
                    <List sx={style} component="nav" aria-label="airports in range" key={`${id}list`}>

                        {airports.map(airport =>
                        (<>
                            <ListItem
                                key={`${airport.id}listItem`}
                                sx={{
                                    borderRadius: "4px",
                                    boxShadow: "rgba(52, 152, 219, 1) 0px 1px 6px 0px",
                                    padding: '6px',
                                    margin: '2px'

                                }}>
                                <ListItemButton
                                    onClick={handleAirportClicked(airport.id)}
                                >
                                    <ListItemIcon>
                                        <FlightLandIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={airport.city} sx={{
                                        display: 'flex',
                                        //  width:'20%',
                                    }} />
                                    <ListItemText primary={airport.name} secondary={`(${airport.iata_code})`} sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-start',
                                        maxWidth: 'fit',
                                    }} />

                                </ListItemButton>
                                <IconButton onClick={handleAddClicked(airport.id)}
                                    fontWeight={400} fontSize={16} sx={{ marginLeft: 4 }}>
                                    <AddOutlinedIcon color='primary' />
                                </IconButton>
                            </ListItem>
                            <Divider />
                        </>)
                        )}
                    </List>

                </AccordionDetails>
            </Accordion>

        </div>
    );
}

export default CountryCard