import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

const TimePickerDropdown = ({onSelectTime, onClose}) => {
  const [hour, setHour] = useState('01');
  const [minute, setMinute] = useState('00');
  const [ampm, setAmPm] = useState('AM');

  const hours = Array.from({length: 12}, (_, i) =>
    (i + 1).toString().padStart(2, '0'),
  );
  const minutes = Array.from({length: 60}, (_, i) =>
    i.toString().padStart(2, '0'),
  );
  const ampmOptions = ['AM', 'PM'];

  const renderItem = (item, selected, setSelected) => (
    <TouchableOpacity
      style={[styles.item, item === selected && styles.selectedItem]}
      onPress={() => setSelected(item)}>
      <Text style={[styles.itemText, item === selected && styles.selectedText]}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.dropdownContainer}>
      {/* Heading */}
      <View style={styles.headingRow}>
        <Text style={styles.headingText}>HH</Text>
        <Text style={styles.headingText}>MM</Text>
        <Text style={styles.headingText}>AM/PM</Text>
      </View>

      {/* Pickers */}
      <View style={styles.pickerRow}>
        <FlatList
          data={hours}
          keyExtractor={item => item}
          renderItem={({item}) => renderItem(item, hour, setHour)}
          style={styles.column}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
        />
        <FlatList
          data={minutes}
          keyExtractor={item => item}
          renderItem={({item}) => renderItem(item, minute, setMinute)}
          style={styles.column}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
        />
        <FlatList
          data={ampmOptions}
          keyExtractor={item => item}
          renderItem={({item}) => renderItem(item, ampm, setAmPm)}
          style={styles.column}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
        />
      </View>

      {/* Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity onPress={onClose} style={styles.cancelBtn}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            onSelectTime(`${hour}:${minute} ${ampm}`);
            onClose();
          }}
          style={styles.okBtn}>
          <Text style={styles.buttonText}>OK</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TimePickerDropdown;
const styles = StyleSheet.create({
  dropdownContainer: {
    position: 'absolute',
    top: 40,
    left: 100,
    right: 0,
    backgroundColor: '#fff',
    padding: 16,
    elevation: 5,
    zIndex: 10,
    borderRadius: 12,
    height: 300,
    justifyContent: 'space-between',
  },
  headingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingHorizontal: 10,
  },
  headingText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#555',
    width: '30%',
    textAlign: 'center',
  },
  pickerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 180,
  },
  column: {
    width: '30%',
  },
  item: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  selectedItem: {
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
  },
  itemText: {
    fontSize: 16,
  },
  selectedText: {
    fontWeight: 'bold',
    color: '#007aff',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelBtn: {
    padding: 10,
    backgroundColor: '#ccc',
    borderRadius: 8,
    width: '48%',
    alignItems: 'center',
  },
  okBtn: {
    padding: 10,
    backgroundColor: '#E18A5E',
    borderRadius: 8,
    width: '48%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
