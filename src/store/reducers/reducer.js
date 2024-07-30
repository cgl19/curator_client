import { combineReducers } from 'redux';

import authReducer from './authSlice'; // Adjust the path as needed

const rootReducer = combineReducers({
  auth: authReducer,
  // other reducers if any
});

export default rootReducer;
