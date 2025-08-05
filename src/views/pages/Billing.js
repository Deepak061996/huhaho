import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet, ScrollView} from 'react-native';
import {Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {SafeAreaView} from 'react-native-safe-area-context';
// import Iconcontainer from './Iconcontainer/Index';
import {useNavigation} from '@react-navigation/native';
import TopHeader from '../../components/TopHeader';
import useDetails from '../../hooks/useDetail';
import {useSelector} from 'react-redux';
import {useToast} from 'react-native-toast-notifications';
import {showErrorToast} from '../../config/Toast';
import Loader from '../../components/Loader';

const Billing = ({route}) => {
  const navigation = useNavigation();

  const toast = useToast();
  const {payment_card_details, isLoading} = useDetails();
  const {price, id, selectedDate} = route?.params;

  //
  const selectedDateStr = String(selectedDate); // "24/03/2025"
  const [day, month, year] = selectedDateStr.split('/').map(Number);

  // Create Date object
  const convertedDate = new Date(year, month - 1, day);

  // Format to YYYY-MM-DD
  const yyyy = convertedDate.getFullYear();
  const mm = String(convertedDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const dd = String(convertedDate.getDate()).padStart(2, '0');

  const formattedDate = `${yyyy}-${mm}-${dd}`;

  console.log('Formatted Date:', formattedDate);
  //
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const {userInfo} = useSelector(({user}) => user);
  const [isDisabled, setIsDisabled] = useState(false); //
  //handle validation

  const showToastAndDisable = message => {
    console.log(message, 'askjdfkasfjkshfs');
    if (!isDisabled) {
      setIsDisabled(true);
      showErrorToast(toast, message);
      setTimeout(() => setIsDisabled(false), 2000);
    }
  };
  //
  const validateForm = () => {
    console.log('validation function cll');
    let flag = true;

    const cardNumRegex = /^\d{13,19}$/;

    if (cardName.length === 0) {
      showToastAndDisable('Enter username.');
      flag = false;
    } else if (cardNumber.length === 0) {
      showToastAndDisable('Enter card number');
      flag = false;
    } else if (!cardNumRegex.test(cardNumber)) {
      showToastAndDisable('Please enter a valid card number.');
      flag = false;
    } else if (expiry.length === 0) {
      showToastAndDisable('Enter expiry.');
      flag = false;
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
      showToastAndDisable('Expiry must be in MM/YY format.');
      flag = false;
    } else if (cvv.length === 0) {
      showToastAndDisable('Enter cvv.');
      flag = false;
    } else if (!/^\d+$/.test(cvv)) {
      showToastAndDisable('CVV must be numbers only.');
      flag = false;
    }

    return flag;
  };

  //

  const handlePayment = async () => {
    console.log('call paymemtnrn');
    if (!validateForm()) return;
    //
    const formData = new FormData();

    formData.append('user_id', userInfo?.data?.id);
    formData.append('booking_item_id', id);
    formData.append('name', cardName);
    formData.append('card_number', cardNumber);
    formData.append('expiry', expiry);
    formData.append('cvv', cvv);
    formData.append('amount', price);
    formData.append('booking_date', formattedDate);

    try {
      const response = await payment_card_details(formData);
      if (response) {
        navigation.navigate('PaymentSuccess');
        console.log('Payment Response:', response);
      }
    } catch (error) {
      console.error('Payment Error:', error);
    }
  };

  return (
    <>
      <TopHeader showBack={true} title={'Enter Card Details'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <Iconcontainer/> */}

        <View style={styles.container}>
          <Text style={styles.title}>Card</Text>
          <Text style={styles.subtitle}>Details</Text>
          <Text style={styles.stepText}>Step 2 of 3</Text>
          <Loader visible={isLoading} />
          <View style={styles.progressBar}>
            <Icon
              name="location-on"
              size={24}
              color="#E57C23"
              style={styles.activeIcon}
            />
            <View style={styles.line} />
            <Icon
              name="credit-card"
              size={24}
              color="#E57C23"
              style={styles.activeIcon}
            />
            <View style={styles.line} />
            <View style={styles.iconCircle}>
              <Icon name="local-shipping" size={24} color="#B0B0B0" />
            </View>
          </View>

          <Text style={styles.label}>Name on Card</Text>
          <TextInput
            style={styles.input}
            placeholder="Anna Katrina Marchesi"
            value={cardName}
            onChangeText={txt => setCardName(txt)}
          />

          <Text style={styles.label}>Card Number</Text>
          <TextInput
            style={styles.input}
            placeholder="0000 0000 0000 0000"
            keyboardType="numeric"
            value={cardNumber}
            maxLength={16}
            onChangeText={txt => setCardNumber(txt)}
          />

          <Text style={styles.label}>Expiry</Text>
          <TextInput
            style={styles.input}
            placeholder="MM/YY"
            // keyboardType="numeric"
            value={expiry}
            onChangeText={txt => setExpiry(txt)}
          />

          <Text style={styles.label}>CVV</Text>
          <TextInput
            style={styles.input}
            placeholder="•••"
            keyboardType="numeric"
            secureTextEntry
            value={cvv}
            maxLength={3}
            onChangeText={txt => setCvv(txt)}
          />

          <Button
            mode="contained"
            style={styles.proceedButton}
            onPress={() => handlePayment()}>
            Proceed to Pay
          </Button>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF',
    marginLeft: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  stepText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  progressBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  activeIcon: {
    backgroundColor: '#E57C23',
    borderRadius: 20,
    padding: 5,
    color: '#FFF',
  },
  line: {
    flex: 1,
    height: 2,
    backgroundColor: '#B0B0B0',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 15,
  },
  input: {
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
    height: 50,
    width: 300,
    borderColor: '#000',
    borderWidth: 1,
  },
  proceedButton: {
    marginTop: 30,
    // backgroundColor: '#E57C23',
    backgroundColor: '#E18A5E',

    borderRadius: 15,
    height: 50,
    width: 300,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  iconCircle: {
    width: 40, // Circle ka size
    height: 40,
    borderRadius: 20, // Perfect circle banane ke liye
    borderWidth: 2, // Border ka width
    borderColor: '#000', // Black border
    alignItems: 'center', // Icon ko center karne ke liye
    justifyContent: 'center', // Icon ko vertically center karne ke liye
    backgroundColor: 'transparent', // Andar koi color nhi
  },
});

export default Billing;
