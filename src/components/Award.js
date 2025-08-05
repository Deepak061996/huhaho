import React from 'react';
import {View, Image, StyleSheet, Dimensions, Text} from 'react-native';
import {imageBase} from '../config/Constent';

const Award = ({image, Descp}) => {
  return (
    <View style={styles.container}>
      <Image source={{uri: image}} style={styles.image} />

      <Text
        style={{
          textAlign: 'center',
          fontSize: 16,
          // fontWeight: "bold",
          marginTop: 8,
        }}>
        {Descp}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    // backgroundColor: 'red',
    width: Dimensions.get('screen').width / 3.6,
  },
  image: {
    width: Dimensions.get('screen').width / 3.6,
    height: 120,
    borderRadius: 10,
    resizeMode: 'cover',
    borderColor: 'gray',
    // borderWidth: 1,
  },
});

export default Award;
