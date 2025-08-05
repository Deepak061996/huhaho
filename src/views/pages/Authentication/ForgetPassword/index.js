import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/Fontisto';
import TopHeader from '../../../../components/TopHeader';
import {useNavigation} from '@react-navigation/native';
import useUser from '../../../../hooks/useUser';
import {useToast} from 'react-native-toast-notifications';
import {
  showErrorToast,
  showSuccessToast,
  showWarningToast,
} from '../../../../config/Toast';
import EmailIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import Loader from '../../../../components/Loader';
import {useTranslate} from '../../../../hooks/useTranslate';

const ForgetPassword = () => {
  //
  const transltedTxt = useTranslate('Forgot Password');
  const toast = useToast();
  const {forgotPassword, isLoading} = useUser();

  const [isDisabled, setIsDisabled] = useState(false);
  //

  const [email, setEmailOrPhone] = useState('');
  const navigation = useNavigation();
  //

  const showToastAndDisable = message => {
    if (!isDisabled) {
      setIsDisabled(true);
      showWarningToast(toast, message);
      setTimeout(() => setIsDisabled(false), 2000);
    }
  };
  const validateForm = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
    const phoneRegex = /^[0-9]{10,15}$/;

    if (!email) {
      showToastAndDisable('Please enter email or phone number.');
      return false;
    }

    if (!emailRegex.test(email) && !phoneRegex.test(email)) {
      showToastAndDisable('Please enter a valid email or phone number.');
      return false;
    }

    return true;
  };

  const handleResetPassword = async () => {
    if (!validateForm()) return;

    try {
      const response = await forgotPassword({email: email});

      if (response) {
        navigation.navigate('Verification', {
          source: 'forgotPassword',
          email,
        });
        showSuccessToast(toast, 'Otp sent to email.');
      }
    } catch (error) {
      console.log(
        error.response?.data || error.message,
        'error of forgot screen',
      );
      showToastAndDisable(error.response?.data || error.message);
    }
  };

  return (
    <>
      <TopHeader title={transltedTxt} showBack={true} />
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          {/* Circle with mail icon */}
          <Loader visible={isLoading} />
          <View style={styles.iconCircle}>
            <EmailIcon name="email" size={20} color="black" />
          </View>

          {/* Input Field */}
          <TextInput
            placeholder={useTranslate('Enter your registered email/phone')}
            value={email}
            onChangeText={txt => setEmailOrPhone(txt)}
            style={[styles.input, {color: 'black'}]}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="black"
          />
        </View>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => handleResetPassword()}>
          <Text style={styles.submitText}>{useTranslate('Submit')}</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 100,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '95%',
    height: 50,
    backgroundColor: '#E18A5E',
    borderRadius: 25,
    paddingHorizontal: 10,
    marginBottom: 20,
    opacity: 0.8,
  },
  iconCircle: {
    width: 30,
    height: 30,
    borderRadius: 30,

    justifyContent: 'center',
    alignItems: 'center',
    // marginRight: 20,
    borderColor: 'black',
    // borderWidth: 2,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
  },
  submitButton: {
    backgroundColor: '#E18A5E',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 80,
    alignItems: 'center',
    marginTop: 30,
  },
  submitText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ForgetPassword;
