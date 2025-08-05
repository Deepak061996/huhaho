import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  Image,
  Text,
  Dimensions,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import TopHeader from '../../../components/TopHeader';
import Images from '../../../components/Images';
import useCommon from '../../../hooks/useCommon';
import {imageBase} from '../../../config/Constent';
import {useTranslate} from '../../../hooks/useTranslate';

const AwardsView = () => {
  const translatedTitle = useTranslate('Awards');
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const {getAllAward} = useCommon();
  const [awardList, setAwardList] = useState([]);

  useEffect(() => {
    if (getAllAward) {
      setAwardList(getAllAward.data || []);
    }
  }, [getAllAward]);

  const screenWidth = Dimensions.get('window').width;
  const itemMargin = 8; // adjusted for better fit
  const itemsPerRow = 4;
  const itemWidth =
    (screenWidth - itemMargin * (itemsPerRow + 1)) / itemsPerRow;

  // Render function for each item in the FlatList
  const renderItem = ({item, index}) => (
    <TouchableOpacity
      key={item.id}
      style={[
        styles.imageWrapper,
        {
          width: itemWidth,
          marginRight: (index + 1) % itemsPerRow === 0 ? 0 : itemMargin,
        },
      ]}
      onPress={() => {
        setSelectedImage(item.image_path);
        setModalVisible(true);
      }}>
      <View
        style={{
          height: itemWidth - 5,
          width: '100%',
          // borderWidth: 1,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
        }}>
        <Images
          image={item.image_path}
          style={[styles.imageStyle, {height: itemWidth - 5}]}
        />
      </View>
      <Text style={styles.descriptionText}>
        {item.description || 'No description'}
      </Text>
    </TouchableOpacity>
  );

  return (
    <>
      <TopHeader title={translatedTitle} showBack={true} />
      <FlatList
        data={awardList}
        numColumns={itemsPerRow}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.scrollViewContent}
      />

      {/* Full Screen Image Modal */}
      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}>
            <FontAwesome name="close" size={30} color="#fff" />
          </TouchableOpacity>
          <Image source={{uri: selectedImage}} style={styles.fullImage} />
        </View>
      </Modal>
    </>
  );
};

export default AwardsView;

const itemMargin = 8;
const styles = StyleSheet.create({
  scrollViewContent: {
    paddingTop: 20,
    paddingBottom: 50,
    paddingHorizontal: itemMargin,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  imageWrapper: {
    marginBottom: 16,
    borderRadius: 10,
    overflow: 'hidden',
  },
  imageStyle: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    resizeMode: 'cover',
    borderWidth: 1,
    borderColor: 'white',
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
    width: '90%',
    height: '70%',
    resizeMode: 'contain',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 10,
    borderRadius: 50,
  },
});
