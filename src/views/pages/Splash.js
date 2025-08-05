import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  Dimensions,
} from 'react-native';

const width = Dimensions.get('screen').width;

// const {width, height} = Dimensions.get('window');

const isSmallScreen = width < 400;
const Splash = () => {
  return (
    <View style={styles.container}>
       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
       <Image
        source={require('../../assets/register_logo.png')}
        style={{
          resizeMode: 'contain',
          width: isSmallScreen
            ? Dimensions.get('screen').width / 1.8
            : Dimensions.get('screen').width / 1.3,
          // width: 350,
        }}
      />
       </View>
    
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 400,
    height: 400,
    resizeMode: 'contain',
    marginBottom: 20,
    marginTop: 50,
  },
  brandText: {
    fontSize: 54,
    fontWeight: 'bold',
    color: '#4A362A',
    textAlign: 'center',
    fontFamily: 'notoserif',
    letterSpacing: 4,
  },
  subText: {
    fontSize: 16,
    color: '#4A362A',
    textAlign: 'center',
    marginTop: -5,
    letterSpacing: 1,
    fontStyle: 'normal',
    fontWeight: 'bold',
  },
  loaderContainer: {
    marginTop: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#4A362A20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registered: {
    fontSize: 30,
    position: 'absolute',
    top: -10,
    right: -8,
  },
});
