import * as React from 'react';
import {
  Stack,
  Card,
  Grid,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';

import RangeSlider from './slider input/rangeSlider';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
import { useSelector, useDispatch } from 'react-redux/es/exports'
import { selectAirports } from '../context/locations/airports/airportsSlice'
import { fetchRangedAirportsAsync, selectRangedAirports, initRangedAirports } from '../context/locations/airports/airportsSlice'
import { selectSuggested, initSuggested } from '../context/locations/countries/countriesSlice'
import CountryCard from './coutry-card/CountryCard';


const FarAwayHero = () => {

  const dispatch = useDispatch()
  const airports = useSelector(selectAirports)
  const suggestedCountries = useSelector(selectSuggested)
  const rangedAirports = useSelector(selectRangedAirports)
  const [result, setResult] = React.useState(false)
  const [range, setRange] = React.useState(0)
  const [resultAirports, setResultAirports] = React.useState([])
  const [countriesInRange, setCountriesInRange] = React.useState(0)


  React.useEffect(() => {

    const minRange = range - 50
    const MaxRange = range + 100
    const airports = rangedAirports.filter(
      airport => (parseInt(airport.range) <= MaxRange && parseInt(airport.range) >= minRange) && airport)
    setResultAirports(airports)
    if (range > 0) setCountriesInRange(suggestedCountries.country[range / 100].length)
    // eslint-disable-next-line
  }, [range])


  const sliderHandel = (value) => {
    setRange(value)
  }


  const handleChange = (item) => {


    setResult(false)

  }

  const handleOnSelect = (item) => {
    dispatch(fetchRangedAirportsAsync(item.id))
    setResult(true)

  }

  const handleClear = () => {
    dispatch(initRangedAirports())
    dispatch(initSuggested())
    setResult(false)
    setRange(0)

  }


  const handleResultFormat = (item) => {
    return <span> {item.iata_code} | {item.city} | {item.country_name}</span>
  }
  // const numberOfHits = suggestedCountries.country[range / 100].length
  return (
    <Grid sx={{ display: 'block', maxWidth: 900, justifyContent: 'space-around',transition:1}} >

      <Card sx={{ minWidth:{md:'800px'} ,minHeight: 800, marginLeft: '5%', padding: '1%' }}
      >
        <CardContent>
          <Typography color='primary' fontWeight={600} fontSize={24} style={{ padding: '2%' }} >Far far away...

          </Typography>
          <CardMedia
            style={{ height: 180, paddingTop: '15%' }}
            alt='freedom'
            image={require('../assets/freedom.jpeg')}
          > </CardMedia>
          <Typography color='primary' fontWeight={600} fontSize={20} style={{ padding: '2%' }} >
            {result ? `From` : `Where from?`}
          </Typography>
          <div >
            <ReactSearchAutocomplete
              items={airports}
              onClear={handleClear}
              onSelect={handleOnSelect}
              formatResult={handleResultFormat}
              onSearch={handleChange}
              autoFocus
              fuseOptions={{ keys: ["iata_code", "name", "city", "country_name"] }}
              resultStringKeyName="display_name"
              placeholder='Enter Departure location'
              styling={
                {
                  borderRadius: "4px",
                  boxShadow: "rgba(52, 152, 219, 1) 0px 1px 6px 0px"
                }
              } />
          </div>
          <Typography color='primary' fontWeight={600} fontSize={20} padding={2}>
            {(range === 0 ? `How far would you go? use the slider to set the range` :
              `${countriesInRange} Countries at ${range}km`)}
          </Typography>

          <RangeSlider
            max={20000}
            step={100}
            sliderHandel={sliderHandel}
            marks={false}
            disabled={!result}
          />

        </CardContent>

        <Stack sx={{ position: 'relative', marginTop: '20px' }} spacing={2}>
          {(suggestedCountries.country.some(x => x.length) && range > 0) &&
            (
              suggestedCountries.country[range / 100].map((country_id, index) =>

                <CountryCard key={index} country_id={country_id} resultAirports={resultAirports} />
              ))

          }
        </Stack>
      </Card>

    </Grid>
  );
}
export default FarAwayHero
