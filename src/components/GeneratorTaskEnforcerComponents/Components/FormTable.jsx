import * as React from 'react';
import PropTypes from 'prop-types';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';
import Skeleton from '@mui/material/Skeleton';
import { useNavigate } from 'react-router-dom';
import { patchRequest } from '../../../api/axiosVerbs';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function FormTable({ WorkPlace, PulledUser }) {
  const navigate = useNavigate();

  const [Request, setRequest] = useState([]);
  const [Loading, SetLoading] = useState(false);

  useEffect(() => {
    if (WorkPlace) {
      setRequest(() => {
        const temp = WorkPlace.operatingDaysAndTimes.map((item) => ({ Day: item.day, req: 'Free' }));
        return temp;
      });
      SetLoading(false);
    }
  }, [WorkPlace]);

  const handleSubmitForm = (event) => {
    try {
      event.preventDefault();
      patchRequest(`updateWorkerRequestByPhoneNumber/${PulledUser.phoneNumber}`).then(
        navigate('/200', { replace: true })
      );
    } catch (error) {
      console.error(error);
    }
  };

  return !Loading ? (
    <>
      <Box
        justifyContent="center"
        onSubmit={handleSubmitForm}
        component="form"
        sx={{
          width: 400,
          mt: -3,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Grid container my={2} mb={5} spacing={2} justifyContent="center" alignItems="center">
          <Grid md={12} sm={12} xs={12} item>
            <Typography variant={'h6'}>Requesting Your Detailed Task Directives</Typography>
          </Grid>
          <Grid md={12} sm={12} xs={12} item>
            <TableContainer component={Paper}>
              <Table aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Days</StyledTableCell>
                    <StyledTableCell align="left">Request</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {!Loading
                    ? WorkPlace?.operatingDaysAndTimes?.map((day, i) => (
                        <StyledTableRow key={day.day}>
                          <StyledTableCell sx={{ p: 1 }} component="th" scope="row">
                            {day.day}
                          </StyledTableCell>
                          <StyledTableCell key={day.day} sx={{ p: 0 }} align="left">
                            <FormControl key={day.day} variant="standard" sx={{ m: 1, minWidth: 120 }}>
                              <InputLabel key={day.day} id="demo-simple-select-standard-label">
                                Choice
                              </InputLabel>
                              <Select
                                value={Request[i]?.req}
                                onChange={(e) => {
                                  setRequest((old) => {
                                    const newValue = [...old];
                                    newValue[i].req = e.target.value;
                                    return newValue;
                                  });
                                }}
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                label="Age"
                              >
                                {['Free', 'Morning', 'Evening', 'Afternoon', "Can't Work"].map((item, i) => (
                                  <MenuItem key={i} value={item}>
                                    {item}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))
                    : null}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          sx={{
            mb: 2,
            width: 400,
            backgroundColor: '#000000',
            '&:hover': {
              backgroundColor: '#3c3c3c',
              transition: '1s',
            },
          }}
        >
          Submit
        </Button>
      </Box>
    </>
  ) : (
    <>
      <Box sx={{ width: 300 }}>
        <Skeleton />
        <Skeleton animation="wave" />
        <Skeleton animation={false} />
      </Box>
    </>
  );
}

FormTable.propTypes = {
  WorkPlace: PropTypes.object,
  PulledUser: PropTypes.object,
};
