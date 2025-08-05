import {createSlice} from '@reduxjs/toolkit';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {KEYS} from '../../config/Constent';

const initialState = {
  code: 'en',
};

export const languageSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.code = action.payload;
    },
  },
});

export const {setLanguage} = languageSlice.actions;

export default languageSlice.reducer;
