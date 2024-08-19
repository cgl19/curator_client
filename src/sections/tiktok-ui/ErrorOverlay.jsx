import React from 'react';
import { Typography, Box } from '@mui/material';

const ErrorOverlay = ({ canPost, sidebarWidth = 280 }) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: `${sidebarWidth}px`, // Adjust based on sidebar width
        width: `calc(100% - ${sidebarWidth}px)`, // Reduce the overlay width by the sidebar width
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <Typography
  variant="h6"
  color="textPrimary"
  sx={{
    padding: '20px',
    backgroundColor: 'rgb(24,119,242)',
    borderRadius: '8px',
    textAlign: 'center',
    maxWidth: '90%',
    fontFamily: 'Sleep', // add this line
    fontSize: '24px', // adjust the font size as needed
     color:'white'
  }}
>
  Oops! something went unexpected while checking account visibility .
</Typography>
    </Box>
  );
}

export default ErrorOverlay;
