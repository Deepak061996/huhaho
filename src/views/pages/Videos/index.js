import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Linking,
} from 'react-native';
import TopHeader from '../../../components/TopHeader';
import useCommon from '../../../hooks/useCommon';
import {useTranslate} from '../../../hooks/useTranslate';
import Podcast from '../../../components/Podcast';

const {width} = Dimensions.get('window');
const numColumns = 4;
const spacing = 10;
const totalSpacing = spacing * (numColumns + 1);
const itemWidth = (width - totalSpacing) / numColumns;

const Videos = () => {
  const [videoList, setVideoList] = useState([]);
  const {getAllVideo} = useCommon();
  const translatedTxt = useTranslate('Videos');

  useEffect(() => {
    if (getAllVideo) {
      setVideoList(getAllVideo?.data);
    }
  }, [getAllVideo]);

  return (
    <>
      <TopHeader title={translatedTxt} showBack={true} />
      <FlatList
        data={videoList}
        keyExtractor={(item, index) => index.toString()}
        numColumns={numColumns}
        contentContainerStyle={styles.flatListContainer}
        columnWrapperStyle={styles.row}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => Linking.openURL(item?.video_url)}
            style={[styles.itemContainer, {width: itemWidth}]}>
            <Podcast
              title={item.video_title}
              image={item.video_thumbnail_image}
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
    paddingHorizontal: 10,
    paddingBottom: 20,
    marginTop: 20,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  itemContainer: {
    marginHorizontal: 5,
  },
});

export default Videos;
