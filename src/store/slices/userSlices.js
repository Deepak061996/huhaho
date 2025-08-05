import {createSlice} from '@reduxjs/toolkit';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {KEYS} from '../../config/Constent';

const initialState = {
  userInfo: null,
  userTypeGuest: false,
  profileDetails: null,
  navigateDash: false,
  allData: null,
  serviceList: [],
  gameList: [],
  greenList: [],  // ✅ Add this (or use another name if you want)
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;

      if (!state?.userInfo?.access_token) {
        // AsyncStorage.removeItem(KEYS.USER_INFO);
      }
    },

    setUserType: (state, action) => {
      state.userTypeGuest = action.payload;
    },
    setServiceList: (state, action) => {
      state.serviceList = action.payload;
    },
    setGameList: (state, action) => {
      state.gameList = action.payload;
    },
    setNavigateDash: (state, action) => {
      state.navigateDash = action.payload;
    },
    setProfileDetails: (state, action) => {
      state.profileDetails = action.payload;
    },

    setAllDashboardData: (state, action) => {
      state.allData = action.payload;
    },
    setGreenList: (state, action) => {
      state.greenList = action.payload;  // ✅ Added this
    },
    clearUser: state => {
      state.userInfo = null;
      state.userTypeGuest = false;
      state.navigateDash = false;
      AsyncStorage.removeItem(KEYS.USER_INFO);
    },
  },
});

export const {
  setUserInfo,
  clearUser,
  setUserType,
  setProfileDetails,
  setNavigateDash,
  setAllDashboardData,
  setServiceList,
  setGameList,
  setGreenList,  // ✅ Export action
} = userSlice.actions;

export default userSlice.reducer;
