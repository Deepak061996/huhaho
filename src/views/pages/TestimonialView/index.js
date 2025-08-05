import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {useTranslate} from '../../../hooks/useTranslate';
import {SafeAreaView} from 'react-native-safe-area-context';
import TopHeader from '../../../components/TopHeader';
import useCommon from '../../../hooks/useCommon';
import {imageBase} from '../../../config/Constent';
import Podcast from '../../../components/Podcast';

const TestimonialView = () => {
  const [videoList, setVideoList] = useState([]);
  const testView = useTranslate('Testimonials');
  const {getAllTestimonal} = useCommon();

  useEffect(() => {
    if (getAllTestimonal?.data) {
      setVideoList(getAllTestimonal.data);
    }
  }, [getAllTestimonal]);

  return (
    <>
      <TopHeader title={testView} showBack={true} />
      <FlatList
        data={videoList}
        keyExtractor={(item, index) => index.toString()}
        numColumns={4}
        contentContainerStyle={styles.flatListContainer}
        columnWrapperStyle={styles.row}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => Linking.openURL(item?.video_url)}>
            <Podcast
              title={item.UserName}
              image={item.testimonial_image}
              video={true}
            />
          </TouchableOpacity>
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({
  flatListContainer: {
    padding: 16,
    paddingBottom: 30,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
});

export default TestimonialView;
