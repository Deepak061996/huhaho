import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

const RequestQuoteScreen = () => {
  const [noOfPeople, setNoOfPeople] = useState('');

  return (
    <View style={{ padding: 20 }}>
      {/* No of People Input */}
      <Text style={{ fontSize: 16 }}>No. of People</Text>
      <TextInput
        style={{ borderWidth: 1, borderRadius: 5, padding: 10, marginVertical: 10 }}
        placeholder="Enter number of people"
        keyboardType="numeric"
        value={noOfPeople}
        onChangeText={setNoOfPeople}
      />

      {/* Address Input */}
      <Text style={{ fontSize: 16 }}>Address</Text>
      <TextInput style={{ borderWidth: 1, borderRadius: 5, padding: 10, marginVertical: 10 }} placeholder="Enter Address" />

      {/* Request Quote Button */}
      <TouchableOpacity style={{ backgroundColor: '#E29578', padding: 15, borderRadius: 10, alignItems: 'center' }}>
        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Request for Quote</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RequestQuoteScreen;
