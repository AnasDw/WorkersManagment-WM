import * as React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { ACTIONS } from './Reducer';

export default function IndeterminateCheckbox({ state, dispatch, boolean }) {
  const handleChange1 = (event) => {
    if (boolean === false)
      dispatch({ type: ACTIONS.UPDATE_EXPECTATIONS, payload: [event.target.checked, event.target.checked] });
    else dispatch({ type: ACTIONS.UPDATE_SHIFTS, payload: [event.target.checked, event.target.checked] });
  };

  const handleChange2 = (event) => {
    if (boolean === false)
      dispatch({ type: ACTIONS.UPDATE_EXPECTATIONS, payload: [event.target.checked, state.expectations[1]] });
    else dispatch({ type: ACTIONS.UPDATE_SHIFTS, payload: [event.target.checked, state.shifts[1]] });
  };

  const handleChange3 = (event) => {
    if (boolean === false)
      dispatch({ type: ACTIONS.UPDATE_EXPECTATIONS, payload: [state.expectations[0], event.target.checked] });
    else dispatch({ type: ACTIONS.UPDATE_SHIFTS, payload: [state.shifts[0], event.target.checked] });
  };

  const children = (
    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
      <FormControlLabel
        label="Morning"
        control={
          <Checkbox checked={boolean === false ? state.expectations[0] : state.shifts[0]} onChange={handleChange2} />
        }
      />
      <FormControlLabel
        label="Evening"
        control={
          <Checkbox checked={boolean === false ? state.expectations[1] : state.shifts[1]} onChange={handleChange3} />
        }
      />
    </Box>
  );

  return (
    <div>
      <FormControlLabel
        label="Choose all"
        control={
          <Checkbox
            checked={
              boolean === false ? state.expectations[0] && state.expectations[1] : state.shifts[0] && state.shifts[1]
            }
            indeterminate={
              boolean === false ? state.expectations[0] !== state.expectations[1] : state.shifts[0] !== state.shifts[1]
            }
            onChange={handleChange1}
          />
        }
      />
      {children}
    </div>
  );
}

IndeterminateCheckbox.propTypes = {
  state: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  boolean: PropTypes.bool,
};
