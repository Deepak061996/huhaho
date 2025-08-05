import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

import Icon from 'react-native-vector-icons/MaterialIcons';

const PaymentSuccess = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image
        style={{resizeMode: 'contain'}}
        source={require('../../assets/logo2.png')}
      />

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
        <Icon
          name="local-shipping"
          size={24}
          color="#E57C23"
          style={styles.activeIcon}
        />
      </View>

      <View style={styles.successCircle}>
        <Icon name="check" size={50} color="#FFF" />
      </View>

      <Text style={styles.title}>THANK YOU!</Text>
      <Text style={styles.subtitle}>Payment done successfully!</Text>

      <Button
        mode="contained"
        style={styles.homeButton}
        onPress={() => navigation.navigate('DrawerComps')}>
        Go to Home
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E57C23',
    marginBottom: 30,
  },
  progressBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  line: {
    flex: 1,
    height: 2,
    backgroundColor: '#B0B0B0',
    marginHorizontal: 5,
  },
  successCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E57C23',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  homeButton: {
    backgroundColor: '#E57C23',
    paddingVertical: 10,
    borderRadius: 5,
    width: '80%',
  },
  activeIcon: {
    backgroundColor: '#E57C23',
    borderRadius: 20,
    padding: 5,
    color: '#FFF',
  },
});

export default PaymentSuccess;
