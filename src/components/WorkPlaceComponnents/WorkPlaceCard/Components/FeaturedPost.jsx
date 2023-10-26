import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CardActionArea from '@mui/material/CardActionArea';
import Background from '../../../../assets/backgrounds/pexels-pixabay-509922.jpg';

const FeaturedPost = (props) => {
  return (
    <Grid borderRadius={2} item xs={12} md={6} margin={3}>
      <CardActionArea
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'end',
          backgroundImage: `url(${Background})`,
          height: '30vw',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
        }}
        component="a"
        href="#"
      >
        <Typography marginRight={4} md={{ marginRight: 1 }} variant="h2" sx={{ fontFamily: 'Garamond' }}>
          {props.props.data.WorkPlaceName}
        </Typography>
      </CardActionArea>
    </Grid>
  );
};

export default FeaturedPost;
