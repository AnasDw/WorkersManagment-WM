import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';

import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import { ACTIONS } from '../../hooks/Reducer';

// eslint-disable-next-line
const PositionWorkerRangeInput = ({ state, WorkPlace, dispatch }) => {
  const [PositionsDemand, setPositionsDemand] = useState(
    Array.from({ length: state.shifts.length }, (_, i) => {
      const temp = i === 0 ? 'Morning' : 'Evening';
      if (state.shifts[i]) {
        const positions = WorkPlace.positions.find((pos) => pos.Dep === state.department)?.Pos;
        const obj = { shift: temp, positions: [] };
        if (positions)
          for (let j = 0; j < positions.length; ) {
            obj.positions.push({ pos: positions[j], minWorkers: 0, maxWorkers: 0 });
            j += 1;
          }
        return obj;
      }
      return false;
    })
  );

  useEffect(() => {
    // Initialize only once
    if (PositionsDemand.length > 0 && state.positionsDemand.length === 0) {
      dispatch({ type: ACTIONS.UPDATE_POSITIONS_DEMAND, payload: PositionsDemand });
    } else {
      setPositionsDemand(state.positionsDemand);
    }
    // eslint-disable-next-line
  }, [PositionsDemand]);

  const handleChange = (shift, position, newValue, path) => {
    setPositionsDemand((old) => {
      const newArray = [...old];
      const targetPosition = newArray[shift].positions[position];

      // Update either minWorkers or maxWorkers based on the provided path
      if (path === 'min') {
        targetPosition.minWorkers = newValue;
      } else if (path === 'max') {
        targetPosition.maxWorkers = newValue;
      }

      return newArray;
    });
    dispatch({ type: ACTIONS.UPDATE_POSITIONS_DEMAND, payload: PositionsDemand });
  };

  return (
    <>
      <Stack mb={2} spacing={16} direction="row" sx={{ color: 'action.active' }}>
        Specify the required number of workers for each position in every shift
      </Stack>
      {state.positionsDemand?.length > 0
        ? state.positionsDemand.map((shift, index) =>
            shift !== false ? (
              <FormControl
                key={index}
                variant="outlined"
                sx={{ minWidth: 220, display: 'flex', flexDirection: 'column', alignItems: 'baseline', mb: 2 }}
              >
                <FormLabel
                  sx={{ minWidth: 180, color: '#2165D1', mt: 2, mb: 2 }}
                  key={index}
                  id="demo-radio-buttons-group-label"
                >
                  {shift.shift}:
                </FormLabel>
                {shift.positions.map((position, j) => (
                  <FormControl
                    key={j}
                    variant="outlined"
                    sx={{ minWidth: 220, display: 'flex', flexDirection: 'row', alignItems: 'baseline', gap: 1, mb: 2 }}
                  >
                    <FormLabel sx={{ minWidth: 180, color: 'black' }} key={j} id="demo-radio-buttons-group-label">
                      {position.pos}
                    </FormLabel>
                    <TextField
                      sx={{ minWidth: 100, height: 50, textAlign: 'center' }}
                      id={`hours-${index}-${j}`}
                      label="min workers"
                      variant="outlined"
                      onChange={(e) => {
                        handleChange(index, j, e.target.value, 'min');
                      }}
                      value={position.minWorkers}
                    />
                    <TextField
                      sx={{ minWidth: 100, height: 50, textAlign: 'center' }}
                      id={`hours-${index}-${j}`}
                      onChange={(e) => {
                        handleChange(index, j, e.target.value, 'max');
                      }}
                      label="max workers"
                      variant="outlined"
                      value={position.maxWorkers}
                    />
                  </FormControl>
                ))}
              </FormControl>
            ) : null
          )
        : null}
    </>
  );
};

PositionWorkerRangeInput.propTypes = {
  state: PropTypes.object,
  WorkPlace: PropTypes.object,
  dispatch: PropTypes.func,
};
export default PositionWorkerRangeInput;
