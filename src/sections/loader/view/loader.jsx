// src/components/Loader.js
import React from 'react';
import { ThreeDots } from 'react-loader-spinner';

const Loader = ({ visible, color = "#00BFFF", height = 80, width = 80 }) => {
  if (!visible) return null;
  
  return (
    visible ? (
      <div className="loader-container">
        <ThreeDots
          color={color}
          height={height}
          width={width}
        />
      </div>
    ) : null
  );
};

export default Loader;

