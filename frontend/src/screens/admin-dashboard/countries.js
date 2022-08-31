import * as React from 'react';
import CollapsibleTable from '../../components/tabel/collapsible-table';
import { fetchUsersAsync } from '../../context/admin/adminSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../context/user/userSlice'
import { selectAdmin } from '../../context/admin/adminSlice';
import { AccountProfile } from '../../components/account/account-profile';
import { Box, Container, TextField } from '@mui/material';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { selectCountries } from '../../context/locations/countries/countriesSlice'
import EditCountry from './edit_country';
import TablePagination from '@mui/material/TablePagination';







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

const Countries = () => {

  const columns = [
    { value: 'id', align: 'center', label: '', },
    { value: 'Name', align: 'center', label: 'Country Name', },
    { value: 'Flag', align: 'center', label: 'Flag URL', },
  ]
  const dispatch = useDispatch()
  // const rowsData = useSelector(selectAdmin).userList
  const { role } = useSelector(selectUser)
  const rowsData = useSelector(selectCountries)

  const newRow = (data, children) => {
    return { data: data, children: children }
  }

  let rows = []


  if (rowsData !== []) { rows = rowsData.map(row => newRow(row, <EditCountry data={row} />)) }

  const pageControl = () => {

  }
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(13);

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
        name='Countries'
      ></Head>
      <TablePagination
        showFirstButton={true}
        // showLastButton={true}
        rowsPerPageOptions={[13]}
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
        page={page} 
        />


    </Grid>
  )
}

export default Countries