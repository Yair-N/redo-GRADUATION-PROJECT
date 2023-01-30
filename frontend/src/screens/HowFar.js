import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { useTheme } from '@mui/material/styles';

import { debounce } from '@mui/material';
import Hero from '../components/layout/Hero'
import RangeBar from '../components/input/RangeBar'
import InputAutocomplete from '../components/input/autocomplete/InputAutocomplete'
import RangeGraph from '../components/charts/RangeGraph'

import { selectAirports, dataActions } from '../context/data/dataSlice';
import { groupCountriesByDistance, groupByDistance } from '../utils/geoCalc'





const HowFar = () => {

    const airportList = useSelector(selectAirports)

    const dispatch = useDispatch()
    const data = {
        labels: [],
        datasets:
        {
            data: [],
        },
    };
    const theme = useTheme()
    const [airports, setAirports] = useState({})
    const [countries, setCountries] = useState({})

    const [isOrigin, setIsOrigin] = useState(false)
    const [origin, setOrigin] = useState({})
    const [chartData, setChartData] = useState(data)
    const [marks, setMarks] = useState([])
    const [thumbValue, setThumbValue] = useState([])

    const range = 20000
    const jumps = 100

    useEffect(() => {
        const handleCalcDistance = async () => {
            setCountries(groupCountriesByDistance(origin, airportList, jumps, range))

        }
        if (origin !== {}) {
            handleCalcDistance()
        }
    }, [origin])


    useEffect(() => {
        let marksArr = []
        if (countries !== {} && countries !== []) {
            data.labels = Object.keys(countries)
            data.datasets = [
                {
                    data: data.labels.map(label => {
                        countries[label].length > 0 && marksArr.push({ value: parseInt(label) })
                        return countries[label].length
                    }),
                    backgroundColor: '#3498DB',
                }

            ]
            setMarks(marksArr)
            setChartData(data)
        }
    }, [countries])


    const onSearch = (event) => {
        // console.log('search', event)
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
        debounce(setThumbValue(val), 200)
    }


    return (
        <Hero style={{ zIndex: 3 }}>
            <span>
                Where will you begin your journey?
            </span>
            <InputContainer >
                <InputAutocomplete
                    style={{ zIndex: 1 }}
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

            <HowFarWrapper >
                <span>
                    How far Would you like to travel?
                </span>
                <InputContainer >
                    <RangeBar
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
                        isActive={isOrigin && airports !== []}
                        data={chartData}
                    />
                </GraphContainer>
            </HowFarWrapper>

        </Hero>
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


`
