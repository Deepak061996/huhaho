import React from 'react';
import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';
import {useTranslate} from '../hooks/useTranslate';

const Blessing = ({title, subtitle, image}) => {
  return (
    <View style={styles.container}>
      {/* Image */}
      <Image source={{uri: image}} style={styles.image} />

      {/* Title and Subtitle */}
      <Text style={styles.title}>{useTranslate(title)}</Text>
      {subtitle ? (
        <Text style={styles.subtitle}>{useTranslate(subtitle)}</Text>
      ) : null}
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
  },
  image: {
    width: 70, // Smaller to fit
    height: 70,
    borderRadius: 35,
  },
  title: {
    fontSize: 12, // Smaller font
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 12, // Smaller font
    color: 'gray',
    textAlign: 'center',
    marginTop: 2,
  },
});

export default Blessing;
