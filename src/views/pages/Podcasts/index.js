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

const Podcasts = () => {
  const [videoList, setVideoList] = useState([]);
  const {getPodcasts} = useCommon();
  const translatedTxt = useTranslate('Podcasts');

  useEffect(() => {
    if (getPodcasts) {
      setVideoList(getPodcasts?.data);
    }
  }, [getPodcasts]);

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
            onPress={() => Linking.openURL(item?.podcast_url)}
            style={[styles.itemContainer, {width: itemWidth}]}>
            <Podcast title={item.title} image={item.image} />
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
    //justifyContent: 'space-between',
    justifyContent: 'flex-start',
    marginBottom: 15,
  },
  itemContainer: {
    marginHorizontal: 5,
  },
});

export default Podcasts;
