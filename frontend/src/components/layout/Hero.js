import React from 'react'
import styled from 'styled-components'
import { Box } from '@mui/material'

const Hero = ({ children }) => {
    return (
        <HeroSection>
            { children }
        </HeroSection>
    )
}

export default Hero

const HeroSection = styled(Box)`
position:absolute;
z-index:5;

display:flex;
flex-direction:column;
top:25vh;
left:50%;
margin:10px 10px 10px 10px;
padding:30px;
width:100%;
height:100%;
min-height:400px;
max-height:30vh;
max-width:800px;
background-color:#ffffff;
border-radius:1rem;
transform:translate(-50%);
box-shadow: .1rem .1rem 15px -2px gray;
`