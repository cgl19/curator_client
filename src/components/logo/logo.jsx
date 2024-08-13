import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

import { RouterLink } from 'src/routes/components'; 

const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {
 

  // Update with the path to your logo image
  const logo = (
    <Box
      ref={ref}
      component="div"
      sx={{
        width: 40,
        height: 40,
        display: 'inline-flex',
        ...sx,
      }}
      {...other}
    >
      <img
        src="/assets/logo/Image20240813194607.png" // Update with your image path
        alt="Logo"
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
      />
    </Box>
  );

  if (disabledLink) { 
    return logo;
  }

  return (
    <Link component={RouterLink} href="/" sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
});

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default Logo;
