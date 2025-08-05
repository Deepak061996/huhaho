import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const ProgramsItem = ({subtitle, image, onPress}) => {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.imageContainer} onPress={onPress}>
        <View style={styles.imageWrapper}>
          <Image source={{uri: image}} style={styles.image} />
        </View>
      </TouchableOpacity>
      <Text style={styles.subtitle} numberOfLines={1}>{subtitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    marginBottom: 8,  // For row gap control
    maxWidth: '25%', // 100 / 5 columns = 20%
  },
  imageContainer: {
    // backgroundColor: '#E18A5E',
    // width: 80,
    // height: 80,
    borderRadius: 10,
    //padding: 10,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: Dimensions.get('screen').width / 5.2,
    height: 80,
    resizeMode: 'contain',
    borderRadius: 10,
    // tintColor: 'white',
  },
  subtitle: {
    fontSize: 12,
    textAlign: 'center',
    color: '#333',

  },
});

export default ProgramsItem;
