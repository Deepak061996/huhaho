import React, {useEffect, useRef,useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
  Image,
  Dimensions,
  FlatList
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import TopHeader from '../../../components/TopHeader';
import useCommon from '../../../hooks/useCommon';
import {imageBase} from '../../../config/Constent';
import {useTranslate} from '../../../hooks/useTranslate';
import Images from '../../../components/Images';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [imageData, setImageData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const {getGallery} = useCommon();
  const translatedText = useTranslate('Gallery');
  const flatListRef = useRef(null);

  useEffect(() => {
    if (modalVisible) {
      setTimeout(() => {
        flatListRef.current?.scrollToOffset({ offset: 0, animated: false });
        setCurrentIndex(0);
      }, 0); // slight delay ensures it works
    }
  }, [modalVisible]);

  useEffect(() => {
    if (getGallery) setImageData(getGallery?.data || []);
  }, [getGallery]);

  return (
    <>
      <TopHeader title={translatedText} showBack={true} />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
        <View style={styles.gridContainer}>
          {imageData?.map(item => (
           
            <TouchableOpacity
              key={item.id}
              style={styles.imageWrapper}
              onPress={() => {
                setSelectedImage(item.image_path);
                setModalVisible(true);
              }}>
              <Images image={item.image_path} style={styles.image} />
              {/* <Text style={styles.descriptionText}>
                {item?.description || 'No description'}
              </Text> */}
            </TouchableOpacity>
          
          ))}
        </View>
      </ScrollView>

      {/* Full Screen Image Modal */}
      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}>
            <FontAwesome name="close" size={30} color="#fff" />
          </TouchableOpacity>
          {/* <Image source={{uri: selectedImage}} style={styles.fullImage} /> */}
    
                {/* <FlatList
                  data={selectedImage}
                  keyExtractor={(_, index) => index.toString()}
                  horizontal
                  pagingEnabled
                  showsHorizontalScrollIndicator={false}
                  onScroll={e => {
                    const index = Math.round(e.nativeEvent.contentOffset.x / screenWidth);
                    setCurrentIndex(index);
                  }}
                  scrollEventThrottle={16}
                  renderItem={({ item }) => (
                    <Image
                      source={{ uri: item }}
                      style={styles.fullImage}
                      resizeMode="contain"
                    />
                  )}
                  /> */}
                <Image
                  source={{ uri: selectedImage }}
                  style={styles.fullImage}
                  resizeMode="contain"
                />
                  {/* Dot Indicator */}
        {/* <View style={styles.dotContainer}>
          {selectedImage.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === currentIndex ? styles.activeDot : null,
              ]}
            />
          ))}
        </View> */}

        </View>
      </Modal>
    </>
  );
};

export default Gallery;

const screenWidth = Dimensions.get('window').width;
const itemMargin = 10;
const itemsPerRow = 4;
const itemWidth = (screenWidth - itemMargin * (itemsPerRow + 1)) / itemsPerRow;

const styles = StyleSheet.create({
  scroll: {
    marginTop: 20,
    paddingHorizontal: itemMargin,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  imageWrapper: {
    width: itemWidth,
    marginBottom: 16,
    borderRadius: 10,
    // backgroundColor: 'red',
  },
  image: {
    width: '100%',
    height: itemWidth,
    height: 80,
    borderRadius: 10,
  },
  descriptionText: {
    marginTop: 6,
    fontSize: 13,
    color: '#333',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullImage: {
    // width: '90%',
    // height: '70%',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    resizeMode: 'contain',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 10,
    borderRadius: 50,
    zIndex: 999, // ✅ ensures it's above other views
  },
  dotContainer: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  dot: {
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: 'gray',
    marginHorizontal: 4,
  },
  
  activeDot: {
    backgroundColor: '#E18A5E',
    width: 10,
    height: 10,
  },
});
