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
      state.tokens.accessToken = action.payload.tokens.accessToken;
      state.tokens.refreshToken = action.payload.tokens.refreshToken;
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
