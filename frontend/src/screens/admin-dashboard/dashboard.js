import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { Grid, Box } from '@mui/material';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PublicIcon from '@mui/icons-material/Public';
import ConnectingAirportsIcon from '@mui/icons-material/ConnectingAirports';
import AirlinesIcon from '@mui/icons-material/Airlines';
import SettingsIcon from '@mui/icons-material/Settings';
import Users from './users';
import Countries from './countries';
import Airports from './airports';
import Airlines from './airlines';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../context/user/userSlice'
import { selectAdmin } from '../../context/admin/adminSlice';
import { fetchUsersAsync } from '../../context/admin/adminSlice';


function TabPanel({children,index,value}) {

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}

    >
      {value === index && (
        <Box  >
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function AdminDashboard() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const refresh = React.useRef(false)
  const dispatch = useDispatch()
  const userData = useSelector(selectAdmin).userList
  const { role } = useSelector(selectUser)

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(12);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  React.useEffect(() => {
    if (refresh.current === true && role === 1) {
      dispatch(fetchUsersAsync())
    }
    refresh.current = true
  }, [role])

  return (
    <Grid
      container
      rowSpacing={{}}
      spacing={{ xs: .5, md: 1 }} sx={{ flexGrow: 1, display: 'flex', position: 'fixed' }}
    >
      <Box

        sx={{
          bgcolor: 'background.paper',
          display: 'flex',
          justifyContent: { xs: 'start', md: 'space-between' },
          width: "100%",

        }}
      >
        <Grid item xs="auto">
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: 'divider', maxWidth: '140px', display: { sm: 'block', xs: 'none' }, left: 0 }}
          >
            <Tab icon={<PeopleAltIcon />} iconPosition="start" label="Users" {...a11yProps(0)} />
            <Tab icon={<PublicIcon />} iconPosition="start" label='Countries' {...a11yProps(1)} />
            <Tab icon={<AirlinesIcon />} iconPosition="start" label="Airlines" {...a11yProps(2)} />
            <Tab icon={<ConnectingAirportsIcon />} iconPosition="start" label="Airports" {...a11yProps(3)} />
            <Tab icon={<SettingsIcon />} iconPosition="start" label="Settings" {...a11yProps(4)} />
            {/* <Tab label="Item Six" {...a11yProps(5)} />
        <Tab label="Item Seven" {...a11yProps(6)} /> */}
          </Tabs>
        </Grid>
        <Box sx={{ margin: 'auto', width: { xl: '50%', md: '70%', sm: "500px", xs: "250" } }}>
{/* 
        <TablePagination
        rowsPerPageOptions={[12]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
          <Grid item xs={12} >
            <TabPanel value={value} index={0} >
              <Users rowsData={userData} />
            </TabPanel>
           { console.log(value)}

            <TabPanel value={value} index={1}>
              <Countries />
            </TabPanel>

            <TabPanel value={value} index={2}>
              <Airlines />
            </TabPanel>

            <TabPanel value={value} index={3}>
              <Airports />
            </TabPanel>

            <TabPanel value={value} index={4}>
              Item Five
            </TabPanel>

            <TabPanel value={value} index={5}>
              Item Six
            </TabPanel>

            <TabPanel value={value} index={6}>
              Item Seven
            </TabPanel>
          </Grid>
        </Box>
      </Box >
    </Grid >
  );
}
