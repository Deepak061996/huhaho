import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import store from '../store';
import {KEYS, baseURL} from '../config/Constent';
import {clearUser} from '../store/slices/userSlices';

const guestApi = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});
const formDataApi = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'multipart/form-data',
    // 'Content-Type': 'application/json',
  },
});
const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});
guestApi.interceptors.request.use(
  async config => {
    try {
      const {userInfo} = store.getState().user;

      let token = userInfo?.token;

      const storedUserString = JSON.parse(
        await AsyncStorage.getItem(KEYS.USER_INFO),
      );
      token = storedUserString.access_token || token;

      if (token) {
        config.headers['Authorization'] = token ? `Bearer ${token}` : '';
      } else {
        console.log('No token found');
      }

      return config;
    } catch (error) {
      console.error('Error in interceptor', error);
      return Promise.reject(error);
    }
  },
  error => {
    return Promise.reject(error); // Handle request errors
  },
);

formDataApi.interceptors.request.use(
  async config => {
    try {
      const {userInfo} = store.getState().user;

      // Try token from Redux
      let token = userInfo?.token;

      // Fallback to AsyncStorage if not found
      if (!token) {
        const storedUserString = await AsyncStorage.getItem(KEYS.USER_INFO);
        if (storedUserString) {
          const storedUser = JSON.parse(storedUserString);
          token = storedUser?.access_token;
        }
      }

      // If token exists, attach it
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      } else {
        // No token - proceed without auth header
        console.log('No token found, proceeding without Authorization header');
      }

      return config;
    } catch (error) {
      console.error('Error in request interceptor:', error);
      return Promise.reject(error);
    }
  },
  error => Promise.reject(error),
);

// Request interceptor for api
api.interceptors.request.use(
  async config => {
    try {
      if (__DEV__) {
        console.log('API Log Request', {
          url: `${config.baseURL}${config.url}`,
          method: config.method,
          headers: config.headers
        });
      }
      return config;
    } catch (error) {
      if (__DEV__) {
        console.log('API Log Request:', error);
      }
      console.error('Error in api request interceptor:', error);
      return Promise.reject(error);
    }
  },
  error => Promise.reject(error),
);

// Response interceptor for api
api.interceptors.response.use(
  response => {
    if (response) {
      if (__DEV__) {
        console.log('API Log Response:', {
          url: `${response.config.baseURL}${response.config.url}`,
          status: response.status,
          data: response.data,
        });
      }
      return response;
    } else {
      return Promise.reject(
        new Error('Server not responding. Please try again.'),
      );
    }
  },
  err => {
    if (__DEV__) {
      console.log('API Log:', {
        url: err?.config?.url,
        status: err?.response?.status,
        data: err?.response?.data,
      });
    }
    const errorResponse = {
      message: 'Something went wrong. Please try again later.',
      status: null,
      details: null,
    };

    if (err.response) {
      // If the API responded with an error status

      errorResponse.status = err.response.status;
      errorResponse.message = err.response.data?.data?.message;
    }

    // Special handling for unauthorized access
    if (err.response?.status === 401) {
      store.dispatch(clearUser());
    }

    return Promise.reject(errorResponse);
  },
);

export {api, guestApi, formDataApi};
