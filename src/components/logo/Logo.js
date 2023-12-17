import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Link } from '@mui/material';

import logoBG from '../../assets/Screenshot_2023-12-01_at_19.06.05-removebg-preview.png';
// ----------------------------------------------------------------------
// eslint-disable-next-line
const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {
  const logo = (
    <Box
      component="img"
      src={logoBG}
      sx={{
        width: 1000,
        height: 104,
        cursor: 'pointer',
        aspectRatio: 3 / 2,
        ...sx,
        objectFit: 'contain',
        mixBlendMode: 'luminosity',
      }}
    />
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return (
    <Link to="/" component={RouterLink} sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
});

Logo.propTypes = {
  sx: PropTypes.object,
  disabledLink: PropTypes.bool,
};

export default Logo;
