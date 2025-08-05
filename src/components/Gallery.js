import React from 'react';
import {View, Image, StyleSheet, Dimensions, Text} from 'react-native';
import {imageBase} from '../config/Constent';

const Gallery = ({image, Descp, desc}) => {
  return (
    <View style={styles.container}>
      <Image source={{uri: image}} style={styles.image} />
      {desc && (
        <Text
          style={[{
            textAlign: 'center',
            fontSize: 12,
            marginTop: 8,
          }]}>
          {Descp}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    width: Dimensions.get('screen').width / 5.2,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  image: {
    width: Dimensions.get('screen').width / 5.2,
    height: 80,
    borderRadius: 10,
    resizeMode: 'cover',
  },
});

export default Gallery;
