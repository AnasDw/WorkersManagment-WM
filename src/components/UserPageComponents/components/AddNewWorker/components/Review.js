import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';

import PropTypes from 'prop-types';

Review.propTypes = { state: PropTypes.object };

export default function Review({ state }) {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6}>
            <Typography variant="h6" gutterBottom sx={{ mt: 2, color: '#2165D1' }}>
              Formal Detail
            </Typography>
            <Typography gutterBottom>
              <strong>Name: </strong>
              <span>{` ${state.FirstName} ${state.LastName}`}</span>
            </Typography>
            <Typography gutterBottom>
              <strong>Phone Number: </strong>
              <span>{`${state.PhoneNumber}`}</span>
            </Typography>
            <Typography gutterBottom>
              {' '}
              <strong>{state.Under18 ? ' Young' : 'Adult'} </strong>
            </Typography>
          </Grid>
          <Grid item container direction="column" xs={12} sm={6} md={6}>
            <Typography variant="h6" gutterBottom sx={{ mt: 2, color: '#2165D1' }}>
              Skills
            </Typography>
            <Grid container direction="column">
              <>
                <Grid item>
                  <Typography gutterBottom>
                    <strong>Main Department: </strong> {state.Department}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography gutterBottom>
                    <strong> Main Position: </strong> {state.Position}
                  </Typography>
                </Grid>
              </>
            </Grid>
          </Grid>
        </Grid>
      </Typography>
    </>
  );
}
