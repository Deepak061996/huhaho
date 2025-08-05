import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import TopHeader from '../../../components/TopHeader';
import {useRoute} from '@react-navigation/native';
import useDetails from '../../../hooks/useDetail';
import AuthModal from '../../../components/AuthModal';
import {useDispatch, useSelector} from 'react-redux';
import {clearUser} from '../../../store/slices/userSlices';
import {useTranslate} from '../../../hooks/useTranslate';

//
const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;
//
const ServiceDetails = ({route}) => {
  const navigation = useNavigation();
  const guestType = useSelector(state => state?.user?.userTypeGuest);
  const navigateDash = useSelector(state => state?.user?.navigateDash);

  console.log(navigateDash, 'navigateDash***', guestType, 'guest type****');
  const dispatch = useDispatch();

  const [Details, setDetails] = useState(null);

  const [isModalVisible, setModalVisible] = useState(false);

  console.log(Details, 'kasjdkfjhsajkdfhskdhsfd');

  const {
    getItemDetails,
    categoryDetails,
    arrivalDetails,
    detailsAppoint,
    upcomingDetails,
    getRelatedTechnique,
  } = useDetails();
  const categoryType = route?.params?.categoryType;
  const value = route?.params?.value;
  const dataPrice = route?.params?.navigate_data;

  const hideStatus = route?.params?.hideStatus;

  console.log(hideStatus, 'djfsdfskfdsshdfks');

  const upcominDetails = route?.params?.navigate_data;
  const event_id = route?.params?.event_id;

  const hidingData = route?.params?.upcommingEvent;
  console.log(hidingData, 'fhjkashdfjashdjkfhsjkfhks');

  const id =
    route?.params?.navigate_data?.id ||
    route?.params?.navigate_data?.arrival_id;

  console.log(upcominDetails, 'service details of the data');

  const {selectedImage, title} = route.params || {};

  const headerTitle = useTranslate('Details'); // Translated title
  const bookNowText = useTranslate('BOOK NOW');
  const loginPrompt = useTranslate('Login First Before Booking');

  useEffect(() => {
    if (categoryType == false) {
      itemDetails();
    } else if (categoryType == true) {
      getCategoryDetails();
    } else if (categoryType == 'banner') {
      getBannerDetails();
    } else if (categoryType == 'appoint') {
      getAppointmentDetails();
    } else if (categoryType == 'upcomingEvnt') {
      fetchhandleDetails();
    }
    // else if (categoryType == "dashboardDetails") {
    //   fetchRelatedCategories();
    // }
  }, [getBannerDetails, categoryType]);

  //
  //techniques
  // const fetchRelatedCategories = async () => {
  //   try {
  //     const response = await getRelatedTechnique({
  //       technique_id: upcominDetails?.id,
  //     });
  //     if (response) {
  //       setDetails(response?.data);
  //       console.log(response, "responseo of the dta");
  //     }
  //   } catch (error) {
  //     console.log(error, "erooro d dhfksjh");
  //   }
  // };
  //

  const fetchhandleDetails = async () => {
    try {
      const response = await upcomingDetails({
        event_id,
      });
      if (response) {
        console.log(response, 'response of the upcoming');

        setDetails(response?.data);
      }
    } catch (error) {
      console.log(error, 'error details');
    }
  };

  const itemDetails = async () => {
    console.log({item_id: id}, 'sjhdfjkahsdkfhashdf');

    const response = await getItemDetails({item_id: id});
    if (response) {
      setDetails(response?.data);
      console.log(response, 'detials sjdhfkashdkahsf');
    }
  };

  const getCategoryDetails = async () => {
    try {
      const response = await categoryDetails({technique_item_id: id});
      if (response) {
        setDetails(response?.data);
        console.log(response, 'Sk getCategoryDetails');
      }
    } catch (error) {
      console.log(error, 'hello user data');
    }
  };

  const getBannerDetails = async () => {
    try {
      const response = await arrivalDetails({arrival_id: id});
      if (response) {
        setDetails(response?.data);
        console.log(response, 'Sk getBannerDetails');
      }
    } catch (error) {
      console.log(error, 'hello error');
    }
  };

  const getAppointmentDetails = async () => {
    try {
      const response = await detailsAppoint({id: id});
      if (response) {
        setDetails(response?.data);
        console.log(response, 'Sk getAppointmentDetails');
      }
    } catch (error) {
      console.log(error, 'hello users details');
    }
  };

  const handleLogout = () => {
    setModalVisible(false);
    dispatch(clearUser());
    // navigation.navigate('Login');
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  return (
    <View style={{height: height}}>
      <TopHeader
        title={useTranslate(
          Details?.name ||
            Details?.Title ||
            upcominDetails?.Title ||
            upcominDetails?.name,
        )?.slice(0, 25)}
        showBack={true}
        transparent={false}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <Image
            source={{
              uri:
                Details?.images ||
                Details?.Image ||
                Details?.image ||
                upcominDetails?.image,
            }}
            style={styles.headerImage}
          />
          <View style={styles.overlay}>
            {/* <Text style={styles.headerText}>
              {useTranslate(
                Details?.name ||
                  Details?.Title ||
                  upcominDetails?.Title ||
                  upcominDetails?.name,
              )}
            </Text> */}
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <View style={styles.rowContainer}>
            <Text style={styles.sectionTitle}></Text>
            {categoryType !== 'banner' && value !== false ? (
              <TouchableOpacity style={styles.bookNowButton}>
                <Text
                  style={styles.bookNowText}
                  onPress={() => {
                    if (guestType) {
                      setModalVisible(true);
                    } else {
                      navigation?.navigate('Calendars', {
                        hideStatus: hideStatus,
                        price: Details?.price || dataPrice?.price,
                        image:
                          Details?.images ||
                          Details?.Image ||
                          upcominDetails?.image,
                        id:
                          Details?.arrival_id ??
                          Details?.id ??
                          upcominDetails?.id,
                        event_id: event_id,

                        name:
                          Details?.name ||
                          Details?.Title ||
                          upcominDetails?.Title ||
                          upcominDetails?.name,
                      });
                    }
                  }}>
                  {bookNowText} {/* Translated Book Now Text */}
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>
          <View style={{maxHeight: height / 4}}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled={true}>
              <Text style={styles.sectionDescription}>
                {useTranslate(
                  Details?.description ||
                    Details?.Description ||
                    upcominDetails?.Description ||
                    upcominDetails?.description,
                )}
              </Text>
            </ScrollView>
          </View>

          <View style={styles.pointsContainer}>
            {useTranslate('Section')} : {useTranslate(Details?.sector)}
          </View>

          {categoryType !== 'banner' && value !== false ? (
            <View
              style={[
                styles.priceContainer,
                {
                  width: 150, // Keep the width consistent
                  borderRadius: 12, // Rounded corners
                  paddingVertical: 8, // Vertical padding for spacing
                  paddingHorizontal: 16, // Horizontal padding for better spacing
                  shadowColor: '#000', // Light shadow for subtle depth
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 2, // Slight shadow for Android
                },
              ]}>
              <Text
                style={[
                  styles.sectionDescription,
                  {
                    fontWeight: 'bold',
                    fontSize: 18,
                    color: '#333', // Darker text for better contrast
                    textAlign: 'center', // Center the text
                  },
                ]}>
                {useTranslate('Price')} : ₹
                {useTranslate(Details?.price || dataPrice?.price || '0')}
              </Text>
            </View>
          ) : null}
          {hidingData == 'hide' && (
            <>
              <Text style={[styles.sectionDescription, {fontWeight: '600'}]}>
                {useTranslate('Date ')} :{' '}
                {useTranslate(
                  Details?.date || Details?.date || dataPrice?.date,
                )}
              </Text>
              <Text style={{fontWeight: '600', color: 'black'}}>
                {useTranslate('Time ')} :{' '}
                {useTranslate(
                  Details?.time || Details?.time || dataPrice?.time,
                )}
              </Text>
            </>
          )}
        </View>
      </ScrollView>

      <AuthModal
        visible={isModalVisible}
        title={loginPrompt} // Translated login prompt
        onConfirm={handleLogout}
        onCancel={handleCancel}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    // position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: 300,
    // resizeMode: 'contain',
    // marginTop: -5,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    // backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingVertical: 20,
    alignItems: 'flex-end',
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 20,
  },
  iconContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 15,
  },
  sectionContainer: {
    padding: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  bookNowButton: {
    // backgroundColor: "#E18A5E",
    backgroundColor: '#E18A5E',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  bookNowText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  pointsContainer: {
    marginTop: 10,
  },
  point: {
    fontSize: 16,
    marginBottom: 5,
  },
  moreImagesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 20,
  },
  moreImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    margin: 10,
  },
  backButton: {
    alignSelf: 'center',
    marginVertical: 20,
  },
  sectionDescription: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
    marginVertical: 10,
    textAlign: 'left',
    fontWeight: '600',
  },
  priceContainer: {
    padding: 10, // Adjust the padding as needed
    borderRadius: 5, // Optional: add border radius for rounded corners
  },
});

export default ServiceDetails;
