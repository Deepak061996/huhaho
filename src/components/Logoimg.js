import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const Logoimg = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo2.png')} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 100, // Adjust as per need
    height: 50, // Adjust as per need
    resizeMode: 'contain',
  },
});

export default Logoimg;
