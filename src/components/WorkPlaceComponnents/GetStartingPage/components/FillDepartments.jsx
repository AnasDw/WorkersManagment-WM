import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const FillDepartments = ({ Bool, handleData }) => {
  const [DepartmentsVal, setDepartmentsVal] = useState(0);
  const [DepartmentsNames, setDepartmentsNames] = useState([]);

  useEffect(() => {
    if (Bool) {
      handleData(DepartmentsNames);
    }
    // eslint-disable-next-line
  }, [Bool]);

  const addChange = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const newData = [];
    data.forEach((item) => newData.push(item));
    setDepartmentsNames(newData);
  };

  return (
    <>
      <FormControl sx={{ marginTop: '1rem' }} fullWidth>
        <InputLabel id="demo-simple-select-label">How many departments you have ?</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={DepartmentsVal}
          label="How many departments you have ?"
          onChange={(e) => {
            setDepartmentsVal(e.target.value);
          }}
        >
          {['One', 'Two', 'Three', 'Four', 'Five'].map((value, index) => (
            <MenuItem key={index} value={index + 1}>
              {value}
            </MenuItem>
          ))}
        </Select>

        <Box spacing={2} component="form" onChange={addChange}>
          {Array.from({ length: DepartmentsVal }, (_, index) => (
            <TextField
              key={index}
              margin="normal"
              required
              xs={12}
              md={6}
              id="name"
              label={`Department number ${index + 1}`}
              name={`DepartmentNumber${index + 1}`}
              autoFocus
            />
          ))}
        </Box>
      </FormControl>
    </>
  );
};

FillDepartments.propTypes = {
  Bool: PropTypes.bool,
  handleData: PropTypes.func,
};

export default FillDepartments;
