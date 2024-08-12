    //  src/reducers/authSlice

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  tokens: {
    accessToken: null,
    refreshToken: null,
  },
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action) {
      
      state.user = action.payload.user;
      const tokenData = action.payload.tokens.length > 0 ? action.payload.tokens[0] : {};
      state.tokens.accessToken = tokenData.accessToken;
      state.tokens.refreshToken = tokenData.refreshToken;
      state.isAuthenticated = true;
    }, 
    logout(state) {
      state.user = null;  
      state.tokens.accessToken = null;
      state.tokens.refreshToken = null;
      state.isAuthenticated = false;
    },
  },
});  

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer; 
