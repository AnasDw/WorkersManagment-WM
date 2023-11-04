import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';

import PropTypes from 'prop-types';

Review.propTypes = { state: PropTypes.object };

export default function Review({ state }) {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Form summary
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6}>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Formal Detail
            </Typography>
            <Typography gutterBottom>
              <strong>Name: </strong>
              {` ${state.FirstName} ${state.LastName}`}
            </Typography>
            <Typography gutterBottom>
              <strong>PhoneNumber: </strong>
              {` ${state.PhoneNumber}`}
            </Typography>
            <Typography gutterBottom>
              <strong> Gender:</strong>
              {` ${state.Gender}`}
            </Typography>
            <Typography gutterBottom>{state.Under18 ? ' Young' : null}</Typography>
          </Grid>
          <Grid item container direction="column" xs={12} sm={6} md={6}>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Skills
            </Typography>
            <Grid container direction="column">
              <fragment>
                <Grid item>
                  <Typography gutterBottom>
                    <strong>Main Department: </strong> {state.Department}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography gutterBottom>
                    <strong> Main Role: </strong> {state.Position}
                  </Typography>
                </Grid>
              </fragment>
            </Grid>
          </Grid>
        </Grid>
      </Typography>
    </>
  );
}
