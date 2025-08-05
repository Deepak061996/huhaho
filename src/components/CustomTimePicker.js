import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
const CustomTimePicker = () => {
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [meridiem, setMeridiem] = useState('AM');
  const formattedTime = () => {
    return `${hour.padStart(2, '0')}:${minute.padStart(2, '0')} ${meridiem}`;
  };
  const toggleMeridiem = () => {
    setMeridiem(meridiem === 'AM' ? 'PM' : 'AM');
  };
  return (
    <View style={styles.container}>
            {/* Time Label and Box */}     
      <View style={styles.rowContainer}>
                <Text style={styles.label}>Time</Text>     
        <View style={styles.timeBox}>
                   
          <TextInput
            value={hour}
            onChangeText={text => {
              const num = parseInt(text);
              if (!isNaN(num) && num >= 1 && num <= 12) setHour(text);
              else if (text === '') setHour('');
            }}
            maxLength={2}
            keyboardType="number-pad"
            style={styles.timeInput}
            placeholder="HH"
          />
                    <Text style={styles.colon}>:</Text>         
          <TextInput
            value={minute}
            onChangeText={text => {
              const num = parseInt(text);
              if (!isNaN(num) && num >= 0 && num <= 59) setMinute(text);
              else if (text === '') setMinute('');
            }}
            maxLength={2}
            keyboardType="number-pad"
            style={styles.timeInput}
            placeholder="MM"
          />
                   
          <TouchableOpacity
            onPress={toggleMeridiem}
            style={styles.meridiemToggle}>
                        <Text style={styles.meridiemText}>{meridiem}</Text>     
               
          </TouchableOpacity>
               
        </View>
      </View>
         
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 120,
  },
  label: {
    fontSize: 16,
    color: 'black',
    marginLeft: -20,
  },
  colon: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 6, // Reduced margin for a smaller gap
  },
  timeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF914D',
    borderRadius: 17,
    backgroundColor: 'white',
    paddingHorizontal: 6,
    width: '56%',
    paddingVertical: 2,
    height: 40, // ensures TextInputs have enough room
  },
  timeInput: {
    height: 30, // matches meridiemToggle height
    width: 40, // similar width for balance // borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8, // match meridiemToggle radius
    textAlign: 'center',
    fontSize: 14, // match meridiemText
    paddingVertical: 0,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  meridiemToggle: {
    // borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 5, // Make slightly smaller to match input height
    marginLeft: 10,
    borderColor: '#ccc',
  },
  meridiemText: {
    fontSize: 14, // Smaller text size
    // fontWeight: '50',
  },
});
export default CustomTimePicker;
