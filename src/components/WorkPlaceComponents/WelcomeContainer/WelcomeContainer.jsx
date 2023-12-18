import { useState } from 'react';
import { Typography, Container, Box, Grid } from '@mui/material';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import { GetStartingPage } from '..';

const WelcomeContainer = () => {
  const [WelcomeBool, setWelcomeBool] = useState(true);
  const [NewWorkPlaceBool, setNewWorkPlaceBool] = useState(false);
  return (
    <>
      <Grid alignItems={'center'} direction="row" container spacing={12} mb={4}>
        <Grid item xs={12} sm={4} md={4}>
          <Typography variant="h3" sx={{ color: '#F1BC8D' }}>
            Workplace
          </Typography>
        </Grid>
        <Grid item xs={0} sm={4} md={4}>
          <Box sx={{ flexGrow: 1 }} />
        </Grid>

        <Grid item xs={12} sm={4} md={4}>
          <Typography variant="h7" sx={{ color: '#9a9999c3' }}>
            Here you will build your own business
          </Typography>
        </Grid>
      </Grid>

      {WelcomeBool ? (
        <Container maxWidth="xl">
          <Grid
            sx={{
              backgroundColor: '#bfbfbf20',
              borderRadius: '5px',
              boxShadow: ' rgba(149, 157, 165, 0.2) 0px 8px 24px',
            }}
            m={(1, 1, 1, 0)}
            container
            direction={'row'}
            xs={12}
            sm={12}
            md={12}
            justifyContent={'center'}
            alignItems={'center'}
            spacing={3}
          >
            <Grid container p={4} spacing={5} direction={'column'} item xs={12} sm={12} md={6}>
              <Grid item>
                <Typography variant="h1" sx={{ color: '#1CB7A6', fontWeight: 'bolder' }}>
                  Let's make work easier.
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6" sx={{ color: '#F1BC8D' }}>
                  How will you be using WM - Workers Management ?
                </Typography>
              </Grid>
            </Grid>
            <Grid item p={8}>
              <Grid
                container
                xs={12}
                sm={12}
                md={6}
                direction={'column'}
                justifyContent={'center'}
                alignItems={'center'}
                sx={{ gap: '2rem', borderRadius: '12px', width: '400px', height: '420px' }}
              >
                <Grid
                  onClick={() => {
                    setNewWorkPlaceBool(true);
                    setWelcomeBool(false);
                  }}
                  justifyContent={'center'}
                  alignItems={'center'}
                  item
                  sx={{
                    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px;',
                    display: 'flex',
                    backgroundColor: '#1CB7A6',
                    borderRadius: '12px',
                    width: '350px',
                    height: '140px',
                    '&:hover': {
                      transition: '1s',
                      boxShadow: ' #F1BC8D 0px 5px 15px',
                      cursor: 'pointer',
                    },
                  }}
                >
                  <StoreMallDirectoryIcon md={6} xs={6} sx={{ fontSize: '50px', color: '#F1BC8D', margin: '1rem' }} />
                  <Typography md={6} xs={6} variant="h5" sx={{ color: 'white' }}>
                    Do you own or manage a business ?
                  </Typography>
                </Grid>
                <Grid
                  justifyContent={'center'}
                  alignItems={'center'}
                  item
                  sx={{
                    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px;',
                    backgroundColor: '#1CB7A6',
                    display: 'flex',
                    borderRadius: '12px',
                    width: '350px',
                    height: '140px',
                    '&:hover': {
                      transition: '1s',
                      boxShadow: ' #F1BC8D 0px 5px 15px',
                      cursor: 'pointer',
                    },
                  }}
                >
                  <Diversity1Icon md={6} xs={6} sx={{ fontSize: '45px', color: '#F1BC8D', margin: '1rem' }} />
                  <Typography md={6} xs={6} variant="h5" sx={{ color: 'white' }}>
                    Are You an employee joining a team?
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      ) : null}

      {NewWorkPlaceBool ? <GetStartingPage /> : null}
    </>
  );
};

export default WelcomeContainer;
