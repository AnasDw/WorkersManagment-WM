import React from 'react';
import PropTypes from 'prop-types';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { ACTIONS } from '../../hooks/Reducer';

const ScheduleConfigurationInput = ({ state, dispatch }) => (
  <>
    <FormControl variant="filled" sx={{ minWidth: 220 }}>
      <InputLabel id="demo-simple-select-filled-label">Select Department:</InputLabel>
      <Select
        labelId="demo-simple-select-filled-label"
        id="demo-simple-select-filled"
        value={state.department}
        onChange={(e) => {
          dispatch({ type: ACTIONS.UPDATE_DEPARTMENT, payload: e.target.value });
        }}
      >
        {state.WorkPlace.departmentsNames?.map((list, j) => (
          <MenuItem sx={{ maxHeight: '150px', overflow: 'scroll' }} key={j} value={list}>
            {list}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  </>
);

ScheduleConfigurationInput.propTypes = {
  state: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default ScheduleConfigurationInput;
