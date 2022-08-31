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
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import FlightIcon from '@mui/icons-material/Flight';
import Airports from './airports';
import { selectAirline } from '../../context/airline_company/airlineCompanySlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../context/user/userSlice'
import { fetchUsersAsync } from '../../context/admin/adminSlice';
import Customer from './customers';
import Flights from './flights';
import Booking from './bookings';





function TabPanel({ children, index, value }) {

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

export default function AirlineDashboard() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const refresh = React.useRef(false)


  const dispatch = useDispatch()
  const { customers ,flights,tickets, Code,Country,Name} = useSelector(selectAirline)
  const { role } = useSelector(selectUser)

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
            {/* <Tab icon={<AirlinesIcon />} iconPosition="start" label="Airline" {...a11yProps(0)} /> */}
            <Tab icon={<FlightIcon />} iconPosition="start" label='Flights' {...a11yProps(0)} />
            <Tab icon={<PeopleAltIcon />} iconPosition="start" label="Customers" {...a11yProps(1)} />
            <Tab icon={<AirplaneTicketIcon />} iconPosition="start" label="Bookings" {...a11yProps(2)} />
            <Tab icon={<ConnectingAirportsIcon />} iconPosition="start" label="Airports" {...a11yProps(3)} />
            {/* <Tab icon={<SettingsIcon />} iconPosition="start" label="Settings"{...a11yProps(4)} /> */}
            {/*<Tab label="Item Seven" {...a11yProps(6)} /> */}
          </Tabs>
        </Grid>
        
        <Box sx={{ margin: 'auto', width: { xl: '50%', md: '70%', sm: "500px", xs: "250" } }}>
          
          <Grid item xs={12} >

            <Box sx={{justifyContent:'space-between',display:'inline-flex', width:'100%'}}>
            <Typography variant="h1"  sx={{color:'primary.main',alignSelf:'center',padding:1, margin:'auto'}}>{Name}  </Typography>
            <Typography variant="h2"  sx={{color:'primary.main',alignSelf:'center',padding:1, margin:'auto'}}>{Country}  </Typography>
            </Box>
            <TabPanel value={value} index={0} >
            <Flights rowsData={flights} />
            </TabPanel>

            <TabPanel value={value} index={1}>
              <Customer />
            </TabPanel>

            <TabPanel value={value} index={2}>
              <Booking rows={tickets} />
            </TabPanel>

            <TabPanel value={value} index={3}>
            <Airports />
            </TabPanel>

            <TabPanel value={value} index={4}>
              {/* <Airports /> */}
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
