import * as React from 'react';
import CollapsibleTable from '../../components/table/collapsible-table';
import { fetchUsersAsync } from '../../context/admin/adminSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../context/user/userSlice'
import { selectAdmin } from '../../context/admin/adminSlice';
import { AccountProfile } from '../../components/account/account-profile';
import { Box, TextField } from '@mui/material';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import TablePagination from '@mui/material/TablePagination';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';

import EditUser from './edit_user';




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

const Users = ({ rowsData }) => {

  const headers = [
    'id', 'username', 'email', 'first_name', 'last_name', 'last_login'
  ]


  const columns = [
    { value: 'id', align: 'center', label: 'ID', },
    { value: 'username', align: 'center', label: 'username', },
    { value: 'email', align: 'center', label: 'email', },
    { value: 'first_name', align: 'center', label: 'first name', },
    { value: 'last_name', align: 'center', label: 'last name', },
  ]

  const newRow = (data, children) => {
    return { data: data, children: children }
  }

  let rows = []


  if (rowsData !== []) { rows = rowsData.map(row => newRow(row, <EditUser data={row} />)) }

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
    <>
      <Head
        name='Users'
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
        

    </>
  )
}

export default Users