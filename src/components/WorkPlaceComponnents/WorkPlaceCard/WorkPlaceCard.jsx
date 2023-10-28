import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid } from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

import { FeaturedCharts, FeaturedDepCard, FeaturedPost, FeraturedButtonNav } from './Components';
import { AppCurrentVisits } from 'src/sections/@dashboard/app';

const WorkPlaceCard = (data) => {
  return (
    <>
      <Container maxWidth="xl" height={100}>
        <FeaturedPost props={data} />

        <Grid container justifyContent={'center'} sx={{ display: 'flex' }}>
          <FeraturedButtonNav />
        </Grid>

        <Grid container justifyContent={'center'} sx={{ display: 'flex' }}>
          <Grid marginTop={8} container component={'div'} sx={{ height: 8, backgroundColor: '#545251', width: 600 }} />
        </Grid>

        <Grid container spacing={3} paddingX={4} mt={8} mb={8} sx={{ display: 'flex' }} justifyContent={'center'}>
          <Grid item>
            <FormatQuoteIcon />
          </Grid>
          <Grid item>
            <Typography sx={{ color: '#5050507d' }} textAlign={'center'} variant="h4">
              Success is the product of relentless effort, unwavering dedication, and a shared passion for excellence.
              Together, we build a future where each day is a step closer to greatness.
            </Typography>
          </Grid>
          <Grid item>
            <FormatQuoteIcon />
          </Grid>
        </Grid>

        <Grid container justifyContent={'center'} sx={{ display: 'flex' }}>
          <Grid container component={'div'} sx={{ height: 8, backgroundColor: '#545251', width: 600 }} />
        </Grid>

        <FeaturedDepCard props={data} />

        <Grid container justifyContent={'center'} sx={{ display: 'flex' }}>
          <Grid marginTop={8} container component={'div'} sx={{ height: 8, backgroundColor: '#545251', width: 600 }} />
        </Grid>

        <FeaturedCharts data={data.data} />
      </Container>
    </>
  );
};

export default WorkPlaceCard;
