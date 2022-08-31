import * as React from 'react';
import CollapsibleTable from '../../components/tabel/collapsible-table';
import { useDispatch, useSelector } from 'react-redux';
import { AccountProfile } from '../../components/account/account-profile';
import { Box, TextField } from '@mui/material';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { selectAirlines } from '../../context/airlines/airlinesSlice';
import EditAirline from './edit_flight';
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

const Airlines = () => {

  const columns = [
    { value: 'id', align: 'center', label: 'ID', },
    { value: 'Code', align: 'center', label: 'Code', },
    { value: 'Name', align: 'center', label: 'Airline Name', },
    { value: 'Country', align: 'center', label: 'Country', },
    { value: 'User_Id', align: 'center', label: 'Admin Id', },
  ]

  
  const dispatch = useDispatch()
  // const rowsData = useSelector(selectAdmin).userList
  const {active_airlines} = useSelector(selectAirlines)
  const rowsData = active_airlines? active_airlines: []

  // row structure 
  const newRow = (data,children) => {
    return { data:data, children: children }
  }
  let rows = []



  // if rowsData is not empty, return rows with the child for each row
  if (rowsData !== []) { rows = rowsData.map(row => newRow(row, <EditAirline data={row} title = {''}/>)) }

  const pageControl = () => {

  }


  return (
    <Grid sx={{ display: "flex", flexDirection: "column" }}>
      <Head
        name='Airline Companies'
      ></Head>

      <CollapsibleTable
        columns={columns}
        rows={rows} />
      
    </Grid>
  )
}

export default Airlines