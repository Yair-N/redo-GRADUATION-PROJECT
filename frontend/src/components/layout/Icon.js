import React from 'react'
import { Box } from '@mui/material'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import EscSVG from '../../assets/esc.svg';

const Icon = ({ img_src, alt = '', to = '/', internal = true }) => {

    return (
        <IconContainer>
            {img_src && internal && <Link to={to}>
                <img src={img_src} alt={alt} />
            </Link>
            }
            {img_src && !internal && <a href={to}>
                <img src={img_src} alt={alt} />
            </a>}
        </IconContainer>
    )
}

export default Icon


const IconContainer = styled(Box)`
    margin: .5rem;
    width: 3rem;
    height: 3rem;
    background-color: inherit;
    cursor: pointer;
`