import React from 'react'
import HeaderBg from '../components/layout/HeaderBg'
import HowFar from '../screens/HowFar'
import styled from 'styled-components'

const Home = () => {
  return (
    <>
      <HeaderBg />
      <HowFarContainer>
        <HowFar />
      </HowFarContainer>
    </>
  )
}

export default Home

const PageBody = styled.div`
height:100%;
/* min-height:80vh; */
`


const HowFarContainer = styled.div`
z-index:1000;
height:90vh;
display:flex;
flex-direction:column;
position:relative;
align-items:center;
overflow-x:hidden;
overflow-y:visible;
`