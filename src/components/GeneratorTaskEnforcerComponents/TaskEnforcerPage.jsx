import * as React from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import {
  getCurrentDate,
  getCurrentTime,
  getTimeDifferenceInHours,
  getTimeDifferenceInMinutes,
} from 'src/constants/functions';
import { getDataFromDocByEmail, pushData } from 'src/config/FireBase/CRUD';
import { useState } from 'react';
import FormTable from './Components/FormTable';

const defaultTheme = createTheme();

const TaskEnforcerPage = () => {
  const param = useParams();
  const navigate = useNavigate();

  const [Email, setEmail] = useState();
  const [Users, setUsers] = useState(null);
  const [PulledUser, setPulledUser] = useState(null);
  const [Boolean, setBoolean] = useState(false);
  const [UserPhoneNumber, setUserPhoneNumber] = useState();

  useEffect(() => {
    if (Users != null) {
      const userToPull = Users.find((worker) => worker.PhoneNumber == UserPhoneNumber);
      if (userToPull) setPulledUser(userToPull);
      else setBoolean(true);
    }
  }, [UserPhoneNumber]);

  useEffect(() => {
    if (Email) {
      try {
        getDataFromDocByEmail(Email, 'workers').then((data) => {
          if (data != false) {
            setUsers(data.data);
          }
        });
      } catch (e) {
        console.log(e);
      }
    }
  }, [Email]);

  useEffect(
    (e) => {
      var CryptoJS = require('crypto-js');
      const decrypted = CryptoJS.AES.decrypt(param.param1.toString(), process.env.REACT_APP_SecretKey);
      const temp = decrypted.toString(CryptoJS.enc.Utf8);
      setEmail(temp);
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

  const handleChange = (event) => {
    try {
      setBoolean(false);
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      setUserPhoneNumber(data.get('PhoneNumber').slice(1));
      setPulledUser(null);
    } catch (error) {
      console.error(error);
    }
  };
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
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                ...(PulledUser ? { marginTop: 8 } : { marginTop: 18 }),
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                {!PulledUser ? <Diversity3Icon /> : <VerifiedUserIcon />}
              </Avatar>
              <Typography component="h1" variant="h5">
                {!PulledUser ? 'Welcome to the WM Employee System' : `Welcome back ${PulledUser?.name}`}
              </Typography>
              {!PulledUser ? (
                <Box component="form" onSubmit={handleChange} sx={{ mt: 3 }}>
                  <Grid container sx={{ width: 300 }} spacing={2}>
                    <Grid item>
                      <TextField
                        sx={{ width: 300, textAlign: 'center' }}
                        autoComplete="Phone Number"
                        name={'PhoneNumber'}
                        required
                        id={'PhoneNumber'}
                        label={'Enter Your Phone Number'}
                        autoFocus
                        error={Boolean}
                        helperText={Boolean ? 'User Not Found' : null}
                      />
                    </Grid>
                  </Grid>
                  <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, width: 300 }}>
                    Sign In
                  </Button>
                </Box>
              ) : (
                <FormTable Email={Email} PulledUser={PulledUser} />
              )}
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
};

export { TaskEnforcerPage };
