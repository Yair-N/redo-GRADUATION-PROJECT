import React, { useState } from 'react'
import styled from '@emotion/styled'
import { Slider } from '@mui/material'

const RangeBar = (props,
    {
        onChange = () => { null },
        onMouseUp = () => { null },
    }) => {

    const [value, setValue] = useState(0)

    const handleChange = (event) => {
        event.preventDefault()
        setValue(event.target.value)
        onChange()
        console.log(value)
    }

    const handleMouseUp = (event) => {

        onMouseUp()

    }
    return (
        <RangeSlider
            value={value}
            onChange={(event) => handleChange(event)}
            onMouseUp={(event) => handleMouseUp(event)}
            {...props} />
    )
}

export default RangeBar






const RangeSlider = styled(Slider)({
    position: 'absolute',
    color: props => props.theme.pallette.primary.main,
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
        fontSize: 12,
        background: 'unset',
        padding: 0,
        width: 32,
        height: 32,
        borderRadius: '50% 50% 50% 0',
        backgroundColor: props => props.theme.pallette.primary.main,
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
});
