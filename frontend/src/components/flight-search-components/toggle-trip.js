import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Chip from '@mui/material/Chip';
import { Box } from '@mui/material';

export default function ToggleTrip() {
  const [alignment, setAlignment] = React.useState('one');

  const handleChange = (event, newAlignment) => {

    setAlignment(newAlignment);
  };

  return (
    <Box sx={{ padding: 1, }} >
      <ToggleButtonGroup
        color="secondary"
        value={alignment}
        exclusive
        aria-label="Platform"

      >
        <ToggleButton
          sx={{ height: '15px' }}
          onClick={handleChange}
          value="one"  >one way</ToggleButton>
        <ToggleButton
          sx={{ height: '15px' }}

          onClick={handleChange}
          value="round" >Round trip</ToggleButton>


      </ToggleButtonGroup>
    </Box>
  );
}
