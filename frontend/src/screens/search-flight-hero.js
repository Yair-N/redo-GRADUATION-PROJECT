
import ToggleTrip from '../components/flight-search-components/toggle-trip'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useEffect, useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import FlightSearchInput from '../components/flight-search-components/flight-search-input';
import DepartureDate from '../components/flight-search-components/flight-date'
import ReturnDate from '../components/flight-search-components/flight-date'
import { setDepartureDate, setReturnDate, setDepartureAirport, setDestinationAirport } from '../context/trip/tripSlice';
import { useSelector } from 'react-redux';
import { selectTrip } from '../context/trip/tripSlice';
import { date_objToString } from '../context/trip/tripSlice';
import { selectAirports } from '../context/locations/airports/airportsSlice'
import { useDispatch } from 'react-redux';
import { searchFlightAsync } from '../context/trip/tripSlice';
import TablePagination from '@mui/material/TablePagination';
import { Box, TextField, Paper, Grid } from '@mui/material';
import FlightIcon from '@mui/icons-material/Flight';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { selectAirlines } from '../context/airlines/airlinesSlice'
import BookOnlineIcon from '@mui/icons-material/BookOnline';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import AirlinesIcon from '@mui/icons-material/Airlines';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import { selectAuth } from '../context/auth/authSlice';
import { bookFlightAsync } from '../context/user/userSlice';



const SearchFlight = () => {
    const { authenticated } = useSelector(selectAuth)
    const airports = useSelector(selectAirports)
    const { airlines_list } = useSelector(selectAirlines)
    const { departureDate, departureAirport, destinationAirport, flight_offers } = useSelector(selectTrip)
    const dispatch = useDispatch()
    const startDate = new Date(date_objToString(departureDate))
    const [rowsData, setRowsData] = useState([])
    const handleSearchClicked = (event) => {
        event.preventDefault()
        console.log('clicked search')
        dispatch(searchFlightAsync())
    }

    const columns = [
        { value: 'id', align: 'center', label: 'ID', },
        { value: 'Flight_Number', align: 'center', label: 'Flight Number', },
        { value: 'airline', align: 'center', label: 'Flight Number', },
        { value: 'depart_airport', align: 'center', label: 'Departure Airport', },
        // { value: 'depart_city', align: 'center', label: 'Departure Airport', },
        // { value: 'depart_country', align: 'center', label: 'Departure Airport', },
        { value: 'dest_airport', align: 'center', label: 'Dest Airport', },
        // { value: 'dest_city', align: 'center', label: 'Dest Airport', },
        // { value: 'dest_country', align: 'center', label: 'Dest Airport', },
        { value: 'Remaining_Tickets', align: 'center', label: 'Available Seats', },
        { value: 'Departure_time', align: 'center', label: 'Depart Date', },

    ]

    useEffect(() => {
        const offers = flight_offers.map(
            (offer, index) => {
                let round = index % 2 ? offer.from : offer.to
                let depart = index % 2 ? destinationAirport.display_name : departureAirport.display_name
                let dest = index % 2 ? departureAirport.display_name : destinationAirport.display_name
                let airline = airlines_list.find(airline => airline.id === round.Airline_Company_Id)
                return ({
                    id: round.id,
                    Flight_Number: round.Flight_Number,
                    airline_name: airline.Name,
                    depart_airport: depart,
                    dest_airport: dest,
                    Remaining_Tickets: round.Remaining_Tickets,
                    Departure_time: round.Departure_time,
                    price: Number(round.flight_range * 0.15).toFixed(2)
                })
            }
        )
        setRowsData(offers)
        console.log(offers)
        // return offers
    }, [flight_offers])

    const newRow = (data, children) => {
        return { data: data, children: children }
    }

    // let rows = []

    // if (rowsData !== []) {
    //     rows = rowsData.map(row => newRow(row, <> </>))
    // }

    const pageControl = () => {

    }
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleBuy = (flight) => (event)=>{
        event.preventDefault()
        if (authenticated) {
            console.log(flight)
            dispatch(bookFlightAsync(flight))
        }
        else (
            alert('please sign in to book a flight')
        )
    }

    return (

        <>            <Grid sx={{ display: "flex", flexDirection: "column" }}>

            <div className="searchengBg">
                <div className="innerwrapSE">
                    <h1><i className="fl_hp_icon"></i>Far Away</h1>

                    <div className="onewaycolm">
                        <ToggleTrip />
                    </div>
                    <div className="flig-show1">
                        <div className="nwsearch_wrap">
                            <FlightSearchInput
                                items={airports}
                                title='from'
                                bind={setDepartureAirport}
                            />

                            <FlightSearchInput
                                title='to'
                                bind={setDestinationAirport}
                            />

                            <DepartureDate
                                items={airports}
                                title='departure date'
                                bind={setDepartureDate}
                            />
                            <ReturnDate
                                items={airports}
                                title='Return date'
                                bind={setReturnDate}
                                startDate={startDate}
                            />


                            <div className="fss_flex trvlr_colm sechver">
                                <div className="innerspcr" onClick={() => null}>
                                    <p className="srlabel">TRAVELLER &amp; class</p>
                                    <p >
                                        <span id="spnDrpNo" className="ftn25 mgr5 drpNoTrv">
                                            1
                                        </span>
                                        <span className="ftn14" id="spnTraveller">Travellers</span>
                                        <i id="iDownArr" className="downArwSe"></i>
                                    </p>
                                    <p id="pcalss" className="airptname optclassName-name">class here</p>
                                </div>

                            </div>
                            <div className="fss_flex search_colm">
                                <button
                                    name=""
                                    className="srchBtnSe"
                                    type="button"
                                    onClick={handleSearchClicked}
                                >
                                    <span className="button-helper"></span> Search
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div >

            <TableContainer sx={{ overflow: 'hidden', height: '1800px' }} component={Paper}>
                <TablePagination
                    showFirstButton={true}
                    // showLastButton={true}
                    rowsPerPageOptions={[25]}
                    component="div"
                    count={rowsData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    SelectProps={{
                        inputProps: {
                            'aria-label': 'rows per page',
                        },
                        native: true,
                    }}
                />
                <Table sx={{ minWidth: 'sm' }} aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Flight Id</TableCell>
                            <TableCell align="left"><FlightIcon /></TableCell>
                            <TableCell align="left"><AirlinesIcon /></TableCell>
                            <TableCell align="left"><FlightTakeoffIcon /></TableCell>
                            <TableCell align="left"><FlightLandIcon /></TableCell>
                            <TableCell align="left"><CalendarMonthIcon /></TableCell>
                            <TableCell align="left"><AirlineSeatReclineNormalIcon /></TableCell>
                            <TableCell align="left"><AttachMoneyIcon /></TableCell>
                            <TableCell align="left"></TableCell>


                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? rowsData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : rowsData
                        ).map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="left">{row.id}</TableCell>
                                <TableCell align="left">{row.Flight_Number}</TableCell>
                                <TableCell align="left">{row.airline_name}</TableCell>
                                <TableCell align="left">{row.depart_airport}</TableCell>
                                <TableCell align="left">{row.dest_airport}</TableCell>
                                <TableCell align="left">{row.Departure_time}</TableCell>
                                <TableCell align="left">{row.Remaining_Tickets}</TableCell>
                                <TableCell align="left">{row.price}</TableCell>
                                <TableCell
                                    onClick={handleBuy(row.id)}
                                    align="left"
                                >
                                    <BookOnlineIcon />
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
        </>
    )
}

export default SearchFlight