import * as React from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import {
  getCurrentDate,
  getCurrentTime,
  getTimeDifferenceInHours,
  getTimeDifferenceInMinutes,
} from 'src/constants/functions';
import { Typography } from '@mui/material';

const defaultTheme = createTheme();

const employeesPage = () => {
  const param = useParams();

  const navigate = useNavigate();

  useEffect(
    (e) => {
      const ValidateType = param.param1.charAt(0);
      const ValidateValue = param.param1.charAt(1);
      const Date = param.param1.slice(2, 10);
      const Time = param.param1.slice(10);

      const currentDate = getCurrentDate();
      const currentTime = getCurrentTime();

      switch (ValidateType) {
        case 'M':
          if (getTimeDifferenceInMinutes(currentTime, Time) > ValidateValue || currentDate > Date)
            navigate('/404', { replace: true });
          break;
        case 'H':
          if (getTimeDifferenceInHours(currentTime, Time) > ValidateValue || currentDate > Date)
            navigate('/404', { replace: true });
          break;
        case 'D':
          if (currentDate - Date > ValidateValue) navigate('/404', { replace: true });
          break;
      }
    },
    [param]
  );

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) => (t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900]),
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
            <Typography> hello </Typography>
              {/* <Checkout PropCancelIcon={false} /> */}
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
};

export default employeesPage;
