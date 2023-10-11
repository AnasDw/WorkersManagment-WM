import * as React from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Checkout from '../AddNewWorker/Checkout';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

const defaultTheme = createTheme();

const InvitationPage = () => {
  const param = useParams();
  const ValidateType = param.param1.charAt(0);
  const ValidateValue = param.param1.slice(1);

  useEffect(
    (e) => {
      const ValidateType = param.param1.charAt(0);
      const ValidateValue = param.param1.slice(1);
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
