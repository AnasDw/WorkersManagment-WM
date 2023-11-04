import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { pushData } from '../../../../config/FireBase/CRUD';
import { auth } from '../../../../config/FireBase';

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
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function TimeTable({ days, data }) {
  const [DaysList, setDaysList] = useState([]);
  const [OTList, setOTList] = useState(Array(DaysList.length).fill(null));
  const [CTList, setCTList] = useState(Array(DaysList.length).fill(null));

  useEffect(() => {
    const sortedWeekdays = days.sort((a, b) => {
      const order = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      return order.indexOf(a) - order.indexOf(b);
    });
    setDaysList(() => {
      return sortedWeekdays;
    });
  }, [days]);

  const handleOTChange = (index, val) => {
    setOTList((old) => {
      const newVal = [...old];
      newVal[index] = val;
      return newVal;
    });
  };
  const handleCTChange = (index, val) => {
    setCTList((old) => {
      const newVal = [...old];
      newVal[index] = val;
      return newVal;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const temp = DaysList.map((item, i) => ({ day: item, open: OTList[i].$d, close: CTList[i].$d }));

    for (let i = 0; i < temp.length; ) {
      if (temp[i].open == null || temp[i].close == null) {
        return false;
      }
      i += 1;
    }
    data.OperatingDaysAndTimes = temp;
    SendRequest(data);
    return true;
  };

  const SendRequest = async (req) => {
    try {
      await pushData('Managers', req, auth.currentUser.email)
        .then(() => {
          window.location.reload();
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      key={'aa'}
      component="form"
      onSubmit={handleSubmit}
      sx={{
        mt: 1,
      }}
    >
      <Grid container my={2} mb={5} spacing={2} md={12} sm={12} xs={12} justifyContent="center" alignItems="center">
        <Grid md={12} sm={12} xs={12} item>
          <Typography md={12} sm={12} xs={12} variant={'h6'}>
            Please provide the opening and closing times for each day
          </Typography>
        </Grid>
        <Grid md={12} sm={12} xs={12} item>
          <TableContainer sx={{ marginBottom: 4 }} component={Paper}>
            <Table aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Days</StyledTableCell>
                  <StyledTableCell align="left">OpeningTime</StyledTableCell>
                  <StyledTableCell align="left">ClosingTime</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {DaysList.map((day, i) => (
                  <StyledTableRow key={day}>
                    <StyledTableCell component="th" scope="row">
                      {day}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {
                        <LocalizationProvider required sx={{ marginTop: '1rem' }} dateAdapter={AdapterDayjs}>
                          <TimePicker
                            label="Opening Time"
                            value={OTList[i]}
                            onChange={(newValue) => {
                              handleOTChange(i, newValue);
                            }}
                          />
                        </LocalizationProvider>
                      }
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {
                        <LocalizationProvider required sx={{ marginTop: '1rem' }} dateAdapter={AdapterDayjs}>
                          <TimePicker
                            label="Closing Time"
                            value={CTList[i]}
                            onChange={(newValue) => handleCTChange(i, newValue)}
                          />
                        </LocalizationProvider>
                      }
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

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
        Submit
      </Button>
    </Box>
  );
}
