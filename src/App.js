import {LogBox, StyleSheet, View,Text as RNText} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Routes from './routes';
import 'react-native-gesture-handler';
import {Provider, useDispatch} from 'react-redux';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import store from './store';
import NetInfo from '@react-native-community/netinfo';
import NoInternet from './components/NoInternet';
import {setUserInfo} from './store/slices/userSlices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {KEYS} from './config/Constent';
// import SplashScreen from 'react-native-splash-screen';
//
// Monkey patch Text component to apply global font
const oldRender = RNText.render;
RNText.render = function (...args) {
  const origin = oldRender.call(this, ...args);
  return React.cloneElement(origin, {
    style: [{ fontFamily: 'poppins-regular' }, origin.props.style],
  });
};

const queryClient = new QueryClient();
const AppComponent = () => {
  const dispatch = useDispatch();
  const [internetConnectivity, setInternetActivity] = useState(true);
  const navigationRef = useRef();
  const isReadyRef = useRef();

  LogBox.ignoreAllLogs(); // Corrected usage

  useEffect(() => {
    // Internet Connectivity event subscription
    const unsubscribeNetInfo = NetInfo.addEventListener(state => {
      setInternetActivity(state.isConnected ?? true);
    });

    return () => unsubscribeNetInfo(); // Cleanup on unmount
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userInfo = JSON.parse(await AsyncStorage.getItem(KEYS.USER_INFO));
        if (userInfo) {
          // Construct an object with the token and dispatch it
          dispatch(setUserInfo(userInfo));
          // console.log(userInfo?.access_token, 'access token');
        }
      } catch (error) {
        console.error('Error in getting USER_INFO', error);
      }
    };

    fetchUserData();
  }, [dispatch]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     SplashScreen.hide();
  //   }, 3000);
  // }, []);

  return (
    <View style={{flex: 1}}>
      <Routes navigationRef={navigationRef} isReadyRef={isReadyRef} />
      {!internetConnectivity && (
        <View
          style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}>
          <NoInternet resetToSplashScreen={() => {}} />
        </View>
      )}
    </View>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <AppComponent />
      </Provider>
    </QueryClientProvider>
  );
};

export default App;
