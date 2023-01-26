import React from 'react'
import styled from 'styled-components'
import freedom from '../assets/freedom.jpeg'
import cloud from '../assets/favpng_world-map-globe.png'
import HeroSection from '../components/hero/HeroSection'
import { Paper, Box, Grid, Container } from '@mui/material'
const Home = () => {
  return (
    <section style={{ position: 'relative', height: '100hv' }}>

      <Header>
      </Header>
      <Blur/>
      <Clouds src={cloud}/>
      <HeroTest as={Box} sx={{ width: { sm: '100vw', md: '600px',xl: '800px' }, minWidth: '360px', height: '70vh' }} >
        rdfgdfg
      </HeroTest>
    </section>
  )
}

export default Home

const Header = styled.header`
height: 100vh;
width: 100%;
position: relative;
top:3px;
background-image:url(${freedom});
background-size: cover;
background-position: top;
-webkit-clip-path: polygon(0 0, 100% 0, 100% 30%, 0 30%);
clip-path: polygon(0 0, 100% 0, 100% 32vh, 0 32vh);
filter: blur(5px) opacity(.8);



`
const Blur = styled.section`
  position: absolute;
  top:33vh;
  width:100%;
  /* background-color:black; */
  background-image:linear-gradient(rgba(249, 250, 252,0),rgba(249, 250, 252,0.5),rgba(249, 250, 252,1),rgba(249, 250, 252,1) );
  height:15vh;
  transform: translate(0,-100%);
/* filter: opacity(.5); */

  /* filter: blur(2px); */
`

const Clouds = styled.img`
position:absolute;
width:100%;
height:60%;
top:10%;
filter: opacity(.3) blur(8px) sepia(1) hue-rotate(160deg) brightness(1.2) ;

`

const HeroTest = styled.div`
display: flex;
flex-direction: column;
align-items: center;
position: absolute;
top: 40%;
left: 50%;
transform: translate(-50%,-40%);
height: 70vh;
background-color: white;
box-shadow:2px 5px 15px -5px rgba(100, 116, 139, 0.25);
border-radius:.5rem;
`
