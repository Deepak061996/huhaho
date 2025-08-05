import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import useCommon from '../hooks/useCommon';
import Carousel from 'react-native-reanimated-carousel';
import FastImage from 'react-native-fast-image';

const BorderdImage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigation = useNavigation();

  const {newArrivals} = useCommon();
  const [bannerData, setBannerData] = useState([]);

  const {width} = Dimensions.get('window');

  useEffect(() => {
    if (newArrivals) {
      setBannerData(newArrivals?.Data || []);
    }
  }, [newArrivals]);

  const getVisibleDots = () => {
    const total = bannerData.length;
    const maxDots = 5;

    if (total <= maxDots) {
      return bannerData.map((_, i) => i);
    }

    const start = Math.min(
      Math.max(activeIndex - Math.floor(maxDots / 2), 0),
      total - maxDots,
    );

    return Array.from({length: maxDots}, (_, i) => start + i);
  };

  return (
    <View style={styles.container}>
      {bannerData?.length > 0 && (
        <Carousel
          data={bannerData}
          width={width}
          height={220}
          autoPlay={true} //// enable autoPlay
          autoPlayInterval={4000} // scroll every 4 seconds
          loop
          scrollAnimationDuration={200}
          style={{alignSelf: 'center'}}
          pagingEnabled={true}
          onSnapToItem={index => setActiveIndex(index)}
          renderItem={({item}) => (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() =>
                navigation.navigate('ServiceDetails', {
                  navigate_data: item,
                  categoryType: 'banner',
                })
              }>
              <FastImage
                source={{uri: item?.images}}
                style={styles.banner}
                resizeMode={FastImage.resizeMode.stretch}
              />
            </TouchableOpacity>
          )}
        />
      )}

      <View style={styles.paginationContainer}>
        {getVisibleDots().map(index => (
          <View
            key={index}
            style={[
              styles.dot,
              activeIndex === index ? styles.activeDot : null,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    height: 250,
    paddingHorizontal: 20,
  },
  banner: {
    width: width - 20,
    height: 220,
    margin: 10,
    marginTop: -10,
    borderRadius: 10,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
  dot: {
    width: 15,
    height: 15,
    borderRadius: 7,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
    top: -30,
  },
  activeDot: {
    backgroundColor: '#e79e79',
  },
});

export default BorderdImage;
