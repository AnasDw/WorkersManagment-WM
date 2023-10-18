import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography, Box } from '@mui/material';

import { auth } from 'src/config/FireBase';
import { onAuthStateChanged } from 'firebase/auth';
import { getUserDataByEmail } from 'src/config/FireBase/CRUD';

const LetsGetStarting = () => {
  const [SignedIn, setSignedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (newUser) => {
      if (newUser) {
        getUserDataByEmail(auth.currentUser.email).then((res) => {
          if (res) {
            auth.currentUser.displayName = res.UserName;
            setSignedIn(true);
          }
        });
      } else {
        setSignedIn(false);
      }
    });
  }, []);
  return (
    <>
      <Helmet>
        <title> LetsGetStarting | WM </title>
      </Helmet>

      <Container
        maxWidth="xl"
        sx={{
          backgroundColor: '#AC86C3',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          maxWidth="xl"
          sx={{
            width: '160vh',
            height: '50vh',
            boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'white',
          }}
        >
          <Box
            item
            p={4}
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Grid item xs={6} md={6} lg={6} my={'1'}>
              <Typography variant="h4" sx={{ color: '#AC86C3' }}>
                WM
              </Typography>
            </Grid>
            <Grid item xs={6} md={6} lg={6}>
              <Typography variant="h9" sx={{ color: '#373737' }}>
                Already have an account? Sign in
              </Typography>
            </Grid>
          </Box>

          <Box
            sx={{
              width: '160vh',
              height: '50vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}
          >
            <Grid ml={2} item flexDirection={'column'}>
              <Typography variant="h1" sx={{ color: '#462F53' }}>
                Let's make work easier.
              </Typography>
              <Typography variant="h4" sx={{ color: '#AC86C3' }}>
                Get starting to make your own future:
              </Typography>
            </Grid>
            <Grid flexDirection={'column'}>
              <Typography variant="h1" sx={{ color: '#462F53' }}>
                Let's make work easier.
              </Typography>
              <Typography variant="h4" sx={{ color: '#AC86C3' }}>
                Get starting to make your own future:
              </Typography>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default LetsGetStarting;
