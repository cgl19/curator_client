import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';

import authReducer from './reducers/authSlice'; // Adjust the path as needed

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  // other reducers can be added here
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store); 

export { store, persistor };
 