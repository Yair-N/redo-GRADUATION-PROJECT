import styled from "styled-components"
import { Box } from "@mui/system"

export const Card = styled(Box)`
/* position:relative; */
z-index:2;
display:flex;
flex-direction:column;

margin-bottom:.1rem;
padding:.5rem;
width:100%;
max-height:45vh;
max-width:800px;
background-color:#ffffff;
border-radius:1rem;
box-shadow: .1rem .1rem 15px -2px gray;`