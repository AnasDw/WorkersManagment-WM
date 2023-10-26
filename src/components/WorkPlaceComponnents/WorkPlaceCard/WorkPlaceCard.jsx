import React, { useEffect, useState } from 'react';
import { Container } from '@mui/material';

import { FeaturedDepCard, FeaturedPost } from './Components';

const WorkPlaceCard = (data) => {
  
  return (
    <>
      <Container maxWidth="xl" height={100} sx={{ backgroundColor: '' }}>
        <FeaturedPost props={data} />
        <FeaturedDepCard props={data} />
      </Container>
    </>
  );
};

export default WorkPlaceCard;
