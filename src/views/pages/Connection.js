import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Linking,
  Alert,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import useDetails from '../../hooks/useDetail';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import TopHeader from '../../components/TopHeader';
import {useTranslate} from '../../hooks/useTranslate';
// import {clearUser} from '../../store/slices/userSlices';
import {useDispatch, useSelector} from 'react-redux';

const {width} = Dimensions.get('window');

const Connection = () => {
  const {userInfo} = useSelector(({user}) => user);
  const {keeploginOut} = useDetails();

  const dispatch = useDispatch();
  const {generate_social_qr} = useDetails();
  const [ImageData, setImageData] = useState({});

  useEffect(() => {
    getQrData();
    checkUserStatus();
  }, []);

  const checkUserStatus = async () => {
    if (!userInfo?.data?.id) {
      console.log('User ID is not available. Cannot make the API call.');
      return; // Stop if user ID is undefined
    }

    console.log(userInfo?.data?.id, 'payload of this data33333');

    try {
      const response = await keeploginOut({user_id: userInfo?.data?.id});
      console.log(response, 'response of exist user');

      if (response.data.force_logout === true) {
        // Show alert pop-up with a 3-second timer
        Alert.alert(
          'Account Suspended',
          'Your account has been Suspended by the admin.',
          [
            {
              text: 'OK',
              onPress: () => {
                // console.log('User acknowledged account deletion');
                setTimeout(async () => {
                  // navigation.navigate('Login');
                  // dispatch(clearUser());
                  console.log('User logged out after account suspended.');
                }, 3000); // 3-second timer before logout
              },
            },
          ],
          {cancelable: false},
        );
      }
    } catch (error) {
      console.error('Error checking user status:', error);
    }
  };

  const getQrData = async () => {
    try {
      const response = await generate_social_qr({
        links: {
          instagram: 'https://www.instagram.com/huhaho_human.happiness.hope/',
          facebook:
            'https://www.facebook.com/sparshhealthcareandwellness/photos/?_rdr',
          linkedin:
            'https://in.linkedin.com/company/sparshhealthcareandwellness',
          youtube: 'https://www.youtube.com/@HuHaHo_HumanHappinessHope',
        },
      });

      if (response) {
        setImageData(response);
        console.log(response, 'response of the qr api');
      }
    } catch (error) {
      console.log(error, 'error qr api error');
      // dispatch(clearUser());
    }
  };

  const socialLinks = {
    instagram: 'https://www.instagram.com/huhaho_human.happiness.hope/',
    facebook:
      'https://www.facebook.com/sparshhealthcareandwellness/photos/?_rdr',
    linkedin: 'https://in.linkedin.com/company/sparshhealthcareandwellness',
    youtube: 'https://www.youtube.com/@HuHaHo_HumanHappinessHope',
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
       <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 24,
          alignSelf: 'center',
          marginTop: 50,
          position: 'absolute',
          color: 'black',
          fontWeight: 'bold',
        }}>
        {useTranslate('   Our Socials')}
      </Text>
      <View style={styles.card}>
        <Image source={{uri: ImageData?.qr_image_url}} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{useTranslate('Scan to Connect')}</Text>
          <Text style={styles.subtitle}>
            {useTranslate(' Scan the QR code above to join our network.')}
          </Text>
        </View>
      </View>

      <View style={styles.connectSection}>
        <Text style={styles.connectText}>
          {useTranslate('Connect with us')}
        </Text>
        <View style={styles.iconRow}>
          <TouchableOpacity
            onPress={() => Linking.openURL(socialLinks.instagram)}>
            <Image
              source={require('../../assets/logoInsta2.png')}
              style={{width: 40, height: 40, marginHorizontal: 10}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Linking.openURL(socialLinks.facebook)}>
            <Image
              source={require('../../assets/fb.png')}
              style={{
                width: 30,
                height: 30,
                marginHorizontal: 10,
                marginTop: 5,
              }}
            />
            {/* <FontAwesome name="facebook" size={20} color="#3b5998" /> */}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Linking.openURL(socialLinks.linkedin)}>
            <Image
              source={require('../../assets/ll.png')}
              style={{
                width: 30,
                height: 30,
                marginHorizontal: 10,
                marginTop: 5,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Linking.openURL(socialLinks.youtube)}>
            <Image
              source={require('../../assets/logo-ut.png')}
              style={{
                width: 40,
                height: 40,
                marginHorizontal: 10,
              }}
            />
          </TouchableOpacity>
        </View>
        <Text style={[styles.connectText, {marginTop: 20}]}>Our Website</Text>
        <TouchableOpacity
          onPress={() => Linking.openURL('https://www.huhaho.com')}>
          <Text
            style={[
              styles.connectText,
              {color: 'blue', textDecorationLine: 'underline'},
            ]}>
            www.huhaho.com
          </Text>
        </TouchableOpacity>
      </View>
    </View>
    </ScrollView>
</SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  card: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 20,
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 100,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 4},
    elevation: 5,
  },
  image: {
    width: 220,
    height: 220,
    resizeMode: 'contain',
    // marginBottom: 20,
    marginTop: -20,
  },
  textContainer: {
    alignItems: 'center',
    marginTop: -10,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
    textAlign: 'center',
  },
  connectSection: {
    alignItems: 'center',
    marginTop: 40,
  },
  connectText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333',
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '60%',
    marginTop: 10,
  },
});

export default Connection;
