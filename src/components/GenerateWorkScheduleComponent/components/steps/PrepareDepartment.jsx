import React from 'react';
import PropTypes from 'prop-types';

import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Select from '@mui/material/Select';
import { ACTIONS } from '../../hooks/Reducer';
import { filterPastDaysOfWeek } from '../../hooks/Functions';
import IndeterminateCheckbox from '../../hooks/IndeterminateCheckbox';

const PrepareDepartment = ({ state, dispatch, WorkPlace }) => {
  const FORM_LIST = [
    {
      FormLabel: 'Select Department:',
      Action: ACTIONS.UPDATE_DEPARTMENT,
      MenuList: WorkPlace.departmentsNames,
      MenuType: 'Select',
      FormValue: state.department,
    },
    {
      FormLabel: 'Select Day:',
      FormValue: state.day,
      MenuType: 'Select',
      Action: ACTIONS.UPDATE_DAY,
      MenuList: filterPastDaysOfWeek(WorkPlace?.operatingDaysAndTimes.map((item) => item.day)),
    },
    {
      MenuType: 'time',
      FormLabel: 'Select Opening Time:',
      Action: ACTIONS.UPDATE_OPENING_TIME,
      FormValue: state.openingTime,
    },
    {
      FormLabel: 'Select Closing Time:',
      FormValue: state.closingTime,
      Action: ACTIONS.UPDATE_CLOSING_TIME,
      MenuType: 'time',
    },
    {
      FormLabel: 'Select Shift Preference:',
      MenuType: 'none',
    },
  ];

  return (
    <>
      {FORM_LIST.map((item, index) => (
        <FormControl
          key={index}
          variant="outlined"
          sx={{ minWidth: 220, display: 'flex', flexDirection: 'row', alignItems: 'baseline', gap: 5, mb: 2 }}
        >
          <FormLabel sx={{ minWidth: 180 }} key={index} id="demo-radio-buttons-group-label">
            {item.FormLabel}
          </FormLabel>

          {item.MenuType === 'Select' ? (
            <Select
              sx={{ minWidth: 140, height: 50, textAlign: 'center' }}
              value={item.FormValue}
              onChange={(e) => {
                dispatch({ type: item.Action, payload: e.target.value });
              }}
            >
              {item.MenuList.map((list, j) => (
                <MenuItem sx={{ maxHeight: '150px', overflow: 'scroll' }} key={j} value={list}>
                  {list}
                </MenuItem>
              ))}
            </Select>
          ) : item.MenuType === 'time' ? (
            <LocalizationProvider required dateAdapter={AdapterDayjs}>
              <TimePicker
                sx={{ maxWidth: 140 }}
                value={item.FormValue}
                onChange={(newValue) => {
                  dispatch({ type: item.Action, payload: newValue });
                }}
              />
            </LocalizationProvider>
          ) : (
            <IndeterminateCheckbox state={state} dispatch={dispatch} />
          )}
        </FormControl>
      ))}
    </>
  );
};

PrepareDepartment.propTypes = {
  state: PropTypes.object.isRequired,
  WorkPlace: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};
export default PrepareDepartment;
