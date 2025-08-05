import 'react-native-reanimated';

import React, {useEffect, useState} from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DrawerComps from './DrawerComps'; // Keep only one import
import Splash from '../views/pages/Splash';
import PrivacyPolicy from '../views/pages/PrivacyPolicy';
import Login from '../views/pages/Authentication/Login';

import ForgetPassword from '../views/pages/Authentication/ForgetPassword';
import Verification from '../views/pages/Authentication/Verification';
// import Header from '../views/pages/Header';
// import Greeting from '../views/pages/Greeting';
import Head from '../views/pages/Authentication/Head';
// import Offerings from '../views/pages/Offerings';

// import Iconcontainer from '../views/pages/Iconcontainer/Index';
// import BookAppointment from '../views/pages/BookAppointment';
import Panelist from '../views/pages/Panelist';
// import Program from '../views/pages/Program';
import AllProgram from '../views/pages/AllProgram';
import Career from '../views/pages/Career';
// import Therapy from '../views/pages/Therapy';
import Calendars from '../views/pages/Calendars';
import Groups from '../views/pages/Groups';
// import Individual from '../views/pages/Individual';
import Gallery from '../views/pages/Gallery';
// import Payment from '../views/pages/Payment';
import Billing from '../views/pages/Billing';
import PaymentSuccess from '../views/pages/PaymentSuccess';
import Home from '../views/pages/Home';
import AboutUs from '../views/pages/About';
import WhoNeedUs from '../views/pages/WhoNeedUs';
import Benefits from '../views/pages/Benefits';
import Contactus from '../views/pages/Contact';
import ServiceDetails from '../views/pages/ServiceDetails';
import CareerWithUs from '../views/pages/CarrierUs';
// import Testimonials from '../views/pages/Testimonials';
import TestimonialView from '../views/pages/TestimonialView';
import MyProfile from '../views/pages/Myprofile';
import Cafe from '../views/pages/Cafe';
import Videos from '../views/pages/Videos';
import AwardsView from '../views/pages/AwardsView';
import UserProfile from '../views/pages/UserProfile';
import ResetPassword from '../views/pages/Authentication/ResetPassword';
import Appointment from '../views/pages/Appointment';
// import AllAppointment from '../views/pages/AllAppointment';
import SignUp from '../views/pages/Authentication/SignUp';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {KEYS} from '../config/Constent';
import {useSelector} from 'react-redux';
// import PaymentHistory from '../views/pages/PaymentHistory';
import TermsCond from '../views/pages/TermsCond';
// import Games from '../components/Games';
import GamesPage from '../views/pages/GamesPage';
// import Service from '../views/pages/Service';
import Notification from '../views/pages/Notification';
import QrCode from '../views/pages/QrCode';
import UpcomingEvents from '../views/pages/UpcomingEvent';
import ServiceCopy from '../views/pages/ServiceCopy';
import Podcasts from '../views/pages/Podcasts';

const Stack = createNativeStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
  },
};

export default function Routes({navigationRef, isReadyRef}) {
  const guestType = useSelector(state => state?.user?.userTypeGuest);
  const navigateDash = useSelector(state => state?.user?.navigateDash);
  console.log(navigateDash, 'jdfadfhssdffss');
  const access_token = useSelector(state => state?.user?.userInfo?.token);
  console.log(guestType, 'guest type111');
  const [isAppReady, setIsAppReady] = useState(false);

  const isAuthenticated = access_token && guestType;

  console.log(navigateDash, 'navigated Dash');
  console.log(access_token, 'access token ***');

  console.log(guestType, 'gues type ***');
  useEffect(() => {
    // Simulate loading like showing splash screen for 2 seconds on app startup only
    const timer = setTimeout(() => {
      setIsAppReady(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  if (!isAppReady) {
    // Show splash screen just once when the app starts
    return <Splash />;
  }

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        isReadyRef.current = true;
      }}
      theme={theme}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {!access_token && !guestType && !navigateDash ? (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
            <Stack.Screen name="Verification" component={Verification} />
            {/* <Stack.Screen name="Header" component={Header} /> */}
            {/* <Stack.Screen name="Greeting" component={Greeting} /> */}
            <Stack.Screen name="Head" component={Head} />
            <Stack.Screen name="Gallery" component={Gallery} />
            {/* <Stack.Screen name="Iconcontainer" component={Iconcontainer} /> */}
            <Stack.Screen name="MyProfile" component={MyProfile} />
            {/* <Stack.Screen name="AllProgram" component={AllProgram} /> */}
            {/* <Stack.Screen name="Testimonials" component={Testimonials} /> */}
            <Stack.Screen name="TestimonialView" component={TestimonialView} />
            <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
            <Stack.Screen name="ResetPassword" component={ResetPassword} />
            <Stack.Screen name="TermsCond" component={TermsCond} />
            {/* <Stack.Screen name="Games" component={Games} /> */}
            <Stack.Screen name="Notification" component={Notification} />
            <Stack.Screen name="QrCode" component={QrCode} />
            <Stack.Screen name="UpcomingEvents" component={UpcomingEvents} />
            <Stack.Screen name="PodCasts" component={Podcasts} />

            {/* <Stack.Screen name="UserProfile" component={UserProfile} /> */}
          </>
        ) : (
          <>
            <Stack.Screen name="DrawerComps" component={DrawerComps} />
            <Stack.Screen name="ServiceCopy" component={ServiceCopy} />
            {/* <Stack.Screen name="Service" component={Service} /> */}
            <Stack.Screen name="GamesPage" component={GamesPage} />
            {/* <Stack.Screen name="Offerings" component={Offerings} /> */}
            {/* <Stack.Screen name="BookAppointment" component={BookAppointment} /> */}
            <Stack.Screen name="Panelist" component={Panelist} />
            {/* <Stack.Screen name="Program" component={Program} /> */}
            <Stack.Screen name="AllProgram" component={AllProgram} />
            <Stack.Screen name="Career" component={Career} />
            {/* <Stack.Screen name="Therapy" component={Therapy} /> */}
            <Stack.Screen name="Calendars" component={Calendars} />
            <Stack.Screen name="Groups" component={Groups} />
            {/* <Stack.Screen name="Individual" component={Individual} /> */}
            <Stack.Screen name="Gallery" component={Gallery} />
            <Stack.Screen name="TermsCond" component={TermsCond} />
            {/* <Stack.Screen name="Payment" component={Payment} /> */}
            <Stack.Screen name="Billing" component={Billing} />
            <Stack.Screen name="PaymentSuccess" component={PaymentSuccess} />
            <Stack.Screen name="AboutUs" component={AboutUs} />
            <Stack.Screen name="WhoNeedUs" component={WhoNeedUs} />
            <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
            <Stack.Screen name="Benefit" component={Benefits} />
            <Stack.Screen name="Contact" component={Contactus} />
            <Stack.Screen name="CareerWithUs" component={CareerWithUs} />
            {/* <Stack.Screen name="Testimonials" component={Testimonials} /> */}
            <Stack.Screen name="ServiceDetails" component={ServiceDetails} />
            <Stack.Screen name="TestimonialView" component={TestimonialView} />
            <Stack.Screen name="Videos" component={Videos} />
            <Stack.Screen name="AwardsView" component={AwardsView} />
            <Stack.Screen name="Notification" component={Notification} />
            <Stack.Screen name="UserProfile" component={UserProfile} />
            <Stack.Screen name="PodCasts" component={Podcasts} />
            <Stack.Screen name="Appointment" component={Appointment} />
            {/* <Stack.Screen name="PaymentHistory" component={PaymentHistory} /> */}
            {/* <Stack.Screen name="AllAppointment" component={AllAppointment} /> */}

            <Stack.Screen name="UpcomingEvents" component={UpcomingEvents} />

            <Stack.Screen name="Cafe" component={Cafe} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
