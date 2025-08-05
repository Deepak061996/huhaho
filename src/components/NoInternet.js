import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';

const {width, height} = Dimensions.get('window');

const NoInternet = ({resetToSplashScreen}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>No Internet</Text>
      <Text style={styles.subText}>
        Please make sure you're connected to the internet
      </Text>

      <Image
        source={require('../assets/nointernet.png')}
        style={styles.image}
      />

      <TouchableOpacity onPress={resetToSplashScreen} style={styles.button}>
        <Text style={styles.buttonText}>Try Again</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  headingText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#2b9bcc',
  },
  subText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#2b9bcc',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NoInternet;
