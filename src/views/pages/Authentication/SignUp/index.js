import React, {useState} from 'react';
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
} from 'react-native';

import EmailIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useToast} from 'react-native-toast-notifications';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/Fontisto';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import Icon2 from 'react-native-vector-icons/AntDesign';

import GropIcon from 'react-native-vector-icons/FontAwesome';

import Icon3 from 'react-native-vector-icons/Feather';

import TopHeader from '../../../../components/TopHeader';
import useUser from '../../../../hooks/useUser';
import Loader from '../../../../components/Loader';
import {
  showErrorToast,
  showSuccessToast,
  showWarningToast,
} from '../../../../config/Toast';
import {useTranslate} from '../../../../hooks/useTranslate';
//
//

const SignUp = ({navigation}) => {
  const {SignupUser, isLoading} = useUser();
  const transltatedTxt = useTranslate('Create an account');
  const toast = useToast();
  const [isDisabled, setIsDisabled] = useState(false); //
  const [accountType, setAccountType] = useState('Individual');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    groupSize: '',
    password: '',
    confirmPassword: '',
  });
  //
  const emailplaceholder = useTranslate('Email Address');
  const phones = useTranslate('Phone');
  const passwordplaceholder = useTranslate('Password');
  const confirmplaceholder = useTranslate('Confirm Password');
  const [securePassword, setSecurePassword] = useState(true);
  const [secureConfirmPassword, setSecureConfirmPassword] = useState(true);
  const [isChecked, setIsChecked] = useState(false);

  const handleInputChange = (key, value) => {
    setFormData({...formData, [key]: value});
  };
  //

  const showToastAndDisable = message => {
    if (!isDisabled) {
      setIsDisabled(true);
      showWarningToast(toast, message);
      setTimeout(() => setIsDisabled(false), 2000);
    }
  };

  const validateForm = () => {
    let flag = true;
    const passRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#!])[A-Za-z\d@$!%*?&#!]{6,}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;

    const {name, email, phone, password, confirmPassword} = formData;

    // Trim inputs to avoid leading/trailing spaces
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();
    const trimmedPassword = password.trim();
    const trimmedConfirmPassword = confirmPassword.trim();

    if (trimmedName.length === 0) {
      showToastAndDisable('Enter username.');
      flag = false;
    } else if (trimmedEmail.length === 0) {
      showToastAndDisable('Enter email address.');
      flag = false;
    } else if (!emailRegex.test(trimmedEmail)) {
      showToastAndDisable('Please enter a valid email address.');
      flag = false;
    } else if (trimmedPhone.length === 0) {
      showToastAndDisable('Enter phone number.');
      flag = false;
    } else if (trimmedPassword.length === 0) {
      showToastAndDisable('Please enter password.');
      flag = false;
    } else if (!passRegex.test(trimmedPassword)) {
      showToastAndDisable(
        'The password should be at least six characters long, and include one uppercase letter, one lowercase letter, one numeric digit, and one special character.',
      );
      flag = false;
    } else if (trimmedConfirmPassword.length === 0) {
      showToastAndDisable('Please enter confirm password.');
      flag = false;
    } else if (!passRegex.test(trimmedConfirmPassword)) {
      showToastAndDisable(
        'The confirm password should be at least six characters long and include one uppercase letter, one lowercase letter, one numeric digit, and one special character.',
      );
      flag = false;
    } else if (trimmedPassword !== trimmedConfirmPassword) {
      showToastAndDisable('Passwords do not match.');
      flag = false;
    } else if (!isChecked) {
      showToastAndDisable('Please select check box.');
      flag = false;
    }

    return flag;
  };

  const handleSignup = async () => {
    try {
      if (!validateForm()) return;
      // setLoading(true);
      const response = await SignupUser({
        name: formData?.name,
        phone: formData?.phone, // Fixed phone key, it was using email before
        email: formData?.email,
        password: formData?.password,
        user_category_id:
          accountType === 'Individual'
            ? '2'
            : accountType === 'Group/Family'
            ? '3'
            : accountType === 'Corporate'
            ? '1'
            : '',
        fcm_token: 'wrrwqtrwqt',
        group_size: accountType === 'Individual' ? '1' : formData?.groupSize,
      });

      if (response) {
        console.log(response?.data, 'after data singup api hitted');
        showSuccessToast(toast, 'Otp sent successfully');
        navigation.navigate('Verification', {
          source: 'signup',
          email: formData.email,
          name: formData.name,
          phone: formData.phone,
        });
      } else {
        console.error('Signup failed: No response received');
        showWarningToast(toast, 'Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Error signing up user:', error);
      showWarningToast(toast, error?.message);
    }
  };

  return (
    <>
      <TopHeader title={transltatedTxt} showBack={true} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <View style={styles.radioContainer}>
              {['Individual', 'Group/Family', 'Corporate'].map(type => (
                <TouchableOpacity
                  key={type}
                  onPress={() => setAccountType(type)}
                  style={styles.radioButton}>
                  <Icon
                    name={accountType === type ? 'dot-circle-o' : 'circle-o'}
                    size={20}
                    color={accountType === type ? '#E18A5E' : '#000'}
                    style={styles.radioIcon}
                  />
                  <Text style={styles.radioText}>{type}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <Loader visible={isLoading} />
            <View style={styles.inputContainer}>
              {accountType === 'Individual' ? (
                <Icon
                  name="user"
                  size={18}
                  color="black"
                  style={styles.iconStyle}
                />
              ) : accountType === 'Group/Family' ? (
                <GropIcon
                  name="group"
                  size={18}
                  color="black"
                  style={{marginRight: 5}}
                />
              ) : (
                <GropIcon
                  name="group"
                  size={18}
                  color="black"
                  style={{marginRight: 5}}
                />
              )}

              <TextInput
                placeholder={
                  accountType === 'Individual'
                    ? 'Username'
                    : accountType === 'Group/Family'
                    ? 'Group Name'
                    : 'Organization Name'
                }
                placeholderTextColor="#000"
                value={formData.name}
                onChangeText={text => handleInputChange('name', text)}
                style={styles.inputStyle}
              />
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.iconCircle}>
                <EmailIcon name="email" size={18} color="black" />
              </View>
              <TextInput
                placeholder={
                  accountType === 'Individual'
                    ? 'Email Address'
                    : accountType === 'Group/Family'
                    ? 'Email Address'
                    : 'Organization Email Address '
                }
                placeholderTextColor="#000"
                value={formData.email}
                onChangeText={text => handleInputChange('email', text)}
                style={styles.inputStyle}
              />
            </View>

            <View style={styles.inputContainer}>
              <Icon
                name="phone"
                size={20}
                color="#000"
                style={styles.iconStyle}
              />
              <TextInput
                placeholder={phones}
                keyboardType="number"
                placeholderTextColor="#000"
                maxLength={10}
                value={formData.phone}
                onChangeText={text => handleInputChange('phone', text)}
                style={styles.inputStyle}
              />
            </View>

            {accountType !== 'Individual' && (
              <View style={styles.inputContainer}>
                <Icon
                  name="users"
                  size={20}
                  color="#000"
                  style={styles.iconStyle}
                />
                <TextInput
                  placeholder="Group Size"
                  placeholderTextColor="#000"
                  value={formData.groupSize}
                  onChangeText={text => handleInputChange('groupSize', text)}
                  style={styles.inputStyle}
                />
              </View>
            )}

            <View style={styles.inputContainer}>
              <Icon
                name="lock"
                size={20}
                color="#000"
                style={styles.iconStyle}
              />
              <TextInput
                placeholder={passwordplaceholder}
                placeholderTextColor="#000"
                secureTextEntry={securePassword}
                value={formData.password}
                onChangeText={text => handleInputChange('password', text)}
                style={styles.inputStyle}
              />
              <TouchableOpacity
                onPress={() => setSecurePassword(!securePassword)}>
                <Icon
                  name={securePassword ? 'eye-slash' : 'eye'}
                  size={20}
                  color="#000"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <Icon
                name="lock"
                size={20}
                color="#000"
                style={styles.iconStyle}
              />
              <TextInput
                placeholder={confirmplaceholder}
                placeholderTextColor="#000"
                secureTextEntry={secureConfirmPassword}
                value={formData.confirmPassword}
                onChangeText={text =>
                  handleInputChange('confirmPassword', text)
                }
                style={styles.inputStyle}
              />
              <TouchableOpacity
                onPress={() =>
                  setSecureConfirmPassword(!secureConfirmPassword)
                }>
                <Icon
                  name={secureConfirmPassword ? 'eye-slash' : 'eye'}
                  size={20}
                  color="#000"
                />
              </TouchableOpacity>
            </View>
            <View style={styles.rememberContainer}>
              <TouchableOpacity
                onPress={() => setIsChecked(!isChecked)}
                style={{}}>
                <Icon3
                  name={isChecked ? 'check-square' : 'square'}
                  size={20}
                  color={isChecked ? 'red' : 'black'}
                  style={{marginTop: -10}}
                />
              </TouchableOpacity>
              <View style={{marginLeft: 10}}>
                <Text style={styles.rememberText}>
                  {useTranslate('By Signing up you agree to our')}{' '}
                  <Text
                    onPress={() => navigation.navigate('PrivacyPolicy')}
                    style={{
                      color: '#87CEEB',
                      textDecorationLine: 'underline',
                      fontSize: 14,
                    }}>
                    {useTranslate('Privacy Policy')}
                  </Text>
                  {'\n'}
                  <Text style={{fontSize: 14}}>{useTranslate('and')} </Text>
                  <Text
                    onPress={() => navigation.navigate('TermsCond')}
                    style={{
                      color: '#87CEEB',
                      textDecorationLine: 'underline',
                      fontSize: 14,
                    }}>
                    {useTranslate('T&C')}
                  </Text>
                </Text>
              </View>
            </View>
            <TouchableOpacity
              // disabled={!isChecked}
              onPress={() => handleSignup()}
              style={[styles.signupButton]}>
              <Text style={styles.signupButtonText}>
                {useTranslate('SIGN UP')}
              </Text>
            </TouchableOpacity>

            <Text style={{marginTop: 10, fontSize: 18, color: 'black'}}>
              {useTranslate('or sign up with')}
            </Text>
            <Text style={styles.title}>{useTranslate('or sign up with')}</Text>
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
            <View style={styles.footer}>
              <Text style={styles.text}>
                {useTranslate('Already have an account?')}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.signIn}> {useTranslate('Sign in')} </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {flex: 1, backgroundColor: '#ffffff'},
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    top: 20,
  },
  scrollContainer: {alignItems: 'center', paddingVertical: 20},
  headerText: {fontSize: 20, color: '#000', marginBottom: 10},
  highlight: {fontWeight: 'bold', color: '#FF914D'},
  radioContainer: {flexDirection: 'row', marginTop: -20},
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    color: '#FF914D',
    marginTop: -15,
  },
  radioIcon: {marginRight: 5},
  radioText: {color: '#000', fontSize: 18},
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
    top: 20,
  },
  inputStyle: {flex: 1, color: '#000'},
  iconStyle: {marginRight: 10},
  iconCircle: {
    width: 22,
    height: 22,
    borderRadius: 30,
    borderColor: '#000',
    // borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  signupButton: {
    backgroundColor: '#E18A5E',
    padding: 10,
    height: 60,
    width: 330,
    borderRadius: 35,
    marginTop: 30,
  },
  signupButtonText: {color: '#fff', textAlign: 'center', padding: 10},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    top: -30,
  },
  logo: {width: 100, height: 100, left: -20},
  title: {
    color: 'white',
    fontSize: 16,
    marginVertical: 10,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    top: -20,
    marginBottom: 15,
  },
  socialIcon: {width: 40, height: 40, marginHorizontal: 10},
  icon: {
    width: 40,
    height: 40,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    top: -20,
  },
  text: {
    color: 'black',
    fontSize: 15,
  },
  signIn: {
    color: '#f7955c',
    fontSize: 20,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  iconWrapper: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderColor: '#f7955c',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    flexWrap: 'wrap',
  },
  rememberText: {
    color: 'black',
    marginLeft: 10,
    fontSize: 14,
    marginLeft: -2,
  },
});

export default SignUp;
