import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import OTPTextInput from 'react-native-otp-textinput';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TopHeader from '../../../../components/TopHeader';
import SuccessPopup from '../../../../components/SuccessPopup';
import {useSelector} from 'react-redux';
import useUser from '../../../../hooks/useUser';
import {useToast} from 'react-native-toast-notifications';
import {
  showErrorToast,
  showSuccessToast,
  showWarningToast,
} from '../../../../config/Toast';
import Loader from '../../../../components/Loader';
import {useTranslate} from '../../../../hooks/useTranslate';

const Verification = ({navigation, route}) => {
  const translate = useTranslate;

  const translatedTitle = translate('OTP Verification');
  const translatedYourPref = translate('Your preference for OTP');
  const translatedEmail = translate('Email');
  const translatedPhone = translate('Phone');
  const translatedEnterOTP = translate('Please enter the OTP shared');
  const translatedResend = translate('Resend OTP');
  const translatedSubmit = translate('CONFIRM');
  const translatedResendIn = translate('Resend verification code in  sec');

  const [otp, setOtp] = useState('');
  const [otpMethod, setOtpMethod] = useState('email');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [timer, setTimer] = useState(120); // Updated to 120 seconds
  const [isDisabled, setIsDisabled] = useState(false);

  const [ToastDisable, setToastDisable] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const toast = useToast();
  const {source, name, email, phone} = route.params;
  const {verifyOtp, isLoading, sendOtp} = useUser();
  const {userInfo} = useSelector(({user}) => user);

  useEffect(() => {
    setIsDisabled(true);
  }, []);

  useEffect(() => {
    if (source === 'signup' || source === 'forgotPassword') {
      setIsModalVisible(false);
    }
  }, [source]);

  useEffect(() => {
    let interval;
    if (isDisabled && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsDisabled(false);
    }
    return () => clearInterval(interval);
  }, [isDisabled, timer]);

  const handleConfirm = () => {
    if (source === 'signup') {
      setModalMessage('Your account has been created successfully.');
      setIsModalVisible(true);
    } else if (source === 'forgotPassword') {
      navigation.navigate('ResetPassword');
    }
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    if (source === 'signup') {
      navigation.navigate('MyProfile');
    } else if (source === 'forgotPassword') {
      navigation.navigate('ResetPassword');
    }
  };

  const handleResendApi = async () => {
    try {
      const formData = new FormData();
      //Shrawan
      //otpMethod
      if (source === 'signup') {
        if (otpMethod === 'email') {
          formData.append('email', email);
          console.log(otpMethod, '***** Email');
        }else{
          formData.append('email', phone);
          console.log(otpMethod, '*****Phone');
        }
      }else if (source === 'forgotPassword') {
        formData.append('email', email);
      }
    
     // formData.append('email', email);

      const response = await sendOtp(formData);

      if (response) {
        setTimer(120); // Reset the timer to 120 seconds
        setIsDisabled(true);
        showSuccessToast(toast, 'OTP Resent, please check.');
      } else {
        showErrorToast(toast, 'Failed to send OTP. Please try again.');
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Something went wrong.';
      if (!showToast) {
        setShowToast(true);
        showWarningToast(toast, errorMessage);
        setTimeout(() => setShowToast(false), 5000);
      }
    }
  };

  const showToastAndDisable = message => {
    if (!ToastDisable) {
      setToastDisable(true);
      showWarningToast(toast, message);
      setTimeout(() => setToastDisable(false), 2000);
    }
  };

  const validate = () => {
    if (otp.length !== 4) {
      showToastAndDisable('Please enter a valid 4-digit OTP.');
      return false;
    }
    return true;
  };

  const handleVerify = async () => {
    if (!validate()) return;
    try {
      let response = null;
      if (source === 'signup') {
        const  type = otpMethod
        if (otpMethod === 'email') {
          response = await verifyOtp({email, otp,type});
          console.log(email, otp,type, '*****');
        }else{
          console.log(phone, otp,type, '*****');
          response = await verifyOtp({email: phone, otp,type});
        }
        
      }else if(source === 'forgotPassword'){
         response = await verifyOtp({email, otp});
      }
      
      if (response) {
        handleConfirm();
        setTimer(0);
        // showSuccessToast(toast, response.message);
      } else {
        showErrorToast(toast, 'Invalid otp entered');
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Something went wrong.';
      if (!showToast) {
        setShowToast(true);
        showWarningToast(toast, errorMessage);
        setTimeout(() => setShowToast(false), 5000);
      }
    }
  };

  const formatTime = () => {
    // if (timer === 0) return translatedResend;
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
      2,
      '0',
    )}`;
  };

  return (
    <>
      <TopHeader title={translatedTitle} showBack={true} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[styles.container,
          source !== 'signup' && { marginTop: 40 },
          ]}>
          {source  === 'signup' && (
             <>
        <View style={styles.otpPreferenceContainer}>
          <TouchableOpacity
            onPress={() => setOtpMethod('email')}
            style={styles.iconContainer}>
            <Icon
              name="email"
              size={50}
              color={otpMethod === 'email' ? '#E18A5E' : '#B0B0B0'}
            />
          </TouchableOpacity>
          <Loader visible={isLoading} />
          <View style={styles.separator} />
          <TouchableOpacity
            onPress={() => setOtpMethod('phone')}
            style={[
              styles.phoneIconContainer,
              {
                backgroundColor: otpMethod === 'phone' ? '#E18A5E' : '#B0B0B0',
              },
            ]}>
            <Icon name="phone" size={30} color="#fff" />
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>{translatedYourPref}</Text>
        <RadioButton.Group onValueChange={setOtpMethod} value={otpMethod}>
          <View style={styles.radioContainer}>
            <TouchableOpacity
              onPress={() => setOtpMethod('email')}
              style={styles.radioItem}>
              <RadioButton value="email" color="#E57C23" />
              <Text style={styles.radioText}>{translatedEmail}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setOtpMethod('phone')}
              style={styles.radioItem}>
              <RadioButton value="phone" color="#E57C23" />
              <Text style={styles.radioText}>{translatedPhone}</Text>
            </TouchableOpacity>
          </View>
        </RadioButton.Group>
  </>
  )}
        <Text style={styles.label}>{translatedEnterOTP}</Text>
        <OTPTextInput
          inputCount={4}
          handleTextChange={setOtp}
          tintColor="#E57C23"
          textInputStyle={styles.otpBox}
        />

        <TouchableOpacity
          style={{alignSelf: 'flex-end', marginTop: 30, marginRight: 40}}
          disabled={isDisabled}
          onPress={() => handleResendApi()}>
          <Text
            style={{
              color: isDisabled ? 'gray' : '#E18A5E',
              fontWeight: 'bold',
            }}>
            {translatedResend}
          </Text>
        </TouchableOpacity>
        {isDisabled && (
          <View style={{alignItems: 'center', marginTop: 20}}>
            <Text style={{marginTop: 10, fontSize: 16, color: '#E18A5E'}}>
              {translatedResendIn} {formatTime()}
            </Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.confirmButton}
          onPress={() => handleVerify()}>
          <Text style={styles.confirmText}>{translatedSubmit}</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>

      <SuccessPopup
        isVisible={isModalVisible}
        onClose={handleModalClose}
        message={modalMessage}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {width: '100%', alignItems: 'center', paddingHorizontal: 40},
  otpPreferenceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    marginTop: 100,
  },
  iconContainer: {padding: 10},
  phoneIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    width: 2,
    height: 40,
    backgroundColor: '#E18A5E',
    marginHorizontal: 20,
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
    gap: 20,
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioText: {
    fontSize: 16,
    marginLeft: 8,
  },
  otpBox: {
    borderWidth: 1,
    borderRadius: 5,
    width: 50,
    height: 50,
    fontSize: 20,
    textAlign: 'center',
    marginHorizontal: 5,
    top: 15,
  },
  confirmButton: {
    backgroundColor: '#E18A5E',
    paddingVertical: 10,
    borderRadius: 10,
    width: '80%',
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default Verification;
