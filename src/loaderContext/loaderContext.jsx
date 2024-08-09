// src/context/LoaderContext.js
import PropTypes from 'prop-types';
import React, {useState,useContext , createContext} from 'react';

import {LoaderPage} from '../sections/loader/view'; // Adjust the import path as needed

const LoaderContext = createContext();

export const LoaderProvider = ({ children }) => {
  const [isLoading] = useState(false);

  



  return (
    <LoaderContext.Provider value={isLoading}>
      {children}
      <LoaderPage visible={isLoading} />
    </LoaderContext.Provider>
  );
}; 
LoaderProvider.propTypes = { 
  children: PropTypes.node.isRequired
};

export const useLoader = () => useContext(LoaderContext);
