import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  Modal,
  TouchableOpacity,
  ScrollView,
  Linking,
  Dimensions,
  Alert,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import Events from '../../components/Events';
import Services from '../../components/Services';
// import CustomCarousel from '../../components/Carousel';
import BorderedImage from '../../components/BorderdImage';
import Techniques from '../../components/Techniques';
// import Header from "./Header";
import Gallery from '../../components/Gallery';
import Testinomial from '../../components/Testinomial';
import Award from '../../components/Award';
import Podcast from '../../components/Podcast';
import Iconss from 'react-native-vector-icons/AntDesign';

import Icons from 'react-native-vector-icons/Ionicons';
import BookingAppointment from '../../components/BookingAppointment';
import useCommon from '../../hooks/useCommon';
import {imageBase} from '../../config/Constent';
import {useTranslate} from '../../hooks/useTranslate';
import {useDispatch, useSelector} from 'react-redux';
import useDetails from '../../hooks/useDetail';
import {clearUser} from '../../store/slices/userSlices';

// const screenWidth = Dimensions.get('window').width;
// const itemWidth = screenWidth / 3;

const screenWidth = Dimensions.get('window').width;
const numItemsPerScreen = 3;
const horizontalPadding = 16 * 2; // same as contentContainerStyle
const itemSpacing = 12 * (numItemsPerScreen - 1); // same as ItemSeparatorComponent

const itemWidth =
  (screenWidth - horizontalPadding - itemSpacing) / numItemsPerScreen;

const Dashboard = ({navigation}) => {
  const {userInfo} = useSelector(({user}) => user);
  console.log(userInfo, 'sdfkhaskdfhkjsadgjksdfjsdk');
  const dispatch = useDispatch();
  const {getDataList} = useCommon();
  const guestType = useSelector(state => state?.user?.userTypeGuest);
  console.log(guestType, 'guest type******');

  const {keeploginOut, getApointmentList} = useDetails();
  const [selectedImage, setSelectedImage] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const flatListRef = useRef(null);

  const [booking_appoint, setBookingAppointment] = useState([]);
  console.log(booking_appoint.length, 'SDFASFDSDFSDFSF');

  const navigateDash = useSelector(state => state?.user?.navigateDash);

  const appointmentRef = useRef(null);

  const screenWidth = Dimensions.get('window').width;

  const upcomingEventsText = useTranslate('Upcoming Events');




  const [allData, setAllData] = useState({
    gallery: [],
    testimonial: [],
    award: [],
    video: [],
    podcast: [],
    events: [],
    techniques: [],
    booking_appoint: [],
  });
  useEffect(() => {
    if (guestType == false) {
      checkUserStatus();
    }
  }, [guestType, userInfo?.data?.id]);

  useEffect(() => {
    if (guestType && navigateDash) {
      navigation.navigate('DashboardTabs', {
        screen: 'Connection',
      });
    }
  }, [guestType]);
  useEffect(() => {
    if (getDataList) {
      setAllData({
        gallery: getDataList.gallery || [],
        testimonial: getDataList.testimonial || [],
        award: getDataList.award || [],
        video: getDataList.video || [],
        podcast: getDataList.podcast || [],
        events: getDataList?.events || [],
        techniques: getDataList?.techniques || [],
        booking_appoint: getDataList?.booking_appoint || [],
      });
    }
  }, [getDataList]);

  const [scrollPosition, setScrollPosition] = useState(0);
  const ITEM_WIDTH = 250; // Adjust based on your item/card width + margin

  // useEffect(() => {
  //   if (modalVisible) {
  //     setTimeout(() => {
  //       flatListRef.current?.scrollToOffset({ offset: 0, animated: false });
  //       setCurrentIndex(0);
  //     }, 0); // slight delay ensures it works
  //   }
  // }, [modalVisible]);

  useEffect(() => {
    if (modalVisible) {
      const timer = setTimeout(() => {
        flatListRef.current?.scrollToOffset({ offset: 0, animated: false });
        setCurrentIndex(0);
      }, 100); // Delay ensures FlatList is mounted
      return () => clearTimeout(timer); // cleanup
    }
  }, [modalVisible]);
  

  const scrollRight = () => {
    const newOffset = scrollPosition + ITEM_WIDTH;
    appointmentRef.current?.scrollToOffset({
      offset: newOffset,
      animated: true,
    });
    setScrollPosition(newOffset);
  };

  // Function to open image modal
  const openImageModal = image => {
    console.log(image, 'hello user data');
    setSelectedImage(image);
    setModalVisible(true);
  };

  // Function to close image modal
  const closeImageModal = () => {
    setModalVisible(false);
    setSelectedImage([]);
  };

  const checkUserStatus = async () => {
    if (!userInfo?.data?.id) {
      console.log('User ID is not available. Cannot make the API call.');
      return; // Stop if user ID is undefined
    }

    console.log(userInfo?.data?.id, 'payload of this data');

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
                  dispatch(clearUser());
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

  useEffect(() => {
    const fetchAppointmentList = async () => {
      try {
        const response = await getApointmentList({
          user_id: userInfo?.data?.id,
        });
        if (response) {
          console.log(response?.data, 'appointntlist****');
          setBookingAppointment(response?.data);
        }
      } catch (error) {
        console.error('Failed to fetch appointment list:', error);
      }
    };

    fetchAppointmentList();
  }, []);

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{flex: 1, paddingBottom: 20}}>
        <Services />
        <BorderedImage />

        {/* Upcoming Events Section */}
        {allData?.events?.length !== 0 ? (
        <>
          <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 10,
            alignItems: 'center',
            marginBottom: 30,
            marginTop: -50,
          }}>
          <Text style={[styles.sectionTitle,{marginLeft: 3}]}>
            {upcomingEventsText}
          </Text>
        </View>
        <FlatList
          data={allData?.events}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ServiceDetails', {
                  categoryType: 'upcomingEvnt',
                  event_id: item?.id,
                  upcommingEvent: 'hide',
                })
              }
              style={{marginLeft: 10}}>
              <Events
                image={item.event_image}
                date={item?.date}
                completeData={item}
              />
            </TouchableOpacity>
          )}
        />
   </>
        ) : null}
    
        <View style={{marginTop: -5}}>
          <Techniques data={allData?.techniques} />
        </View>

        <View style={{top: 30}}></View>
        {/* my appointment */}
        {booking_appoint?.length !== 0 ? (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
              alignItems: 'center',
              marginBottom: 40,
              marginTop: -5,
            }}>
            <Text style={styles.sectionTitle}>My Appointment</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Appointment')}>
              <Text style={[styles.viewAll, {marginRight: 10}]}>View All</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{marginTop: 30}}></View>
        )}

        {booking_appoint?.length !== 0 ? (
          <View style={styles.listContainer}>
            <FlatList
              ref={appointmentRef}
              data={booking_appoint}
              horizontal
              keyExtractor={item => item.id}
              showsHorizontalScrollIndicator={false}
              onScroll={event => {
                const offsetX = event.nativeEvent.contentOffset.x;
                setScrollPosition(offsetX);
              }}
              scrollEventThrottle={16}
              contentContainerStyle={{paddingRight: 50}}
              renderItem={({item}) => (
                <BookingAppointment
                  image={item.image}
                  title={item.service_name}
                  date={item.booking_time}
                  // clinic={'At XX Clinic'}
                />
              )}
            />
            <TouchableOpacity
              style={styles.arrowButton}
              onPress={() => scrollRight(appointmentRef)}>
              <Iconss name="arrowright" size={24} color="white" />
            </TouchableOpacity>
          </View>
        ) : null}

        {/* Gallery Section */}

        <View
          style={{
            width: Dimensions.get('screen').width, }}>
          <View style={[styles.sectionHeader, {marginTop: -70}]}>
            <Text style={[styles.sectionTitle, {marginLeft: 3}]}>
              {useTranslate('Gallery')}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Gallery')}>
              <Text style={[styles.viewAll, {marginRight: 10}]}>
                {useTranslate('View All')}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{}}>
            <FlatList
              data={allData?.gallery}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{marginLeft: 5}}
              keyExtractor={item => item.id?.toString()}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => {
                    console.log('image_path:', item.image_path);
                    setSelectedImage(item.image_path);
                    setModalVisible(true);
                  }}>
                  <Gallery image={item?.image_path} Descp={item.description} />
                </TouchableOpacity>
              )}
            />
          </View>
          <Modal visible={modalVisible} transparent animationType="fade">
            <View style={styles.modalContainer}>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={closeImageModal}>
                <Icon name="times-circle" size={35} color="white" />
              </TouchableOpacity>
                {/* <FlatList
                  data={selectedImage}
                  keyExtractor={(_, index) => index.toString()}
                  horizontal
                  pagingEnabled
                  showsHorizontalScrollIndicator={false}
                  onScroll={e => {
                    // const index = Math.round(e.nativeEvent.contentOffset.x / screenWidth);
                    // setCurrentIndex(index);
                    const offsetX = e.nativeEvent.contentOffset.x;
                  
                    const index = Math.round(offsetX / screenWidth); // ✅ Correct way
                    setCurrentIndex(index);
                  }}
                  scrollEventThrottle={16}
                  renderItem={({ item }) => (
                    <Image
                      source={{ uri: item }}
                      style={styles.fullImage}
                      resizeMode="contain"
                    />
                  )}
                /> */}
                <Image
                  source={{ uri: selectedImage }}
                  style={styles.fullImage}
                  resizeMode="contain"
                />
                  {/* Dot Indicator */}
                 {/* <View style={styles.dotContainer}>
          {selectedImage.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === currentIndex ? styles.activeDot : null,
              ]}
            />
          ))}
                </View> */}
            </View>
          </Modal>
        </View>
        <View style={[styles.sectionHeader, {marginTop: 0}]}>
          <Text style={[styles.sectionTitle, {marginLeft: 3}]}>
            {useTranslate('Testimonials')}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('TestimonialView')}>
            <Text style={[styles.viewAll, {marginRight: 10}]}>
              {useTranslate('View All')}
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={allData?.testimonial}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          contentContainerStyle={{marginLeft: 5}}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => Linking.openURL(item.video_url)}>
              <Gallery
                image={item.testimonial_image}
                // Descp={item.description}
              />
            </TouchableOpacity>
          )}
        />

        {/* Awards Section */}
        <View style={[styles.sectionHeader, {marginTop: 0}]}>
          <Text style={[styles.sectionTitle, {marginLeft: 5}]}>
            {useTranslate('Awards')}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('AwardsView')}>
            <Text style={[styles.viewAll, {marginRight: 10}]}>
              {useTranslate('View All')}
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={allData?.award}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          contentContainerStyle={{marginLeft: 5}}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => openImageModal(item.image_path)}>
              <Gallery
                image={item.image_path}
                Descp={item.description}
                desc={true}
              />
            </TouchableOpacity>
          )}
        />

        <View style={[styles.sectionHeader, {marginTop: -15}]}>
          <Text style={[styles.sectionTitle]}>{useTranslate('Videos')}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Videos')}>
            <Text style={[styles.viewAll, {marginRight: 10}]}>
              {useTranslate('View All')}
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={allData?.video}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          contentContainerStyle={{marginLeft: 5}}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => Linking.openURL(item.video_url)}>
              <Gallery
                image={item.video_thumbnail_image}
                // Descp={item.description}
                desc={false}
              />
            </TouchableOpacity>
          )}
        />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{useTranslate('Podcasts')}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('PodCasts')}>
            <Text style={[styles.viewAll, {marginRight: 10}]}>
              {useTranslate('View All')}
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={allData?.podcast}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              disabled={!item.podcast_url || !item.title}
              onPress={() => Linking.openURL(item.podcast_url)}>
              <Podcast title={item.title} image={item.image} dashBaord={true} />
            </TouchableOpacity>
          )}
        />
      </View>
    </ScrollView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center',
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    // fontWeight: "bold",
    marginLeft: 10,
    top: 20,
   // fontFamily: 'roboto_condensed-regular',  // 👈 Add this line
    
  },
  viewAll: {
    fontSize: 14,
    color: 'black',
    textDecorationLine: 'underline',
    top: 20,
  },
  videoImage: {
    height: 200,
    width: 370,
    borderRadius: 20,
    alignSelf: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullImage: {
    // width: '90%',
    // height: '80%',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 999, // ✅ ensures it's above other views
  },
  videoImage: {
    height: 200,
    width: 370,
    borderRadius: 20,
    alignSelf: 'center',
  },
  playIconContainer: {
    position: 'absolute',
    bottom: 10,
    right: 50,
  },
  containerimage: {
    position: 'relative',
  },
  arrowButton: {
    backgroundColor: '#E18A5E',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 350,
    top: -80,
  },
  dotContainer: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  dot: {
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: 'gray',
    marginHorizontal: 4,
  },
  
  activeDot: {
    backgroundColor: '#E18A5E',
    width: 10,
    height: 10,
  },
});
