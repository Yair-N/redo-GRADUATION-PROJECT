import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { Typography, Box } from '@mui/material';
import { debounce } from '@mui/material';
import RangeBar from '../components/input/RangeBar'
import InputAutocomplete from '../components/input/autocomplete/InputAutocomplete'
import RangeGraph from '../components/charts/RangeGraph'
import { HeroSection } from '../components/layout/layout_styles'
import { Card } from '../components/cards/card_styles'
import CountryCardStack from '../components/layout/CountryCardStack';
import { dataActions, selectData } from '../context/data/dataSlice';
import { groupCountriesByDistance, groupByDistance, minMaxCountry, returnCountry, calcDistanceList } from '../utils/geoCalc'





const HowFar = () => {

    const geoData = useSelector(selectData)
    const airportList = geoData.airports
    const countryList = geoData.countries
    const dispatch = useDispatch()
    const data = {
        labels: [],
        datasets:
        {
            data: [],
        },
    };

    const [countryGroups, setCountries] = useState([])
    const [airportsByRange, setAirportsByrange] = useState([])
    const [isOrigin, setIsOrigin] = useState(false)
    const [origin, setOrigin] = useState({})
    const [chartData, setChartData] = useState(data)
    const [locations, setLocations] = useState([])
    const [marks, setMarks] = useState([])
    const [thumbValue, setThumbValue] = useState(0)
    const [minText, setMinText] = useState('')
    const [maxText, setMaxText] = useState('')
    const [renderCountryCards, setRenderCountryCards] = useState(false)
    const range = 20000
    const jumps = 100

    useEffect(() => {
        const calcByOrigin = async () => {
            let list = calcDistanceList(origin, airportList)
            setCountries(groupCountriesByDistance(list, jumps, range))
            setAirportsByrange(groupByDistance(list, jumps, range))

            let { min, max } = minMaxCountry(origin, list)

            // the next section is only so its not inside the return element and for better readability
            min = min[0]
            max = max[0]

            let minCountry = returnCountry(min.country_code, countryList)
            let maxCountry = returnCountry(max.country_code, countryList)
            setMinText(
                `${min.name}${!min.name.includes('Airport') ? `Airport` : ''} in ${minCountry.name} is ${min.distance <= 400 ? 'only ' : ''}${min.distance}Km from you`
            )
            setMaxText(
                `${max.name}${!max.name.includes('Airport') ? `Airport` : ''} in ${maxCountry.name} is The farthest away from you at ${max.distance}Km`
            )

        }

        if (isOrigin) {
            calcByOrigin()
        }




    }, [origin])

    useEffect(() => {
        let marksArr = []
        if (countryGroups !== {} && countryGroups !== []) {
            data.labels = Object.keys(countryGroups)
            data.datasets = [
                {
                    data: data.labels.map(label => {
                        countryGroups[label].length > 0 && marksArr.push({ value: parseInt(label) })
                        return countryGroups[label].length
                    }),
                    backgroundColor: '#3498DB',
                }

            ]
            setMarks(marksArr)
            setChartData(data)
        }
    }, [countryGroups])

    useEffect(() => {
        const updateLocations = () => {
            let location = {}
            let countryAtDistance = countryGroups[thumbValue]
            let airportAtDistance = airportsByRange[thumbValue]
            countryAtDistance?.map(country => {
                location = { ...location, [country]: airportAtDistance.filter(airport => airport.country_code === country) }
            })
            setLocations(location)
        }

        thumbValue > 0 && debounce(updateLocations(), 300)
    }, [thumbValue])

    useEffect(() => {
        if (thumbValue === 0 || locations === {})
            return setRenderCountryCards(false)
        else
            return setRenderCountryCards(true)
    }, [locations])

    const onSearch = (event) => {
        setIsOrigin(false)
    }
    const onHover = (event) => {
        // console.log('hover', event)
    }
    const onSelect = (event, item) => {
        dispatch(dataActions.setOrigin(item))
        setOrigin(item)
        setIsOrigin(true)
    }
    const onFocus = (event) => {
        // console.log('focus', event)
    }

    const onClear = () => {

        dispatch(dataActions.clearOrigin())
        setThumbValue(0)

        setIsOrigin(false)
        setMinText('')
        setMaxText('')
        setRenderCountryCards(false)
    }

    const formatSuggestions = (item) => {
        return (
            <>
                <span style={{
                    cursor: 'default'
                    , display: 'flex',
                }}>{item.display_name}</span>
            </>
        )

    }


    const handleSelectedRange = (val) => {
        val = parseInt(val)
        debounce(setThumbValue(val), 200)
    }


    return (
        <HowFarWrapper >
            <div style={{ height: '25vh' }}></div>
            <HeroSection >

                <Typography color='primary' fontWeight={600} fontSize={20}  >
                    {isOrigin ? `From` : `Where will you begin your journey?`}
                </Typography>

                <InputContainer >
                    <InputAutocomplete
                        style={{ zIndex: 3 }}
                        onSearch={onSearch}
                        onHover={onHover}
                        onSelect={onSelect}
                        onFocus={onFocus}
                        onClear={onClear}
                        formatSuggestions={formatSuggestions}
                        items={airportList}
                        placeholder={'Find an airport by country, city, name or code'}
                        fuseOptions={{ keys: ['display_name', 'name',] }}
                    />
                </InputContainer>


                <Typography color='primary' height={'30px'} fontWeight={600} fontSize={20}  >
                    {isOrigin && 'How far would you go?'}
                </Typography>
                <InputContainer >
                    <RangeBar
                        drivenValue={thumbValue}
                        disabled={!isOrigin}
                        step={null}
                        max={range}
                        marks={marks}
                        handleSelectedRange={handleSelectedRange}
                    />
                </InputContainer>
                <GraphContainer>
                    <RangeGraph
                        id={'graph'}
                        isActive={isOrigin && airportList !== []}
                        data={chartData}
                        handleSelectedRange={handleSelectedRange}
                    />
                </GraphContainer>

            </HeroSection>
            {isOrigin && !renderCountryCards && <Card>
                <Typography variant="h2" color='primary' fontWeight={600} fontSize={'1rem'}  >
                    Fun facts,
                </Typography>
                <Typography color='primary' fontWeight={600} fontSize={'1rem'} gutterBottom={true}>
                    these are the nearest and most distant airports outside of the country you'll start from
                </Typography>
                <Typography color='primary' fontWeight={400} fontSize={'1rem'} display='block'>
                    <span> {minText} </span> <br />
                    <span>{maxText}</span>
                </Typography>
                {/* <Typography color='primary' fontWeight={400} fontSize={'1rem'}  display="block">
                    {maxText}
                </Typography> */}
            </Card>}
            {renderCountryCards && <CountryCardStack
                locations={locations}
                countries={countryList}
            />}
        </HowFarWrapper>

    )
}

export default HowFar


const InputContainer = styled.div`
width:100%;
position:relative;
padding:20px;
align-items:center;
justify-content:center;
`
const GraphContainer = styled.div`
width:100%;
height:5rem;
position:relative;
align-items:center;
justify-content:center;
padding-top:.5rem;
margin-left:6px;

`
const HowFarWrapper = styled.div`
z-index:800;
position:relative;
height:100%;
width:100%;
display:block;
margin-left:auto;
margin-right:auto;
/* flex-direction:column; */
/* top:25vh; */
/* left:50%; */
max-width: 800px;
/* justify-content:space-around; */
align-items:center;
/* height:100%; */
overflow-x: "hidden";
overflow-y: "visible";
/* max-width: 800px; */
/* overflow:auto; */
`
