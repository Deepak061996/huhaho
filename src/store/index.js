import {configureStore} from '@reduxjs/toolkit';

import userReducer from './slices/userSlices';
import languageReducer from './slices/langaugeSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    language: languageReducer,
  },
});

export default store;
