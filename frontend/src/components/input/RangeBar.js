import React, { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { Slider } from '@mui/material'
import { useTheme } from '@mui/material'
import { debounce } from '@mui/material'

const RangeBar = (

    {
        handleSelectedRange,
        disabled,
        step,
        max,
        marks,
        drivenValue,
    }
) => {
    const [value, setValue] = useState(0)

    useEffect(() => {
        if (value !== drivenValue && drivenValue)
            setValue(drivenValue)
        if (disabled) setValue(0)
    }, [drivenValue,disabled])


    const handleChange = (event, newValue) => {
        setValue(newValue)

    }
    const handleCommit = () => {
        handleSelectedRange(value)
    }

    return (
        <div>
            <RangeSlider
                disabled={disabled}
                defaultValue={0}
                value={value}
                step={step}
                max={max}
                marks={marks}
                aria-label='Range'
                onChange={handleChange}
                onChangeCommitted={handleCommit}
                valueLabelDisplay="auto"
                track={false}
            />
        </div>
    )
}

export default RangeBar






const RangeSlider = styled(Slider)(({ theme }) => ({
    position: 'absolute',
    color: theme.palette.primary.main,
    transform: 'translate(-14px)',
    height: 8,

    '& .MuiSlider-track': {
        border: 'none',


    },
    '& .MuiSlider-thumb': {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
            boxShadow: 'inherit',
        },
        '&:before': {
            display: 'none',
        },
    },
    '& .MuiSlider-valueLabel': {
        lineHeight: 1.2,
        fontSize: 13,
        background: 'unset',
        padding: 0,
        width: 42,
        height: 42,
        borderRadius: '50% 50% 50% 0',
        backgroundColor: theme.palette.primary.main,

        transformOrigin: 'bottom left',
        transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
        '&:before': { display: 'none' },
        '&.MuiSlider-valueLabelOpen': {
            transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
        },
        '& > *': {
            transform: 'rotate(45deg)',
        },
    },
    '& .MuiSlider-mark': {
        display: 'none',
    },
}));
