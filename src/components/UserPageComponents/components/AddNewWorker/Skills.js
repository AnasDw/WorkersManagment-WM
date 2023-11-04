import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import { ACTIONS } from './constants';

const Departements = ['Women', 'Men', 'Kids'];
const Role = ['Manager', 'VC Designer', 'Sales Assistant', 'Casher', 'CE-NT', 'OP'];

export default function Skills({ state, dispatch }) {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Skills
      </Typography>
      <Grid item xs={12}>
        <FormControl
          color={state.error ? 'success' : null}
          focused={state.error}
          error={state.error && state.Department === ''}
          sx={{ marginTop: 2 }}
        >
          <FormLabel id="demo-radio-buttons-group-label">In which department the worker can be active?</FormLabel>
          <RadioGroup
            row // eslint-disable-next-line
            aria-labelledby="demo-radio-buttons-group-label"
            value={state.Department}
            onChange={(event) => {
              dispatch({ type: ACTIONS.UPDATE_DEPARTMENT, payload: event.target.value });
            }}
          >
            {Departements.map((data, j) => (
              <FormControlLabel key={j} value={`${data}`} control={<Radio />} label={`${data}`} />
            ))}
          </RadioGroup>
        </FormControl>
        <FormControl
          sx={{ marginTop: 2 }}
          color={state.error ? 'success' : null}
          focused={state.error}
          error={state.error && state.Position === ''}
        >
          <FormLabel id="demo-radio-buttons-group-label">What would be the main role of the worker?</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-radio-buttons-group-label"
            value={state.Position}
            onChange={(event) => {
              dispatch({ type: ACTIONS.UPDATE_POSITION, payload: event.target.value });
            }}
          >
            {Role.map((data, j) => (
              <FormControlLabel key={j} value={`${data}`} control={<Radio />} label={`${data}`} />
            ))}
          </RadioGroup>
        </FormControl>
      </Grid>
    </>
  );
}
