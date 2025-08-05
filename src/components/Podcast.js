import React from 'react';
import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';
import {useTranslate} from '../hooks/useTranslate';

const Podcast = ({title, subtitle, image, video, dashBaord}) => {
  const translatedTitle = useTranslate(title);
  console.log(title, 'faksjdfkjahskjdfhksjf');

  return (
    <View
      style={[
        styles.itemContainer,
        {
          width: dashBaord
            ? Dimensions.get('screen').width / 3.6
            : Dimensions.get('screen').width / 5.2,
          marginLeft: dashBaord ? 15 : 0,
        },
      ]}>
      <Image
        source={image ? {uri: image} : require('../assets/t3.png')}
        style={[
          styles.image,
          {
            width: dashBaord
              ? Dimensions.get('screen').width / 3.6
              : Dimensions.get('screen').width / 5.2,
            height: dashBaord ? 100 : 80,
          },
        ]}
      />
      {!video && (
        <Text style={[styles.title]} numberOfLines={2}>
          {translatedTitle}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: Dimensions.get('screen').width / 5.2,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 10,
    margin: 5,
  },
  image: {
    width: Dimensions.get('screen').width / 5.2,
    height: 80,
    borderRadius: 10,
  },
  title: {
    marginTop: 8,
    fontSize: 12,
    // fontWeight: 'bold',
    textAlign: 'center',
    // textDecorationLine: 'underline',
  },
});

export default Podcast;
