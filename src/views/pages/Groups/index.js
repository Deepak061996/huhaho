import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {Calendar} from 'react-native-calendars'; // Import Calendar from react-native-calendars
import CalendarMonth from '../../../components/CalendarMonth';

const Groups = () => {
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState('Group');
  const [selectedDate, setSelectedDate] = useState(''); // Track selected date

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <Image
            source={require('../../../assets/tick.jpg')}
            style={styles.headerImage}
          />
          <View style={styles.iconContainer}>
            <Icon
              name="notifications"
              size={24}
              color="#fff"
              style={styles.icon}
            />
            <Icon name="search" size={24} color="#fff" style={styles.icon} />
            <Icon name="settings" size={24} color="#fff" style={styles.icon} />
          </View>
        </View>

        <View style={styles.campaignTag}>
          <Text style={styles.campaignText}>Satisfaction of Life</Text>
          <Text>Hospital</Text>
        </View>

        <View style={styles.optionContainer}>
          {[
            {label: 'Group', screen: 'Groups'},
            {label: 'Individual', screen: 'Individual'},
            {label: 'Family', screen: 'FamilyScreen'},
          ].map(option => (
            <TouchableOpacity
              key={option.label}
              onPress={() => {
                setSelectedOption(option.label);
                navigation.navigate(option.screen);
              }}
              style={styles.optionButton}>
              <View style={styles.radioButton}>
                {selectedOption === option.label && (
                  <View style={styles.radioSelected} />
                )}
              </View>
              <Text style={styles.optionText}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{flexDirection: 'row', gap: 20, bottom: 30}}>
          <Text style={{left: 20}}>No of People</Text>
          <Text style={{left: 20}}>11</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 10,
            gap: 30,
            top: -30,
          }}>
          <Text style={{fontSize: 15, left: 20}}> Address </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 2,
              borderColor: '#D87C56',
              padding: 10,
              height: 50,
              width: 250,
              borderRadius: 40,
              top: 10,
            }}>
            <Entypo
              name="location-pin"
              size={24}
              color="#D87C56"
              style={{marginRight: 10}}
            />
          </View>
        </View>

        <CalendarMonth />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Request for Quote</Text>
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 13,
            color: 'gray',
            textAlign: 'center',
            top: -10,
            marginHorizontal: 20,
          }}>
          <Text style={{fontWeight: 'bold', color: '#000'}}>
            Disclaimer:{'\n'}
          </Text>{' '}
          By booking this program, you acknowledge that the results depend on
          your dedication, consistency, and adherence to the guidance provided.
          This program is not a substitute for professional medical advice.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Groups;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: 300,
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
  campaignTag: {
    alignItems: 'center',
    marginVertical: 10,
    top: -80,
    right: -100,
  },
  campaignText: {
    color: 'black',
    padding: 5,
    borderRadius: 5,
    fontWeight: 'bold',
    fontSize: 20,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
    top: -40,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  radioSelected: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#000',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#D87C56',
    padding: 10,
    borderRadius: 25,
    height: 50,
    width: 220,
    alignSelf: 'center',
    top: -50,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});
