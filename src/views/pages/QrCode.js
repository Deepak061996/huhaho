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
} from 'react-native';
import useDetails from '../../hooks/useDetail';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import TopHeader from '../../components/TopHeader';
import {useTranslate} from '../../hooks/useTranslate';
import {clearUser} from '../../store/slices/userSlices';
import {useDispatch} from 'react-redux';

const {width} = Dimensions.get('window');

const QrCode = () => {
  const dispatch = useDispatch();
  const {generate_social_qr} = useDetails();
  const [ImageData, setImageData] = useState({});

  useEffect(() => {
    getQrData();
  }, []);
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
      dispatch(clearUser());
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
    <LinearGradient colors={['#edf5ef', '#edf5ef']} style={styles.container}>
      <TopHeader showBack={true} title={'Our Socials'} />
      <Text
        style={{
          fontSize: 24,
          alignSelf: 'center',
          marginTop: 50,
          position: 'absolute',
          color: 'white',
          fontWeight: 'bold',
        }}>
        {/* {useTranslate("Our Socials")} */}
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
            <FontAwesome name="instagram" size={30} color="#C13584" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Linking.openURL(socialLinks.facebook)}>
            <FontAwesome name="facebook" size={30} color="#3b5998" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Linking.openURL(socialLinks.linkedin)}>
            <FontAwesome name="linkedin" size={30} color="#0077B5" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Linking.openURL(socialLinks.youtube)}>
            <FontAwesome name="youtube-play" size={30} color="#FF0000" />
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginBottom: 20,
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 10,
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
  },
});

export default QrCode;
