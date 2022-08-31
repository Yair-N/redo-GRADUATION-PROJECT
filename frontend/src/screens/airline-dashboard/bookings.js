import * as React from 'react';
import {Table,Grid} from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import { selectAirline } from '../../context/airline_company/airlineCompanySlice';
import { Head } from './airports';

export default function Booking({ rows }) {

    // const { customers ,tickets} = useSelector(selectAirline)

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);

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
          name='Bookings'
        ></Head>
        <TableContainer sx={{ overflow: 'hidden', height: '1800px' }} component={Paper}>
            <TablePagination
                showFirstButton={true}
                // showLastButton={true}
                rowsPerPageOptions={[25]}
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
            <Table sx={{ minWidth: 'sm'}} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left"></TableCell>
                        <TableCell align="left">Flight number</TableCell>
                        <TableCell align="left">Owner</TableCell>
                        <TableCell align="left">Seats</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                        ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : rows
                    ).map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="left">{row.id}</TableCell>
                            <TableCell align="left">{row.Flight}</TableCell>
                            <TableCell align="left">{row.Customer}</TableCell>
                            <TableCell align="left">{row.Seats}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </Grid>
    );
}
