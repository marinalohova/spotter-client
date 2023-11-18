import React from 'react';
import { Grid } from '@mui/material';

/**
 * Header layout component
 * @return {Object}
 */
const Header = () => {
  return (
    <div>
      <Grid container>
        <Grid item xs={12} >
            &#9650; Spotter
        </Grid>
      </Grid>
    </div>
  );
};

export default Header;
