import React from 'react'
import { Typography } from '@mui/material'
import Link from '@mui/material/Link'


const Copyright = ({ link_text = 'Yair Notkovich', href = '/', isLink = false }, otherProps) => {
    return (
        <Typography sx={{display: 'block',}}variant="body2" color="text.secondary" align="inherit" {...otherProps}>
            {'Copyright © '}
            <Link sx={{ cursor: isLink ? 'default' : 'text', textDecoration: isLink ? 'underline' : 'none', }}
                color="inherit" href={href}>
                {link_text}{' '}{new Date().getFullYear()}{'.'}
            </Link>{' '}

        </Typography>
    )
}

export default Copyright
