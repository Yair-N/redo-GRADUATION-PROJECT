import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';

import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';




const Row = ({ data, columns, children, props }) => {
    const [open, setOpen] = React.useState(false);

    return (
        <>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell  >
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <DoneIcon /> : <EditIcon />}
                    </IconButton>
                </TableCell>
                {columns.map((column, index) => <TableCell key={`${index}cell`} align={column.align}>{data[column.value]}</TableCell>)}
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            {children}
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    )
}
Row.defaultProps = {
    otherProps: {
        align: "center"
    }
}




// filler data for empty generation
const coll1 = 'coll1'
const coll2 = 'coll2'
const coll3 = 'coll3'
CollapsibleTable.defaultProps = {

    columns: [coll1, coll2, coll3],
    rows: [{
        data: { coll1: 'a', coll2: 'b', coll3: 'c' },
        children: <div></div>
    },

        ,],

    page: 0,
    rowsPerPage: 13

}

export default function CollapsibleTable(props) {
    const { rows, columns, page, rowsPerPage } = props


    return (
        <Paper sx={{ overflow: 'hidden', height: '1800px' }}>
            <TableContainer sx={{ maxHeight: '900px', margin: 'auto' }} >
                <Table
                    stickyHeader
                    aria-label="collapsible table">
                    <TableHead>

                        <TableRow>
                            <TableCell>

                            </TableCell>
                            {columns.map((column) =>
                                <TableCell
                                    style={{ minWidth: column.minWidth }}
                                    align={column.align}>{column.label}
                                </TableCell>)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : rows
                        ).map((row, index) => {
                            let data = row.data;
                            let children = row.children;
                            return <React.Fragment key={`${index}row`}>{Row({ data, columns, children })}</React.Fragment>
                        })}
                    </TableBody>
                </Table>
            </TableContainer>

        </Paper>
    );
}

