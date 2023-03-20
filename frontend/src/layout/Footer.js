import React from 'react'
import { Link } from 'react-router-dom';
import Icon from './Icon'
import InSVG from '../assets/LinkedIn_icon_circle.svg'
import EscSVG from '../assets/logo-192x192.png';
import git from '../assets/github-mark.svg'
import styled from 'styled-components'
import Copyright from './Copyright'
import Box from '@mui/material/Box';


const Footer = () => {
  return (
    <Box  component="footer"
    sx={{
        width:'100%',
        py: 3,
        px: 2,
        mt: 'auto',
        position: 'fixed',
        bottom: 0,
        maxHeight:'200px',
        backgroundColor:'background.white',
        boxShadow:'0px -3px  5px rgb(100 116 139 / 12%)',
        zIndex:3,
    }}>
    <FooterWrapper >
      <LeftSection>
        <div className='Logo'>
          <Icon img_src={EscSVG} alt={'app logo'} style={{ height: '64px' }} />

        </div>
        <Copyright />
      </LeftSection>
      <MidSection>
        <Link to={'/about'} style={{textDecoration:"none", color:'#3498DB'}}>
          about
        </Link>
      </MidSection>
      <RightSection>
        <div className='social'>

          <Icon img_src={git} to={`https://github.com/Yair-N`} internal={false} />
          <Icon img_src={InSVG} to={`https://www.linkedin.com/in/yair-notkovich-01621a226`} internal={false} />

        </div>
      </RightSection>

    </FooterWrapper>
    </Box>
  )
}

export default Footer


const FooterWrapper = styled.footer`
display:flex;
flex-direction:row;
justify-content:space-between;
/* padding:2rem ; */
height:100px;
max-height:15vh;
position: 'fixed';
/* bottom:0;
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  box-shadow: 0px -3px  5px rgb(100 116 139 / 12%); */
`

const LeftSection = styled.div`
width:20%;
> div.Logo{
  margin-bottom:1rem;
}
display:flex;
flex-direction: column;
align-items:center;
/* float:left; */
/* padding-bottom:1rem; */
`

const MidSection = styled.div`
display:block;
margin: auto;
/* padding:3rem; */
width:60%;
min-width:30%;
align-items:left;
justify-content:space-evenly;
left:auto;

`

const RightSection = styled.div`
width:20%;
align-items:center;
display:flex;
flex-direction:column;

& > div.social{
  margin: auto;
  top:50%;
  display:flex;
  justify-content:space-between;
  & img{
    margin-right:.5rem;
  }
}
`