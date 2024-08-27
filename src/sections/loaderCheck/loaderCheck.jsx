// src/components/LoaderCheck.js
import React from 'react';
import Button from '@mui/material/Button';
import { useLoader } from '../../loaderContext/loaderContext';

const LoaderCheck = () => {
  const { isLoading, showLoader, hideLoader } = useLoader();

  const handleLoader = () => {
    if (isLoading) {
      hideLoader();
    } else {
      showLoader();
    }
  };

  return (
    <Button onClick={handleLoader}>
      {isLoading ? 'Hide Loader' : 'Show Loader'}
    </Button>
  );
};

export default LoaderCheck; 
