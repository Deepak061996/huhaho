import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Button,
  StatusBar,
  Platform,
} from 'react-native';
import RazorpayCheckout from 'react-native-razorpay';

import {RadioButton} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

import NoOfUser from 'react-native-vector-icons/Entypo';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {useToast} from 'react-native-toast-notifications';
import {SafeAreaView} from 'react-native-safe-area-context';

import TopHeader from '../../../components/TopHeader';
import CalendarMonth from '../../../components/CalendarMonth';
import Loader from '../../../components/Loader';
import CustomTimePicker from '../../../components/CustomTimePicker';
import {showSuccessToast} from '../../../config/Toast';
import useDetails from '../../../hooks/useDetail';
import {useTranslate} from '../../../hooks/useTranslate';
import TimePickerModal from '../../../components/TimePickerModal';
import TimePickerDropdown from '../../../components/TimePickerModal';
import SuccessPaymnt from '../../../components/SuccessPaymnt';

const Calendars = ({route}) => {
  const navigation = useNavigation();
  const toast = useToast();
  const {userInfo} = useSelector(({user}) => user);
  console.log(userInfo?.data, 'userInfo detais *******');
  const {Bookingss, isLoading, CreateOrder, verify_payment} = useDetails();

  const {price, image, id, event_id, name, hideStatus} = route?.params;
  const [selectedOption, setSelectedOption] = useState('group');
  const [selectedDate, setSelectedDate] = useState(null);
  console.log(hideStatus, 'selectedDate********');

  const [selectedTime, setSelectedTime] = useState(null);
  console.log(selectedTime, 'Selected time');
  const [noOfPeople, setNoOfpeople] = useState(null);
  const [address, setAddress] = useState(userInfo?.data?.address || '');
  const [showPicker, setShowPicker] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  useEffect(() => {
    if (hideStatus) {
      setSelectedOption('individual');
    }
  }, [hideStatus]);

  const currentDate = moment().format('DD/MM/YYYY');
  const formattedTime = selectedTime
    ? selectedTime.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })
    : 'Select Time';
  // const [modalVisible, setModalVisible] = useState(false);
  const [selectedTime1, setSelectedTime1] = useState('');

  const handleBooking = async () => {
    if (!noOfPeople && selectedOption !== 'individual') {
      showSuccessToast(toast, 'Enter number of people.');
      return;
    }
    if (!selectedTime1) {
      showSuccessToast(toast, 'Enter time.');
      return;
    }
    if (!address) {
      showSuccessToast(toast, 'Enter address.');
      return;
    }

    const formData = new FormData();
    formData.append(
      'type',
      selectedOption === 'group'
        ? '1'
        : selectedOption === 'individual'
        ? '2'
        : '3',
    );
    formData.append('user_id', userInfo?.data?.id);
    formData.append('number', selectedOption == 'individual' ? 1 : noOfPeople);
    formData.append('address', address);
    formData.append('preferred_date', selectedDate);
    formData.append('time', selectedTime1);

    if (id !== undefined) formData.append('offering_id', id);
    if (event_id !== undefined) formData.append('event_id', event_id);

    try {
      const response = await Bookingss(formData);
      if (response) {
        if (selectedOption === 'individual') {
          console.log(response?.data?.booking_id, 'response ofdhsjdfhkjasghfj');
          fetchOrderID(response?.Data?.id);

          // navigation.navigate('Billing', {id, price, selectedDate});
        } else {
          navigation.navigate('DrawerComps');
          showSuccessToast(toast, 'Quote sent to Client.');
        }
      }
    } catch (error) {
      console.error('Booking failed:', error);
      showSuccessToast(toast, 'Appointment already booked.');
    }
  };

  const handlePlaceSelect = place => {
    setAddress(place.description);
  };

  //

  const fetchOrderID = async id => {
    console.log(
      {
        amount: price,
        booking_id: id,
      },
      'order api call',
    );
    try {
      const response = await CreateOrder({
        amount: price,
        booking_id: id,
      });
      if (response) {
        console.log(response, 'respnse of create order***');
        openCheckout(
          id,
          response.order_id,
          response?.razorpay_key,
          response?.amount,
        );
      }
    } catch (error) {
      console.log(error, 'error of the api***');
    }
  };

  const openCheckout = (id, order_id, razorpay_key, amount) => {
    // Hide the status bar
    const options = {
      description: 'Credits towards consultation',
      // image: ' ',
      currency: 'INR',
      key: razorpay_key,
      amount: amount,
      // name: ' ',
      order_id: order_id,
      prefill: {
        email: userInfo?.data?.email,
        contact: userInfo?.data?.phone,
        name: userInfo?.data?.name,
      },
      theme: {color: '#E18A5E'},
    };

    RazorpayCheckout.open(options)
      .then(data => {
        // alert(`Success: ${data.razorpay_payment_id}`);
        setShowAlert(true);
        console.log(JSON.stringify(data, null, 2, 'response of rezorpay'));
        verifyPayment(
          id,
          data?.razorpay_signature,
          data?.razorpay_order_id,
          data?.razorpay_payment_id,
        );
      })
      .catch(error => {
        StatusBar.setHidden(false, 'fade'); // Show status bar again
        // alert(`Error: ${error.code} | ${error.description}`);
      });
  };

  const verifyPayment = async (id, signature, order_id, payment_id) => {
    // Ensure all values are strings
    const data = {
      booking_id: id,
      razorpay_signature: String(signature || ''),
      razorpay_payment_id: String(payment_id || ''),
      razorpay_order_id: String(order_id || ''),
    };

    console.log(data, 'verify payment ****');

    try {
      const response = await verify_payment(data);
      if (response) {
        console.log(response, 'response of the data ***********');
      }
    } catch (error) {
      console.log(error, 'error verifying the payment');
    }
  };

  return (
    <>
      <TopHeader title="Book Now" showBack={true} transparent={false} />
      <Loader visible={isLoading} />
      <ScrollView
        contentContainerStyle={{paddingBottom: 40}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image source={{uri: image}} style={styles.image} />
        </View>

        <View style={styles.radioGroup}>
          {/* {["group", "individual", "family"].map((option) => (
            <View key={option} style={styles.radioOption}>
              <RadioButton
                value={option}
                status={selectedOption === option ? "checked" : "unchecked"}
                onPress={() => setSelectedOption(option)}
                color="#E18A5E"
              />
              <Text>{option.charAt(0).toUpperCase() + option.slice(1)}</Text>
            </View>
          ))} */}

          {!hideStatus &&
            ['group', 'individual', 'family'].map(option => (
              <View key={option} style={styles.radioOption}>
                <RadioButton
                  value={option}
                  status={selectedOption === option ? 'checked' : 'unchecked'}
                  onPress={() => setSelectedOption(option)}
                  color="#E18A5E"
                />
                <Text>{option.charAt(0).toUpperCase() + option.slice(1)}</Text>
              </View>
            ))}
        </View>

        <View style={{alignItems: 'center'}}>
          {selectedOption !== 'individual' && (
            <View style={styles.row}>
              <Text style={styles.label}>No. of People</Text>
              <View style={styles.inputWithIcon}>
                <NoOfUser
                  name="users"
                  size={20}
                  color="#888"
                  style={styles.icon}
                />
                <TextInput
                  style={styles.inputText}
                  keyboardType="numeric"
                  value={noOfPeople}
                  onChangeText={text =>
                    setNoOfpeople(text.replace(/[^0-9]/g, ''))
                  }
                />
              </View>
            </View>
          )}

          <View style={styles.row}>
            <Text style={styles.label}>Address</Text>
            <View style={styles.inputWithIcon}>
              <Icon
                name="location-on"
                size={20}
                color="#888"
                style={styles.icon}
              />
              <TextInput
                style={styles.inputText}
                // placeholder="Enter address"
                placeholderTextColor="#999"
                value={address}
                onChangeText={setAddress}
              />
            </View>
          </View>

          <View style={[styles.row, {justifyContent: 'space-between'}]}>
            <Text>Time</Text>
            <View style={styles.inputWithIcon}>
              <Icon
                name="access-time-filled"
                size={20}
                color="#888"
                style={styles.icon}
              />
              <TouchableOpacity
                onPress={() => setShowPicker(prev => !prev)}
                style={[
                  styles.inputText,
                  {height: 40, justifyContent: 'center'},
                ]}>
                <Text style={{alignSelf: 'flex-start'}}>
                  {selectedTime1 ? selectedTime1 : 'Select Time'}
                </Text>
              </TouchableOpacity>
            </View>
            {showPicker && (
              <TimePickerDropdown
                onSelectTime={time => setSelectedTime1(time)}
                onClose={() => setShowPicker(false)}
              />
            )}
            {/* <CustomTimePicker onChangeTime={setSelectedTime} /> */}
          </View>
        </View>

        <View>
          {(selectedOption === 'individual' ||
            selectedOption === 'group' ||
            selectedOption === 'family') && (
            <CalendarMonth
              getDateSelect={val => {
                const formatted = `${val?.day
                  .toString()
                  .padStart(2, '0')}/${val?.month
                  .toString()
                  .padStart(2, '0')}/${val?.year}`;
                setSelectedDate(formatted);
              }}
            />
          )}

          <View style={styles.footer}>
            {selectedOption === 'individual' && (
              <View style={{alignItems: 'center'}}>
                <Text style={styles.bookingText}>Booking Price</Text>
                <Text style={styles.priceText}>Rs {price}</Text>
              </View>
            )}

            <TouchableOpacity
              onPress={() => handleBooking()}
              style={[
                styles.bookingButton,
                {marginLeft: selectedOption !== 'individual' ? 160 : 0},
              ]}>
              <Text style={styles.bookingButtonText}>
                {selectedOption === 'individual'
                  ? useTranslate('Book Now')
                  : useTranslate('Request for Quote')}
              </Text>
            </TouchableOpacity>

            {/* <TouchableOpacity
              style={[
                styles.bookingButton,
                {marginLeft: selectedOption !== 'individual' ? 160 : 0},
              ]}
              onPress={handleBooking}>
              <Text style={styles.bookingButtonText}>
                {selectedOption === 'individual'
                  ? useTranslate('Book Now')
                  : useTranslate('Request for Quote')}
              </Text>
            </TouchableOpacity> */}
          </View>
          {/* <Button title="Select Time" onPress={() => setModalVisible(true)} /> */}
        </View>
      </ScrollView>
      <SuccessPaymnt
        visible={showAlert}
        onClose={() => {
          setShowAlert(false), navigation.navigate('DrawerComps');
        }}
        message="Payment completed successfully."
        iconName="check-circle" // or "done", "verified", etc.
      />
    </>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
  },
  image: {
    width: '100%',
    height: 240,
    // resizeMode: 'contain',
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: '80%',
    top: -10,
  },
  label: {
    flex: 1,
    fontSize: 16,
    color: 'black',
    marginTop: -20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#FF914D',
    borderRadius: 18,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
    color: '#000',
    width: '100%',
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF914D',
    borderRadius: 20,
    paddingHorizontal: 12,
    width: '50%',
  },
  icon: {
    marginRight: 8,
  },
  inputText: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
  },
  bookingText: {
    fontSize: 18,
    fontWeight: '500',
    color: 'black',
  },
  priceText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#FF914D',
  },
  bookingButton: {
    backgroundColor: '#E18A5E',
    width: 180,
    height: 40,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookingButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default Calendars;
