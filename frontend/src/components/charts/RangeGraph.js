import React, { useState,useEffect} from 'react'
import { debounce } from '@mui/material';
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
import { useTheme } from '@mui/system';
import styled from 'styled-components';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);







const RangeGraph = ({ isActive, options, data,handleSelectedRange }, otherProps) => {

    const [index, setIndex] = useState(0)
    const [test, setTest] = useState(() => () => { null })


    useEffect(() => {
        setTest(() => () => { null })
        handleSelectedRange(index.label)
    }, [index])
    
    const handleClick = (event) => {

        if (event.type === "click") {
            event.preventDefault()
            setTest(() => (item) => {
                setIndex(item)
            })
        }

    }
    const titleTooltip = (tooltipItems) => {
        let item = tooltipItems[0]
        return item?.raw > 0 && `${item?.label} Km`
    }

    const labelTooltip = (tooltipItems) => {
        let val = tooltipItems.raw

        if (val === 1) return 'There is one Country at this range'
        return `There are ${val} Countries at this range`
    }

    const filterTooltip = (tooltipItem) => {
        if (tooltipItem?.raw > 0) {
            test(tooltipItem)
            return true
        }
        else
            return false
    }

    const defaultOptions = {
        responsive: true,
        interaction: {
            mode: 'nearest',
            axis: 'x',
            intersect: false,
        },
        plugins: {

            legend: {
                display: false
            },
            tooltip: {
                filter: filterTooltip,
                displayColors: false,
                titleAlign: 'center',
                backgroundColor: '#3498DB',
                yAlign: 'top',
                padding: 12,

                callbacks: {
                    title: titleTooltip,
                    label: labelTooltip,
                },
            },
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




    options = { ...defaultOptions, ...options }


    if (isActive)
        return (
            <Graph as={Bar} options={options} data={data} onClick={handleClick} />
        )
    else return <></>
}

export default RangeGraph


const Graph = styled.canvas`
position:absolute;
overflow-x:auto;
`