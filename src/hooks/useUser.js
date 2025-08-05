import {useDispatch} from 'react-redux';
import {useMutation} from '@tanstack/react-query';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {useState} from 'react';
import {setUserInfo} from '../store/slices/userSlices';
import {KEYS} from '../config/Constent';
import {api, formDataApi} from '../utils/api';

export default function useUser() {
  const dispatch = useDispatch();

  const [manualLoading, setManualLoading] = useState(false);

  const {mutateAsync: SignupUser} = useMutation({
    mutationKey: ['signup', 'user'],
    mutationFn: async payload => {
      try {
        setManualLoading(true);
        const response = await api.post('signup', payload);
        const {data} = response;

        // console.log(data, 'data comes after login data');
        // const access_token = data?.token;
        // const user_id = data?.data?.id;

        // if (data) {
        //   // Dispatch user info to Redux store after a slight delay
        //   setTimeout(() => {
        //     dispatch(setUserInfo(data));
        //   }, 1000);
        // }

        // Return the data along with any relevant messages
        return {
          ...data,
          message: data?.data?.message,
        };
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || // Custom error from API
          error.message || // Default error message
          'An unknown error occurred';
        throw new Error(errorMessage);
      } finally {
        setManualLoading(false);
      }
    },
  });

  //

  const {mutateAsync: loginUser} = useMutation({
    mutationKey: ['login', 'user'],
    mutationFn: async payload => {
      try {
        setManualLoading(true);
        const response = await api.post('login', payload);
        const {data} = response;
        // console.log(payload, 'payload data comes fromt this');

        // console.log(data, 'data comes after login data');
        // const access_token = data?.token;
        const user_id = data;

    
        if (data) {
          dispatch(setUserInfo(data));
          AsyncStorage.setItem(KEYS.USER_INFO, JSON.stringify(data));
        }

        // Return the data along with any relevant messages

        return {
          ...data,
          message: data?.data?.message,
        };
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || // Custom error from API
          error.message || // Default error message
          'An unknown error occurred';
        throw new Error(errorMessage);
      } finally {
        setManualLoading(false);
      }
    },
  });

  //

  const {mutateAsync: sendOtp} = useMutation({
    mutationKey: ['send-otp', 'user'],
    mutationFn: async payload => {
      try {
        console.log(payload, 'payload data comes fromt this');
        setManualLoading(true);
        const response = await formDataApi.post('send-otp', payload);
        const {data} = response;
        console.log(response, 'response data comes');
        // console.log(payload, 'payload data comes fromt this');
        // if (data) {
        //   // Dispatch user info to Redux store after a slight delay
        //   setTimeout(() => {
        //     dispatch(setUserInfo(data?.data));
        //   }, 1000);
        // }
        // Return the data along with any relevant messages
        return {
          ...data,
          message: data?.data?.message,
        };
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || // Custom error from API
          error.message || // Default error message
          'An unknown error occurred';
        throw new Error(errorMessage);
      } finally {
        setManualLoading(false);
      }
    },
  });

  //

  const {mutateAsync: verifyOtp} = useMutation({
    mutationKey: ['verify-otp', 'user'],
    mutationFn: async payload => {
      try {
        setManualLoading(true);
        const response = await api.post('verify-otp', payload);
        const {data} = response;

        // Return the data along with any relevant messages

        if (data) {
          // Dispatch user info to Redux store after a slight delay
          setTimeout(() => {
            dispatch(setUserInfo(data?.data));
          }, 1000);
        }
        return {
          ...data,
          message: data?.data?.message,
        };
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || // Custom error from API
          error.message || // Default error message
          'An unknown error occurred';
        throw new Error(errorMessage);
      } finally {
        setManualLoading(false);
      }
    },
  });
  //

  const {mutateAsync: createProfile} = useMutation({
    mutationKey: ['create_profile', 'user'],
    mutationFn: async payload => {
      try {
        setManualLoading(true);
        const response = await formDataApi.post('create_profile', payload);
        const {data} = response;

        console.log('API Response:', response);
        // Return the data along with any relevant messages

        const oldUserInfoStr = await AsyncStorage.getItem(KEYS.USER_INFO);
        const oldUserInfo = oldUserInfoStr ? JSON.parse(oldUserInfoStr) : {};
        const token = oldUserInfo?.token;

        const mergedUserData = {
          ...data,
          token: token ?? data.token, // fallback to new token if old not found
        };
        if (data) {
          dispatch(setUserInfo(mergedUserData));
          AsyncStorage.setItem(KEYS.USER_INFO, JSON.stringify(mergedUserData));
        }
        return {
          ...data,
          message: (data?.data?.message || data?.message),
        };
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || // Custom error from API
          error.message || // Default error message
          'An unknown error occurred';
        throw new Error(errorMessage);
      } finally {
        setManualLoading(false);
      }
    },
  });

  //

  const {mutateAsync: resetPassword} = useMutation({
    mutationKey: ['reset-password', 'user'],
    mutationFn: async payload => {
      try {
        setManualLoading(true);
        const response = await api.post('reset-password', payload);
        const {data} = response;

        // Return the data along with any relevant messages

        if (data) {
          // Dispatch user info to Redux store after a slight delay
          setTimeout(() => {
            dispatch(setUserInfo(data?.data));
          }, 1000);
        }
        return {
          ...data,
          message: data?.data?.message,
        };
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || // Custom error from API
          error.message || // Default error message
          'An unknown error occurred';
        throw new Error(errorMessage);
      } finally {
        setManualLoading(false);
      }
    },
  });
  //

  const {mutateAsync: forgotPassword} = useMutation({
    mutationKey: ['forgot-password', 'user'],
    mutationFn: async payload => {
      try {
        setManualLoading(true);
        const response = await api.post('forgot-password', payload);
        const {data} = response;

        // Return the data along with any relevant messages

        // if (data) {
        //   // Dispatch user info to Redux store after a slight delay
        //   setTimeout(() => {
        //     dispatch(setUserInfo(data?.data));
        //   }, 1000);
        // }
        return {
          ...data,
          message: data?.data?.message,
        };
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || // Custom error from API
          error.message || // Default error message
          'An unknown error occurred';
        throw new Error(errorMessage);
      } finally {
        setManualLoading(false);
      }
    },
  });
  //
  const isLoading = manualLoading;
  return {
    SignupUser,
    isLoading,
    loginUser,
    verifyOtp,
    sendOtp,
    createProfile,
    resetPassword,
    forgotPassword,
  };
}
