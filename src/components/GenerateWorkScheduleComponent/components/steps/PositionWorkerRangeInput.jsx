import React from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Badge from '@mui/material/Badge';
import TextField from '@mui/material/TextField';

import { styled } from '@mui/material/styles';
import { filterUsersByAvailability } from '../../hooks/Functions';

import { ACTIONS } from '../../hooks/Reducer';
import IndeterminateCheckbox from '../../hooks/IndeterminateCheckbox';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const PositionWorkerRangeInput = ({ state, dispatch, WorkPlace, Users }) => {
  const FORM_LIST = [
    {
      FormLabel: 'Specify the minimum duration for the shift:',
      Action: ACTIONS.UPDATE_MIN_DURATION,
      MenuType: 'select',
      FormValue: state.minDuration,
    },
    {
      FormLabel: 'Specify the maximum duration for the shift:',
      FormValue: state.maxDuration,
      Action: ACTIONS.UPDATE_MAX_DURATION,
      MenuType: 'select',
    },
    {
      FormLabel: 'Do you anticipate additional work during this shift?',
      MenuType: 'none',
    },
  ];
  return (
    <>
      <Stack mb={2} spacing={16} justifyContent={'center'} direction="row" sx={{ color: 'action.active' }}>
        Available {state.department}'s department staff on {state.day}
      </Stack>
      <Stack mb={5} spacing={16} justifyContent={'center'} direction="row" sx={{ color: 'action.active' }}>
        <StyledBadge badgeContent={Users.length - filterUsersByAvailability(Users, state.day)} color="success">
          <SentimentVerySatisfiedIcon />
        </StyledBadge>
        <StyledBadge badgeContent={Users.length} color="secondary">
          <EmojiPeopleIcon />
        </StyledBadge>
        <StyledBadge badgeContent={filterUsersByAvailability(Users, state.day)} color="error">
          <SentimentVeryDissatisfiedIcon />
        </StyledBadge>
      </Stack>

      {FORM_LIST.map((item, index) => (
        <FormControl
          key={index}
          variant="outlined"
          sx={{ minWidth: 220, display: 'flex', flexDirection: 'row', alignItems: 'baseline', gap: 5, mb: 2 }}
        >
          <FormLabel sx={{ minWidth: 180 }} key={index} id="demo-radio-buttons-group-label">
            {item.FormLabel}
          </FormLabel>
          {item.MenuType === 'select' ? (
            <TextField
              value={item.FormValue}
              sx={{ minWidth: 100, height: 50, textAlign: 'center' }}
              onChange={(e) => {
                dispatch({ type: item.Action, payload: e.target.value });
              }}
              id="outlined-basic"
              label="hours"
              variant="outlined"
            />
          ) : (
            <IndeterminateCheckbox state={state} dispatch={dispatch} boolean={false} />
          )}
        </FormControl>
      ))}
    </>
  );
};

PositionWorkerRangeInput.propTypes = {
  state: PropTypes.object,
  WorkPlace: PropTypes.object,
  dispatch: PropTypes.func,
  Users: PropTypes.array,
};
export default PositionWorkerRangeInput;
