import * as React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CardActionArea from '@mui/material/CardActionArea';
import BG from '../../../../assets/backgrounds/pexels-huseyn-kamaladdin-667838.jpg';

const FeaturedPost = (props) => (
  <Grid borderRadius={2} item xs={12} md={6} margin={3}>
    <CardActionArea
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'end',
        backgroundImage: `url(${BG})`,
        height: '30vw',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
      }}
      component="a"
      href="#"
    >
      <Typography
        marginRight={4}
        md={{ marginRight: 1 }}
        variant="h2"
        sx={{ fontFamily: 'Garamond', color: '#324E87' }}
      >
        {props.props.data.WorkPlaceName}
      </Typography>
    </CardActionArea>
  </Grid>
);

FeaturedPost.propTypes = {
  props: PropTypes.object.isRequired,
};

export default FeaturedPost;
