import { configureStore } from '@reduxjs/toolkit';
import registrationReducer from './registrationSlice';
import loginReducer from '#/slice/auth/LoginSlice.js'
import { loadFromLocalStorage, saveToLocalStorage } from './init';
import {prices} from './prices';

const store = configureStore({
  reducer: {
    reg: registrationReducer,
    login: loginReducer,
    prices: prices.reducer,
  },
  preloadedState: loadFromLocalStorage()
});

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;
