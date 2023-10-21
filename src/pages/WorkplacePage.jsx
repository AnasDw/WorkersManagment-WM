import React from 'react';
import { Helmet } from 'react-helmet-async';

import { Typography, Container, Box, Grid } from '@mui/material';
import { Image } from 'mui-image';

const WorkplacePage = () => (
  <>
    <Helmet>
      <title> Workplace | WM </title>
    </Helmet>
    <Container maxWidth="xl">
      <Grid alignItems={'center'} direction="row" container spacing={12} mb={5}>
        <Grid item xs={12} sm={4} md={4}>
          <Typography variant="h3" sx={{ color: '#AC86C3' }}>
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

      <Grid container xs={12} sm={12} md={12} justifyContent={'center'} alignItems={'center'} spacing={3}>
        <Grid container p={4} spacing={5} direction={'column'} item xs={12} sm={6} md={6}>
          <Grid item>
            <Typography variant="h1" sx={{ color: '#462F53', fontWeight: 'bolder' }}>
              Let's make work easier.
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6" sx={{ color: '#AC86C3' }}>
              How will you be using WM - Workers Management ?
            </Typography>
          </Grid>
        </Grid>
        <Grid item p={8}>
          <div
            style={{
              backgroundColor: '#462F53',
              width: '400px',
              height: '420px',
            }}
          >
            {' '}
            <Image src="../assets/WM.png" alt="login" />
          </div>
        </Grid>
      </Grid>
    </Container>
  </>
);

export default WorkplacePage;
