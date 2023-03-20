import styled, { keyframes } from 'styled-components'
import React from 'react'
import cloud from '../../assets/globe-clouds.png'

const HeaderBg = ({ children }) => {
  return (
    <>
      <Header><div className='banner' />
        <img src={cloud} alt='first cloud' className="first cloud " />
        <img src={cloud} alt='second-cloud' className="second cloud" />
        <img src={cloud} alt='second-cloud' className="third cloud" />
        <img src={cloud} alt='second-cloud' className="forth cloud" />
        {children}
      </Header>
    </>
  )
}

export default HeaderBg

const slideLeftFirst = keyframes`
  from {
    left:180%;
  }

  to {
    left:80%;
  }
`;

const slideLeftSecond = keyframes`
  from {
    left:80%;
  }

  to {
    left:-20%;
  }
`;
const slideLeftThird = keyframes`
  from {
    left:-20%;
  }

  to {
    left:-120%;
  }
`;

const slideLeftForth = keyframes`
  from {
    left:200%;
  }

  to {
    left:-200%;
  }
`;

const Header = styled.div`
height:100%;
width:100%;

position:relative;
& > div.banner{
  position:absolute;
  top:2rem;
  height:40vh;
  width:100%;
  background-color:rgba(52, 152, 219,.8);
  /* background-image:linear-gradient(rgba(52, 152, 219,1),rgba(52, 152, 219,0)); */
}
  & > img.cloud {
    position:absolute;
    top: 5vh;
    height: 40vh;
    width:80%;
    filter: blur(10px) opacity(.3);
    

  }

  & > img.first{
    animation: ${slideLeftFirst} 90s linear infinite;
}

& > img.second{
  animation: ${slideLeftSecond} 90s linear infinite;
}

& > img.third{
  animation: ${slideLeftThird} 90s linear infinite;
}

& > img.forth{
  top:10vh;
  width:60%;
  animation: ${slideLeftForth} 60s linear infinite;
  opacity:.4;
}
`


