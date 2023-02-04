import React, { useState, useRef } from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
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

// import { Accordion, AccordionSummary, AccordionDetails } from './countryCard.styles.js'

import FlightLandIcon from '@mui/icons-material/FlightLand';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

import { useSelector } from 'react-redux';
import { Container } from '@mui/system';
import { Card } from './card_styles'





const CountryCard = ({ country, airports }) => {

    const { Name, Flag, id } = country

    const active = useRef(country.id)
    const [expanded, setExpanded] = useState(null);

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






    return (
        < div key={id}>
            < Accordion expanded={expanded === active.current
            } onChange={handleChange(active.current)} sx={{ backgroundColor: '#FFFFFF' }}>
                <AccordionSummary
                    aria-controls={`panel${id}bh-content`}
                    id={active.current}
                >

                    <Container sx={{ alignItems: 'center', display: 'flex' }}>
                        <Avatar alt={Name} src={Flag} />
                        <Typography color='primary' fontWeight={400} fontSize={20} sx={{ marginLeft: 4 }}>{Name}</Typography>
                        <Typography color='primary' fontWeight={400} fontSize={16} sx={{ marginLeft: 4 }}>{airports.length} Airports at your range</Typography>
                    </Container>
                    {/* <Box minWidth={'30%'}>
                    </Box> */}



                </AccordionSummary>
                <Typography color='primary' fontWeight={600} fontSize={16} sx={{ padding: 2, alignItems: 'center' }}>
                    <span>Choose one of the airport below to continue or </span><AddOutlinedIcon sx={{ alignSelf: 'center' }} /><span>to add to your destinations</span>
                </Typography>
                <AccordionDetails>
                    <List component="nav" aria-label="airports in range" key={`${id}list`}>

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
                                <ListItemButton sx={{
                                    borderRadius: "4px",


                                }}
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
            </Accordion >

        </div>
    );
}

export default CountryCard




export const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={1}  {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '.5rem',
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));


const AccordionSummary = styled((props) => (
    <MuiAccordionSummary

        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'inherit',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
    borderRadius: '.5rem',
}));