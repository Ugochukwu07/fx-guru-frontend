import { configureStore } from '@reduxjs/toolkit';
import registrationReducer from './registrationSlice';
import loginReducer from '#/slice/auth/LoginSlice.js'
import { loadFromLocalStorage, saveToLocalStorage } from './init';

const store = configureStore({
  reducer: {
    reg: registrationReducer,
    login: loginReducer,
  },
  preloadedState: loadFromLocalStorage()
});

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;
