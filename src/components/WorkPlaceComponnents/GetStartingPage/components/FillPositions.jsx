import { useState } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { TransferList } from '.';

const FillPositions = ({ data }) => {
  const [Data, setData] = useState(data);
  const [Bool, setBool] = useState(false);

  const initialCounterValues = Array(Data.DepartmentsNames.length).fill(0);
  const [CounterValues, setCounterValues] = useState(initialCounterValues);

  const TEMP = Data.DepartmentsNames.map((item, index) => ({
    dep: item,
    pos: Array(CounterValues[index]).fill(null),
  }));

  const [PosValues, setPosValues] = useState(TEMP);

  const handleSubmit = (event) => {
    event.preventDefault();
    let NextBoolean = true;
    for (let index = 0; index < PosValues.length; ) {
      if (PosValues[index].pos.length < 1) {
        NextBoolean = false;
        return false;
      }
      if (PosValues[index].pos >= 1) {
        for (let j = 0; index < PosValues[index].pos.length; ) {
          if (PosValues[index].pos[j] == null) {
            NextBoolean = false;
            return false;
          }
          j += 1;
        }
      }
      index += 1;
    }
    if (NextBoolean) {
      setData((old) => {
        const newData = old;
        newData.Positions = old.DepartmentsNames.map((item, i) => ({ Dep: item, Pos: PosValues[i].pos }));
        return newData;
      });
      setBool(true);
    }
    return true;
  };

  const addChange = (event, index, dep) => {
    event.preventDefault();
    setPosValues((old) => {
      const newData = [...old];
      newData.find((v) => v.dep === dep).pos[index] = event.target.value;
      return newData;
    });
  };

  return (
    <>
      {!Bool ? (
        <Box
          key={'aa'}
          component="form"
          onSubmit={handleSubmit}
          sx={{
            mt: 3,
          }}
        >
          <Typography
            sx={{
              mt: 3,
              mb: 3,
            }}
            md={12}
            sm={12}
            xs={12}
            variant={'h6'}
          >
            Please provide the Positions for each day department
          </Typography>

          {Data.DepartmentsNames.map((dep, index) => (
            <FormControl
              key={index}
              mb={2}
              sx={{
                mt: 1,
                borderRadius: '5px',
                boxShadow: ' rgba(149, 157, 165, 0.2) 0px 8px 24px',
                marginBottom: '3rem',
              }}
              fullWidth
            >
              <InputLabel id="demo-simple-select-label">
                How many positions do you have in the <strong> {dep} </strong> section?
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={CounterValues[index]}
                label={` How many positions do you have in the ${(<strong> dep </strong>)} section?`}
                onChange={(e) => {
                  setCounterValues((old) => {
                    const newCounter = [...old];
                    newCounter[index] = e.target.value;
                    return newCounter;
                  });
                }}
              >
                {Array(10)
                  .fill()
                  .map((_, index) => (
                    <MenuItem key={index + 1} value={index + 1}>
                      {index + 1}
                    </MenuItem>
                  ))}
              </Select>

              <Box key={'ab'} rowGap={1} columnGap={1} component="form">
                {Array.from({ length: CounterValues[index] }, (_, index) => (
                  <TextField
                    key={index}
                    margin="normal"
                    required
                    value={PosValues.find((v) => v.dep === dep).pos[index]}
                    xs={12}
                    md={6}
                    id="name"
                    label={`Position number ${index + 1}`}
                    name={`PositionNumber${index + 1}`}
                    autoFocus
                    onChange={(event) => {
                      addChange(event, index, dep);
                    }}
                  />
                ))}
              </Box>
            </FormControl>
          ))}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: '#F1BC8D',
              '&:hover': {
                backgroundColor: '#1CB7A6',
                transition: '1s',
              },
            }}
          >
            Next
          </Button>
        </Box>
      ) : (
        <TransferList data={Data} />
      )}
    </>
  );
};

export default FillPositions;
