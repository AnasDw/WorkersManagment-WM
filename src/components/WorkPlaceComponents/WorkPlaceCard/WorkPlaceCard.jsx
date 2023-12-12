import { Container, Grid } from '@mui/material';

import { FeaturedCharts, FeaturedDepCard, FeaturedPost, FeaturedButtonNav } from './Components';

const WorkPlaceCard = (data) => (
  <>
    <Container maxWidth="xl" height={100}>
      <FeaturedPost props={data} />

      <Grid container justifyContent={'center'} sx={{ display: 'flex' }}>
        <FeaturedButtonNav />
      </Grid>

      <FeaturedCharts data={data.data} />
      <FeaturedDepCard props={data} />
    </Container>
  </>
);

export default WorkPlaceCard;
