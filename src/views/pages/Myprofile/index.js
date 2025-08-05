import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Patform,
  Alert,
  Platform,
  PermissionsAndroid,
  ScrollView,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';

import Icon from 'react-native-vector-icons/FontAwesome';
import {launchImageLibrary} from 'react-native-image-picker';

import UploadIcon from 'react-native-vector-icons/AntDesign';
import TopHeader from '../../../components/TopHeader';
import SuccessPopup from '../../../components/SuccessPopup';
import UserProfile from '../UserProfile';
import Constent from '../../../config/Constent';
import useUser from '../../../hooks/useUser';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../../components/Loader';
import {setUserType, setNavigateDash, setUserInfo} from '../../../store/slices/userSlices';
import {useTranslate} from '../../../hooks/useTranslate';
import GooglePlacesAutocomplete from '../../../components/CustomGooglePlacesInput';
import Geocoder from 'react-native-geocoding';

// Geocoder.init('AIzaSyCjVUypDYIrx1DDEC8pDj1GQ9AISFmKyF8');
Geocoder.init('hkjhksgggh');
const MyProfile = ({navigation, source}) => {
  const dispatch = useDispatch();
  const {createProfile, isLoading} = useUser();
  const navigateDash = useSelector(state => state?.user?.navigateDash);
  const data = useSelector(state => state.user);
  console.log(data,'1243');
  console.log(navigateDash, 'sjdfhajsghasjdfhdjksf');
  const [modalMessage, setModalMessage] = useState('');
  const [name, setName] = useState(
    data?.userInfo?.name ? data?.userInfo?.name : '',
  );
  const [email, setEmail] = useState(
    data?.userInfo?.email ? data?.userInfo?.email : '',
  );
  const [phone, setPhone] = useState(
    data?.userInfo?.phone ? data?.userInfo?.phone : '',
  );
  const [address, setAddress] = useState('');
  console.log(address, 'address*******************');
  const [photo, setPhoto] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [previewImg, setPreviewImg] = useState(null);
  const [location, setLocation] = useState(null);

  console.log(location, 'Location data comes from here***');

  const [initialLoading, setInitialLoading] = useState(true);
  
  

  const handleModalClose = () => {
    setIsModalVisible(false);
    if (source === 'signup') {
      navigation.navigate('MyProfile');
    }
    dispatch(setNavigateDash(true));
  };
  //
  // Example coordinates for Noida
  // const latitude = 28.5355;
  // const longitude = 77.391;

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } else {
      const result = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      return result === RESULTS.GRANTED;
    }
  };

  const getCurrentLocation = async () => {
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) return;

    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setLocation({latitude, longitude}); // ✅ Only setting lat & long
      },
      error => {
        console.log('Location error:', error);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

 

  useEffect(() => {
    getCurrentLocation();
  }, []);

 
  useEffect(() => {
    const getAddress = async () => {
      try {
        const response = await Geocoder.from(
          location?.latitude,
          location?.longitude,
        );
        console.log('Geocoding Response:', response); // Log the response to check it
        const addressComponent =
          response.results[0]?.formatted_address || 'Address not found';
        setAddress(addressComponent);
        console.log(addressComponent, 'respo of auto fetch****');
      } catch (err) {
        console.warn('Geocoding error:', err);
        setError('Unable to fetch address');
      } finally {
        setLoading(false);
      }
    };
    getAddress();
  }, [location]);
  //
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
        setPhoto({
          uri: asset.uri,
          name: asset.fileName || 'photo.jpg',
          type: asset.type || 'image/jpeg',
        });
      }
    });
  };

  // create profile

  const handleProfile = async () => {
    if (!address) {
      Alert.alert('Please Enter address.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('user_id', data?.userInfo?.id);
      formData.append('name', name);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('address', address);

      if (photo && photo.uri) {
        const photoData = {
          uri: photo?.uri,
          name: photo.name || 'photo.jpg',
          type: photo.type || 'image/jpeg',
        };

        formData.append('profile_img', photoData);
      }

      const response = await createProfile(formData);

      if (response) {
        setModalMessage('Your profile has been created successfully.');
        setIsModalVisible(true);
      }
    } catch (error) {
      console.error('Error sending form data:', error);
      throw error;
    }
  };
  const addressplaceholder = useTranslate('Address');
  const handlePlaceSelect = place => {
    console.log('Selected Place:', place);
    setAddress(place.description); // Set the address state to the selected place
  };

  return (
    <>
      <TopHeader title={'Create Profile'} showBack={true} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          keyboardShouldPersistTaps="handled">
          {/* Profile Image with Upload Button */}

          <Loader visible={isLoading} />
          <TouchableOpacity onPress={selectImage} style={styles.imageContainer}>
            <Image
              source={{
                uri: photo?.uri
                  ? photo?.uri
                  : 'https://img.freepik.com/premium-vector/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-875.jpg?semt=ais_hybrid&w=740',
              }}
              style={styles.profileImage}
            />
            <View style={styles.innerCircle}>
              <UploadIcon name="upload" size={18} color="#D9531E" />
            </View>
          </TouchableOpacity>

          {/* Input Fields */}
          <View style={styles.inputContainer}>
            <Icon name="user" size={20} color="black" style={styles.icon} />
            <TextInput
              editable={false}
              style={styles.input}
              placeholder="Name"
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="envelope" size={20} color="black" style={styles.icon} />
            <TextInput
              editable={false}
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="phone" size={20} color="black" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              keyboardType="phone-pad"
              value={phone}
              editable={false}
              onChangeText={setPhone}
            />
          </View>

          <View style={{width: '100%'}}>
            {/* <Icon
              name="map-marker"
              size={20}
              color="black"
              style={styles.icon}
            /> */}
            {/* <TextInput
              style={styles.input}
              placeholder={addressplaceholder}
              value={address}
              onChangeText={setAddress}
            /> */}

            <GooglePlacesAutocomplete
              API_KEY="jhjgkjgjggjk"
              // API_KEY="AIzaSyC9NuN_f-wESHh3kihTvpbvdrmKlTQurxw" // Replace with your actual Google API Key
              onPlaceSelect={handlePlaceSelect} // Handle place selection
              placeholder="Enter address"
              value={address} // Bind the address to the input field
              onChangeText={setAddress} // Update address on text input
            />
          </View>
          <TouchableOpacity
            style={styles.signupButton}
            onPress={() => handleProfile()}>
            <Text style={styles.signupButtonText}>
              {useTranslate('Submit')}
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
    marginBottom: 20,
    position: 'relative',

    padding: 5,
    marginTop: 20,
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 65,
  },
  innerCircle: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 15,
    right: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
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
    elevation: -100,
  },
  signupButtonText: {
    color: '#fff',
    textAlign: 'center',
    padding: 10,
    fontSize: 17,
  },
});

export default MyProfile;
