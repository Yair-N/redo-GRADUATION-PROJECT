import React from 'react'
import { Box } from '@mui/material'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import EscSVG from '../../assets/esc.svg';

const Icon = ({ img_src, alt = '', to = '/', internal = true, style }) => {
    return (
        <IconContainer style={{ margin: style?.margin ?? '0' }}>
            {img_src && internal && <Link to={to}>
                <img {...style?.img} style={{ height: style?.height ?? '32px', maxHeight: '64px', width: 'inherit', maxWidth: '64px' }} src={img_src} alt={alt} />
            </Link>
            }
            {img_src && !internal && <a href={to} target="_blank">
                <img {...style?.img} style={{ height: style?.height ?? '32px', maxHeight: '64px', width: 'inherit', maxWidth: '64px' }} src={img_src} alt={alt} />
            </a>}
        </IconContainer>
    )
}

export default Icon


const IconContainer = styled(Box)`
    align-items:center;
    background-color: inherit;
    cursor: pointer;
    
`