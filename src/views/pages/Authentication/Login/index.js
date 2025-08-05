import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Icon1 from 'react-native-vector-icons/Fontisto';
import {SafeAreaView} from 'react-native-safe-area-context';

import Constent, {KEYS} from '../../../../config/Constent';
import {useNavigation} from '@react-navigation/native';
import {
  showErrorToast,
  showSuccessToast,
  showWarningToast,
} from '../../../../config/Toast';
import {useToast} from 'react-native-toast-notifications';
import useUser from '../../../../hooks/useUser';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useCommon from '../../../../hooks/useCommon';
import {useDispatch, useSelector} from 'react-redux';
import {
  setNavigateDash,
  setUserType,
} from '../../../../store/slices/userSlices';
import EmailIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTranslate} from '../../../../hooks/useTranslate';
import Loader from '../../../../components/Loader';

import { getFcmToken } from '../../../../utils/fcmtoken';

const {width, height} = Dimensions.get('window');

const isSmallScreen = width < 400;
const Login = ({navigation}) => {
  const toast = useToast();
  //

  const guestType = useSelector(state => state?.user?.userTypeGuest);
  const navigateDash = useSelector(state => state?.user?.navigateDash);
  console.log(navigateDash, 'navigateDash***', guestType, 'guest type****');
  const dispatch = useDispatch();
  const {loginUser, isLoading} = useUser();
  const [isDisabled, setIsDisabled] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const phoneplaceholder = useTranslate('Enter your email/phone');
  const passwordplaceholder = useTranslate('Password');

  //

  //
  const showToastAndDisable = message => {
    if (!isDisabled) {
      setIsDisabled(true);
      showWarningToast(toast, message);
      setTimeout(() => setIsDisabled(false), 2000);
    }
  };

  const validateForm = () => {
    const emailOrPhone = email;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
    const phoneRegex = /^[0-9]{10,15}$/;
    const passRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#!])[A-Za-z\d@$!%*?&#!]{6,}$/;

    if (!emailOrPhone) {
      showToastAndDisable('Please enter email or phone number.');
      return false;
    }

    if (!emailRegex.test(emailOrPhone) && !phoneRegex.test(emailOrPhone)) {
      showToastAndDisable('Please enter a valid email or phone number.');
      return false;
    }

    if (!password) {
      showToastAndDisable('Please enter password.');
      return false;
    }

    if (!passRegex.test(password)) {
      showToastAndDisable(
        'Password must be at least 6 characters and include uppercase, lowercase, number, and special character.',
      );
      return false;
    }

    return true;
  };
  //

  useEffect(() => {
    getOldUser();
  }, []);
  const getOldUser = async () => {
   //const token = await getFcmToken();
   // console.log('Device FCM Token:', token);
    const olddata = JSON.parse(await AsyncStorage.getItem(KEYS.REMEMBER_ME));
    if (olddata && olddata?.email) {
      setEmail(olddata?.email);
      setPassword(olddata?.password);
      setIsChecked(true);
    }
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    try {
      if (isChecked) {
        await AsyncStorage.setItem(
          KEYS.REMEMBER_ME,
          JSON.stringify({email, password}),
        );
      } else {
        await AsyncStorage.removeItem(KEYS.REMEMBER_ME);
      }

      const response = await loginUser({
        email: email,
        password: password,
        fcm_token: 'jhskjsk',
      });

      if (response) {
        showSuccessToast(toast, 'User login successfully');
        console.log(response?.data, 'respone data of this');
        navigation.navigate('DrawerComps');
        dispatch(setUserType(false));
      }
    } catch (error) {
      console.error('Login error:', error);
      showWarningToast(toast, error?.message);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <Image
              source={require('../../../../assets/logo2.png')}
              style={styles.logo}
              resizeMode="contain"
            />

            {/* Welcome */}
            <Text style={styles.welcomeText}>{useTranslate('Welcome!')}</Text>

            {/* Let's Get Started */}
            <Text style={styles.startText}>
              {useTranslate('Let’s Get Started')}
            </Text>

            {/* Email Input */}
            <View style={styles.inputContainer}>
              <View style={styles.iconCircle}>
                <EmailIcon name="email" size={20} color="black" />
              </View>
              <TextInput
                placeholder={phoneplaceholder}
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholderTextColor="#000"
              />
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <View style={styles.iconCircle}>
                <Icon name="lock" size={20} color="black" />
              </View>
              <TextInput
                placeholder={passwordplaceholder}
                secureTextEntry={secureTextEntry}
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholderTextColor="#000"
              />
              <TouchableOpacity
                onPress={() => setSecureTextEntry(prev => !prev)}
                style={styles.eyeButton}>
                <Icon
                  name={secureTextEntry ? 'eye-off' : 'eye'}
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
            </View>

            {/* Remember Me & Forgot Password */}
            <View style={styles.rememberContainer}>
              <TouchableOpacity onPress={() => setIsChecked(!isChecked)}>
                <Icon
                  name={isChecked ? 'check-square' : 'square'}
                  size={isSmallScreen ? 14 : 20}
                  color={isChecked ? 'red' : 'black'}
                />
              </TouchableOpacity>
              <Text
                style={[
                  styles.rememberText,
                  {fontSize: isSmallScreen ? 14 : 16},
                ]}>
                {useTranslate('Remember me')}
              </Text>
              <View style={{flex: 1}} />
              <TouchableOpacity
                onPress={() => navigation.navigate('ForgetPassword')}>
                <Text
                  style={[
                    styles.forgotPassword,
                    {fontSize: isSmallScreen ? 14 : 16},
                  ]}>
                  {useTranslate('Forgot Password?')}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Login Button */}
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.buttonText}>{useTranslate('LOG IN')}</Text>
            </TouchableOpacity>

            {/* OR */}
            <Text style={styles.orText}>
              {useTranslate('or continue with')}
            </Text>

            {/* Social Buttons */}
            <View style={styles.socialContainer}>
              <TouchableOpacity>
                <Image
                  source={require('../../../../assets/fb.png')}
                  style={styles.socialIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  source={require('../../../../assets/gg.png')}
                  style={styles.socialIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  source={require('../../../../assets/ll.png')}
                  style={styles.socialIcon}
                />
              </TouchableOpacity>
            </View>

            {/* Signup Link */}
            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>
                {useTranslate("Don't have an account?")}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.signupLink}>{useTranslate('Sign Up')}</Text>
              </TouchableOpacity>
            </View>

            {/* Guest Access */}
            <Text style={styles.orText}>{useTranslate('or')}</Text>
            <TouchableOpacity
              style={styles.guestButton}
              onPress={() => {
                dispatch(setUserType(true));
                navigation.navigate('DrawerComps');
              }}>
              <Text style={styles.buttonText}>
                {useTranslate('EXPLORE AS GUEST')}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = {
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '#fff',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  welcomeText: {
    fontSize: 30,
    color: '#FF914D',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  startText: {
    fontSize: 30,
    color: 'black',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    height: 60,
    backgroundColor: '#de8a63',
    borderRadius: 40,
    paddingHorizontal: 15,
    marginBottom: 15,
    opacity: 0.6,
  },
  input: {
    flex: 1,
    color: '#000',
    fontSize: 16,
  },
  iconCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  eyeButton: {
    padding: 10,
    position: 'absolute',
    right: 15,
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '80%',
  },
  rememberText: {
    color: 'black',
    marginLeft: 10,
  },
  forgotPassword: {
    color: '#000',
    textDecorationLine: 'underline',
  },
  loginButton: {
    backgroundColor: '#E18A5E',
    paddingVertical: 15,
    borderRadius: 40,
    width: '80%',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  orText: {
    color: 'black',
    textAlign: 'center',
    marginVertical: 10,
    fontSize: 18,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  socialIcon: {
    width: 40,
    height: 40,
    marginHorizontal: 10,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  signupText: {
    color: 'black',
    fontSize: 15,
  },
  signupLink: {
    color: '#E18A5E',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 5,
  },
  guestButton: {
    backgroundColor: '#E18A5E',
    paddingVertical: 15,
    borderRadius: 30,
    width: '80%',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
};

export default Login;
