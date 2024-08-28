import React from 'react';
import { Typography, Box } from '@mui/material';

const PostLimitOverlay = ({ canPost, sidebarWidth = 280 }) => {
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
        color="rgb(24,119,242)"
        sx={{
          padding: '20px',
          backgroundColor: 'rgb(24,119,242)',
          borderRadius: '8px',
          textAlign: 'center',
          maxWidth: '90%',
          fontFamily: 'Sleep',
          fontSize: '24px',
          fontStyle: 'italic', // or 'bold', 'oblique', etc.
          color:'white'
        }} 
      >
        You have reached your daily posting limit of (15) on this account . Please try again after 24 hours or try with different account.
      </Typography>
    </Box> 
  ); 
} 

export default PostLimitOverlay;
