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
import Checkout from '../UserPageComponents/AddNewWorker/Checkout';
import { getDataFromDocByEmail } from 'src/config/FireBase/CRUD';

const defaultTheme = createTheme();

const InvitationPage = () => {
  const param = useParams();
  const navigate = useNavigate();

  useEffect(
    (e) => {
      var CryptoJS = require('crypto-js');
      const decrypted = CryptoJS.AES.decrypt(param.param1.toString(), process.env.REACT_APP_SecretKey);
      const temp = decrypted.toString(CryptoJS.enc.Utf8);

      try {
        getDataFromDocByEmail(temp, 'TaskEnforcer')
          .then((response) => {
            if (response != false) {
              const currentDate = getCurrentDate();
              const currentTime = getCurrentTime();
              switch (response.ValidateType) {
                case 'M':
                  if (
                    getTimeDifferenceInMinutes(currentTime, response.showTime) > response.ValidateValue ||
                    currentDate > response.Date
                  )
                    navigate('/404', { replace: true });
                  else {
                    const a = response.ValidateValue - getTimeDifferenceInMinutes(currentTime, response.showTime);
                    setTimeout(() => {
                      navigate('/404', { replace: true });
                    }, a * 60000);
                  }

                  break;
                case 'H':
                  if (
                    getTimeDifferenceInHours(currentTime, response.showTime) > response.ValidateValue ||
                    currentDate > response.Date
                  )
                    navigate('/404', { replace: true });
                  break;
                case 'D':
                  if (currentDate - response.Date > response.ValidateValue) navigate('/404', { replace: true });
                  break;
              }
            } else {
              navigate('/404', { replace: true });
            }
          })
          .catch((error) => {
            console.error(error);
          });
      } catch (error) {
        console.error(error);
        navigate('/404', { replace: true });
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
              <Checkout PropCancelIcon={false} />
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
};

export { InvitationPage };
