import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

const FeaturedPost = (props) => {

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component="a" href="#">
        <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              Continue reading...
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Continue reading...
            </Typography>
            <Typography variant="subtitle1" paragraph>
              Continue reading...
            </Typography>
            <Typography variant="subtitle1" color="primary">
              Continue reading...
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
            src="../../../../../public/assets/illustrations/illustration_login.png"
          />
        </Card>
      </CardActionArea>
    </Grid>
  );
};

export default FeaturedPost;
