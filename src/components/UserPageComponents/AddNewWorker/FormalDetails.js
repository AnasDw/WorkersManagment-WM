import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import { ACTIONS } from './constants';

export default function FormalDetails({ state, dispatch }) {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Formal Details
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            error={state.error && state.FirstName.length < 2}
            value={state.FirstName}
            id="firstName"
            name="firstName"
            focused={state.error}
            label="First name"
            fullWidth
            color={state.error ? 'success' : null}
            autoComplete="given-name"
            variant="standard"
            onChange={(e) => {
              dispatch({ type: ACTIONS.UPDATE_FIRST_NAME, payload: e.target.value });
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            color={state.error ? 'success' : null}
            focused={state.error}
            error={state.error && state.LastName.length < 2}
            value={state.LastName}
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            onChange={(e) => {
              dispatch({ type: ACTIONS.UPDATE_LAST_NAME, payload: e.target.value });
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            focused={state.error}
            error={state.error && state.PhoneNumber.length < 10}
            value={state.PhoneNumber}
            id="phoneNumber"
            color={state.error ? 'success' : null}
            onChange={(e) => {
              dispatch({ type: ACTIONS.UPDATE_PHONE, payload: e.target.value });
            }}
            name="phoneNumber"
            label="Phone Number"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              value={state.Gender}
              onChange={(e) => {
                dispatch({ type: ACTIONS.UPDATE_GENDER, payload: e.target.value });
              }}
            >
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="other" control={<Radio />} label="Other" />
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            checked={state.Under18}
            onChange={(e) => {
              dispatch({ type: ACTIONS.UPDATE_IS18 });
            }}
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Is the worker under the age of 18?"
          />
        </Grid>
      </Grid>
    </>
  );
}
