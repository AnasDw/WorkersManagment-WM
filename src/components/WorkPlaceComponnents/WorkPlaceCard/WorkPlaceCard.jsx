import React, { useEffect, useState } from 'react';
import { Typography, Container, Box, Grid } from '@mui/material';

import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { FeaturedPost } from './Components';

const WorkPlaceCard = (data) => {
  const [NewWorkPlaceData, setNewWorkPlaceData] = useState();

  useEffect(() => {
    setNewWorkPlaceData(data);
  }, [data]);

  return (
    <>
      <Container maxWidth="xl" height={100} sx={{ backgroundColor: 'red' }}>
        <FeaturedPost props={data} />
      </Container>
    </>
  );
};

export default WorkPlaceCard;
