import React from 'react'
import { Grid ,Container} from '@mui/material';
import FarAwayHero from '../components/FarAwayHero'



const FarAway = () => {

    return (

        <Grid container 
        spacing={3} 
        marginTop={'10vh'}
        
        >
            <Container style={{justifyContent:'center', display:'flex'}}>
            <FarAwayHero >

            </FarAwayHero>
            </Container>
        </Grid>

    )
}

export default FarAway