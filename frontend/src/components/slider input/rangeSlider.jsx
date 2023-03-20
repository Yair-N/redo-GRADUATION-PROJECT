import * as React from 'react';
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux/es/exports'
import { selectRangedAirports } from '../../context/locations/airports/airportsSlice'
import { useDispatch } from 'react-redux/es/exports'
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

import Slider from '@mui/material/Slider';

import { selectChartData, groupCountriesByRange, setSuggested } from '../../context/locations/countries/countriesSlice.js'
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false
    }
  },
  maintainAspectRatio: false,
  scales: {
    x: {
      display: false,
      position: 'top',
    },
    y: {

      reverse: true,
      display: false,
      beginAtZero: true
    }
  }
};


const valueLabelFormat = (value) => {
  return value;
}

function valuetext(value) {
  return `${value}`;
}
const RangeSlider = (props) => {
  const { sliderHandel, max, step, marks, disabled, chartPending } = props
  const dispatch = useDispatch()
  const rangedAirports = useSelector(selectRangedAirports)
  const [sliderValue, setSliderValue] = useState(0)
  const [data, setData] = useState(useSelector(selectChartData))
  useEffect(() => {
    const generateData = () => {
      const range = groupCountriesByRange(rangedAirports).labels
      const countrySets = groupCountriesByRange(rangedAirports).data
      const countries = countrySets.map(set => Array.from(set))

      setData({
        labels: range,
        datasets: [
          {
            data: countrySets.map(set => set.size),
            backgroundColor: '#3498DB',
          },]
      })
      return { range: range, country: countries }
    }
    const dataSet = generateData()

    dispatch(setSuggested(dataSet))

    // eslint-disable-next-line
  }, [rangedAirports])


  const handelChange = (event) => {
    setSliderValue(event.target.value)

  }
  const handleClick = () => {
    sliderHandel(sliderValue)
  }
  return (
    <Box sx={{ width: 'inherit' }}>
      <Slider
        marks={marks}
        disabled={disabled}
        track={false}
        max={max}
        step={step}
        onChange={handelChange}
        onClick={handleClick}
        aria-label="Range"
        defaultValue={0}
        valueLabelFormat={valueLabelFormat}
        getAriaValueText={valuetext}
        valueLabelDisplay="auto"
      />
      <Box sx={{ height: '45px' }}>
       {chartPending?<LinearProgress /> :<Bar options={options} data={data} />}
      </Box>
    </Box>
  )
}
export default RangeSlider

