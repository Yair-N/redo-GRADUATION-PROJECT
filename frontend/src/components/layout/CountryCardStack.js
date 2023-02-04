import React from 'react'
import styled from 'styled-components'
import { returnCountry } from '../../utils/geoCalc'
import CountryCard from '../cards/CountryCard'


const CountryCardStack = ({ locations = {}, countries }) => {



  return (
    <StackWrapper>
      {Object.keys(locations).map((code, index) => { return <CountryCard country={returnCountry(code, countries)} airports={locations[code]} /> })}
    </StackWrapper>
  )
}
export default CountryCardStack



const StackWrapper = styled.div`
position:relative;
max-width:800px;
margin-left:auto;
overflow-y: visible;
min-height:30vh;
margin-left:auto;
margin-right:auto;
/* left:50%; */
`