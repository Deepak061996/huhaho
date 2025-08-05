import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {launchImageLibrary} from 'react-native-image-picker';
import TopHeader from '../../../components/TopHeader';
import SuccessPopup from '../../../components/SuccessPopup';
import {imageBase} from '../../../config/Constent';
import {useDispatch, useSelector} from 'react-redux';
import useUser from '../../../hooks/useUser';
import Loader from '../../../components/Loader';
import {
  setNavigateDash,
  setProfileDetails,
} from '../../../store/slices/userSlices';
import useDetails from '../../../hooks/useDetail';

import {useTranslate} from '../../../hooks/useTranslate'; // Ensure this is imported
import GooglePlacesAutocomplete from '../../../components/CustomGooglePlacesInput';
import {showWarningToast} from '../../../config/Toast';
// use a valid API key

const UserProfile = ({navigation}) => {
  const {createProfile, isLoading} = useUser();
  const dispatch = useDispatch({});
  const {getDetails} = useDetails();
  const userData = useSelector(state => state.user?.profileDetails);

  console.log(userData, 'user dataskdfhksfh');
  // Translation
  const tName = useTranslate('Name');
  const tEmail = useTranslate('Email');
  const tPhone = useTranslate('Phone Number');
  const tAddress = useTranslate('Address');
  const tSubmit = useTranslate('Submit');
  const tEdit = useTranslate('Edit');
  const tProfileMessage = useTranslate('Your profile has been saved.');

  const [modalMessage, setModalMessage] = useState('');
  const [name, setName] = useState(userData?.data?.name || '');
  const [email, setEmail] = useState(userData?.data?.email || '');
  const [phone, setPhone] = useState(userData?.data?.phone || '');
  const [address, setAddress] = useState(userData?.data?.address || '');
  console.log(address, 'address data of th');
  console.log(address, 'sjdfkashdfshdfshdf');
  const [imageUri, setImageUri] = useState(userData?.data?.profile_img || null);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  //
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    setName(userData?.data?.name)
    setEmail(userData?.data?.email)
    setPhone(userData?.data?.phone)
    setAddress(userData?.data?.address)
    setImageUri(userData?.data?.profile_img)
  },[userData])
  //
  const handleModalClose = () => {
    setIsModalVisible(false);

    // navigation.goBack();
  };

  // Function to pick image
  const selectImage = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const asset = response.assets[0];
        setImageUri({
          uri: asset.uri,
          name: asset.fileName || 'photo.jpg',
          type: asset.type || 'image/jpeg',
        });
      }
    });
  };

  //

  const showToastAndDisable = message => {
    if (!isDisabled) {
      setIsDisabled(true);
      showWarningToast(toast, message);
      setTimeout(() => setIsDisabled(false), 2000);
    }
  };

  const validate = () => {
    if (!imageUri) {
      showToastAndDisable('upload image.');
      return false;
    } else if (!address) {
      showToastAndDisable('Enter the address.');
      return false;
    }
    return true;
  };

  // handle edit profile
  const handleConfirm = async () => {
    if (!address) {
      Alert.alert('Enter address.');
      return;
    }
    try {
      const formData = new FormData();
      formData.append('user_id', userData?.data?.id);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('address', address);

      if (imageUri && imageUri.uri) {
        const photoData = {
          uri: imageUri?.uri,
          name: imageUri.name || 'photo.jpg',
          type: imageUri.type || 'image/jpeg',
        };

        formData.append('profile_img', photoData);
        console.log(imageUri, 'askhdfjksdfhsf');
      }
      const response = await createProfile(formData);
      console.log('******* shrawan', response);
      if (response) {
      
   // dispatch(setNavigateDash(true));
        setModalMessage('Your profile has been saved.'); // Use translated message
        setIsModalVisible(true);
        setIsEdit(false);
        // dispatch(setNavigateDash(true));
        console.log(response, 'hello userd data*******');

        // dispatch(setProfileDetails(response?.data));
      }
    } catch (error) {
      // Handle any error that occurs during the async operation
      console.error('Error in handleConfirm:', error);
      // You can show an error message or do additional error handling here
      setModalMessage('An error occurred. Please try again.');
      // setIsModalVisible(true); // Optionally show a modal with error message
    }
  };

  // Handle place select callback
  const handlePlaceSelect = place => {
    console.log('Selected Place:', place);
    setAddress(place.description); // Set the address state to the selected place
  };
  //

  return (
    <>
      <TopHeader title={useTranslate('My Profile')} showBack={true} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          keyboardShouldPersistTaps="handled">
          <TouchableOpacity
            onPress={selectImage}
            style={styles.imageContainer}
            disabled={!isEdit}>
            <Image
              source={{
                uri:
                  imageUri && typeof imageUri === 'object'
                    ? imageUri.uri // Local image picked
                    : imageUri
                    ? imageUri // Remote image from API
                    : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKKOdmJz8Z2pDtYgFgR2u9spABvNNPKYYtGw&s', // Fallback
              }}
              style={styles.profileImage}
            />
            <View style={styles.innerCircle}>
              <Icon name="pencil" size={18} color="#D9531E" />
            </View>
          </TouchableOpacity>
          {/* Input Fields */}
          <Loader visible={isLoading} />
          <View style={styles.inputContainer}>
            <Icon name="user" size={20} color="black" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder={tName}
              value={name}
              onChangeText={setName}
              editable={isEdit}
            />
          </View>
          <View style={styles.inputContainer}>
            <Icon name="envelope" size={20} color="black" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder={tEmail}
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              editable={false}
            />
          </View>
          <View style={styles.inputContainer}>
            <Icon name="phone" size={20} color="black" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder={tPhone}
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
              editable={false}
            />
          </View>
          <View style={{width: '100%'}}>
            {/* <Icon
              name="map-marker"
              size={20}
              color="black"
              style={{position: 'absolute', top: 45, left: 15}}
            /> */}

            <GooglePlacesAutocomplete
              API_KEY="hjkhkh"
              // API_KEY="AIzaSyC9NuN_f-wESHh3kihTvpbvdrmKlTQurxw" // Replace with your actual Google API Key
              onPlaceSelect={handlePlaceSelect} // Handle place selection
              placeholder="Search for places"
              value={address} // Bind the address to the input field
              onChangeText={setAddress}
              isEdit={isEdit}
              // Update address on text input
            />
          </View>

          <TouchableOpacity
            style={styles.signupButton}
            onPress={() => {
              isEdit ? handleConfirm() : setIsEdit(!isEdit);
            }}>
            <Text style={styles.signupButtonText}>
              {isEdit ? tSubmit : tEdit}
            </Text>
          </TouchableOpacity>
        </ScrollView>
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    alignItems: 'center',
    padding: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 40,
    position: 'relative',
    padding: 5,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  innerCircle: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 5,
    right: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center', // 💥 This vertically centers children inside the container
    width: '90%',
    height: 60,
    backgroundColor: '#de8a63',
    borderRadius: 40,
    paddingHorizontal: 15,
    marginBottom: 15,
    opacity: 0.6,
    top: 20,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  signupButton: {
    backgroundColor: '#E18A5E',
    padding: 10,
    height: 60,
    width: 330,
    borderRadius: 35,
    marginTop: 30,
    zIndex: -100,
  },
  signupButtonText: {
    color: '#fff',
    textAlign: 'center',
    padding: 10,
    fontSize: 18,
  },
});

export default UserProfile;
