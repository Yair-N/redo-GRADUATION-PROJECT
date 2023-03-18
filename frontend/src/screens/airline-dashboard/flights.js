import * as React from 'react';
import CollapsibleTable from '../../components/table/collapsible-table';
import { useDispatch, useSelector } from 'react-redux';
import { AccountProfile } from '../../components/account/account-profile';
import { Box, TextField } from '@mui/material';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { selectAirports } from '../../context/locations/airports/airportsSlice';
import TablePagination from '@mui/material/TablePagination';
import { selectAirline } from '../../context/airline_company/airlineCompanySlice';



const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.h3,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.primary.main,
}));

const Head = (props) => {
    const { name, search, edit } = props



    return (
        <Box sx={{ flexGrow: 1, margin: 2 }}>
            <Grid container spacing={3}>
                <Grid item xs="auto">
                    <Item>{name}</Item>
                </Grid>
                <Grid item xs>
                    <Item><TextField></TextField></Item>
                </Grid>
                <Grid item xs={2}>
                    <Item><AddOutlinedIcon /></Item>
                </Grid>
            </Grid>
        </Box>
    )
}

const Flights = () => {

    const columns = [
        { value: 'id', align: 'center', label: 'ID', },
        { value: 'Flight_Number', align: 'center', label: 'Flight Number', },
        { value: 'depart_airport', align: 'center', label: 'Departure Airport', },
        { value: 'depart_city', align: 'center', label: 'Departure Airport', },
        { value: 'depart_country', align: 'center', label: 'Departure Airport', },
        { value: 'dest_airport', align: 'center', label: 'Dest Airport', },
        { value: 'dest_city', align: 'center', label: 'Dest Airport', },
        { value: 'dest_country', align: 'center', label: 'Dest Airport', },
        { value: 'Remaining_Tickets', align: 'center', label: 'Available Seats', },
        { value: 'Departure_time', align: 'center', label: 'Depart Date', },

    ]


    const dispatch = useDispatch()

    const { flights } = useSelector(selectAirline)

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
    console.log("decoded:", decodeFlights())
    const rowsData = decodeFlights()

    const newRow = (data, children) => {
        return { data: data, children: children }
    }

    let rows = []


    if (rowsData !== []) {
        rows = rowsData.map(row => newRow(row, <> </>))
    }

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


    return (
        <Grid sx={{ display: "flex", flexDirection: "column" }}>
            <Head
                name='Flights'
            ></Head>
            <TablePagination
                showFirstButton={true}
                // showLastButton={true}
                rowsPerPageOptions={[]}
                component="div"
                count={rows.length}
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
            <CollapsibleTable
                columns={columns}
                rows={rows}
                rowsPerPage={rowsPerPage}
                page={page} />

        </Grid>
    )
}

export default Flights