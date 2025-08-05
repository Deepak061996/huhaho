import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import TopHeader from '../../../../components/TopHeader';
import SuccessPopup from '../../../../components/SuccessPopup';
import useUser from '../../../../hooks/useUser';
import {useSelector} from 'react-redux';
import {useToast} from 'react-native-toast-notifications';
import {
  showErrorToast,
  showSuccessToast,
  showWarningToast,
} from '../../../../config/Toast';
import Loader from '../../../../components/Loader';
import {useTranslate} from '../../../../hooks/useTranslate';

const ResetPassword = () => {
  const toast = useToast();
  const translatedTxt = useTranslate('Reset Password');
  const createNewpass = useTranslate('Create New Password');
  const confirmNewpass = useTranslate('Confirm New Password');
  //
  const {resetPassword, isLoading} = useUser();
  //
  const {userInfo} = useSelector(({user}) => user);
  console.log(userInfo, 'userinfo data');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [secureTextEntry1, setSecureTextEntry1] = useState(true);
  const [secureTextEntry2, setSecureTextEntry2] = useState(true);
  const [modalMessage, setModalMessage] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [isDisabled, setIsDisabled] = useState(false);

  const navigation = useNavigation(); // Navigation ka reference le rahe hain

  const handleModalClose = () => {
    setIsModalVisible(false);
    navigation.navigate('Login'); // Screen replace karne ke liye
  };

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

    if (newPassword.length === 0) {
      showToastAndDisable('Enter new password.');
      flag = false;
    } else if (!passRegex.test(newPassword)) {
      showToastAndDisable(
        'The new password should be at least six characters long, and include one uppercase letter, one lowercase letter, one numeric digit, and one special character.',
      );
      flag = false;
    } else if (confirmNewPassword.length === 0) {
      showToastAndDisable('Please enter confirm new password.');
      flag = false;
    } else if (!passRegex.test(confirmNewPassword)) {
      showToastAndDisable(
        'The confirm new password should be at least six characters long and include one uppercase letter, one lowercase letter, one numeric digit, and one special character.',
      );
      flag = false;
    } else if (newPassword !== confirmNewPassword) {
      showToastAndDisable('Passwords do not match.');
      flag = false;
    }

    return flag;
  };

  //
  const handleConfirm = async () => {
    console.log(
      {
        user_id: userInfo?.id,
        password: newPassword,
      },
      'parasms of reset password',
    );
    if (!validateForm()) return;

    try {
      const response = await resetPassword({
        user_id: userInfo?.id,
        password: newPassword,
      });

      if (response) {
        setModalMessage('Your password has been changed successfully.');
        setIsModalVisible(true);
      }
    } catch (error) {
      console.error('Password reset error:', error);
      setModalMessage('Something went wrong. Please try again later.');
      setIsModalVisible(false);
    }
  };

  return (
    <>
      <TopHeader title={translatedTxt} showBack={true} />
      <View style={styles.container}>
        <Loader visible={isLoading} />
        <PasswordInput
          placeholder={createNewpass}
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry={secureTextEntry1}
          toggleSecureTextEntry={() => setSecureTextEntry1(!secureTextEntry1)}
        />
        <PasswordInput
          placeholder={confirmNewpass}
          value={confirmNewPassword}
          onChangeText={setConfirmNewPassword}
          secureTextEntry={secureTextEntry2}
          toggleSecureTextEntry={() => setSecureTextEntry2(!secureTextEntry2)}
        />
        {/* Submit button me onPress add kiya */}
        <TouchableOpacity style={styles.submitButton} onPress={handleConfirm}>
          <Text style={styles.submitText}>{useTranslate('Submit')}</Text>
        </TouchableOpacity>
      </View>
      <SuccessPopup
        isVisible={isModalVisible}
        onClose={handleModalClose}
        message={modalMessage}
      />
    </>
  );
};

const PasswordInput = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  toggleSecureTextEntry,
}) => (
  <View style={styles.inputContainer}>
    <View style={styles.iconCircle}>
      <Icon name="lock" size={20} color="black" />
    </View>
    <TextInput
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      style={styles.passwordInput}
      value={value}
      onChangeText={onChangeText}
      placeholderTextColor="#000"
    />
    <TouchableOpacity onPress={toggleSecureTextEntry} style={styles.eyeButton}>
      <Icon
        name={secureTextEntry ? 'eye-slash' : 'eye'}
        size={24}
        color="black"
      />
    </TouchableOpacity>
  </View>
);

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
    width: '90%',
    height: 60,
    backgroundColor: '#de8a63',
    borderRadius: 40,
    paddingHorizontal: 15,
    marginBottom: 20,
    opacity: 0.6,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 30,

    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    borderColor: 'black',
    borderWidth: 2,
  },
  passwordInput: {
    flex: 1,
    color: 'black',
  },
  eyeButton: {
    padding: 10,
    position: 'absolute',
    right: 15,
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

export default ResetPassword;
