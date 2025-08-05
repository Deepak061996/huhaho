import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Modal,
  Image,
  Dimensions,
} from 'react-native';
import TopHeader from '../../../components/TopHeader';
import Blessing from '../../../components/Blessing';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import useCommon from '../../../hooks/useCommon';
import {useTranslate} from '../../../hooks/useTranslate';

const Panelist = ({hideHeader}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const {getPenlist, isLoading} = useCommon();
  const [blessing, setBlessing] = useState([]);

  useEffect(() => {
    if (getPenlist?.data) {
      setBlessing(getPenlist.data);
    }
  }, [getPenlist]);

  const inspirationsTxt = txt => useTranslate('Inspirations');

  return (
    <>
      {!hideHeader && <TopHeader showBack={true} title={'Panelist'} />}
      <ScrollView showsVerticalScrollIndicator={false}>
        {blessing.map((section, index) => (
          <View key={index}>
            <Text style={styles.sectionTitle}>{section.category_name}</Text>
            <FlatList
              data={section.panelists}
              keyExtractor={item => item.id.toString()}
              horizontal
              contentContainerStyle={{marginLeft: 10, marginTop: 15}}
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedImage(item.profile_img);
                    setModalVisible(true);
                  }}
                  style={styles.itemContainer}>
                  <Blessing
                    image={item.profile_img}
                    title={item.name}
                    subtitle={item.position}
                  />
                </TouchableOpacity>
              )}
            />
          </View>
        ))}

        <Modal visible={modalVisible} transparent={true} animationType="fade">
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}>
              <FontAwesome name="close" size={30} color="#fff" />
            </TouchableOpacity>
            <Image
              source={{uri: selectedImage}}
              style={styles.fullImage}
              resizeMode="contain"
            />
          </View>
        </Modal>
      </ScrollView>
    </>
  );
};

export default Panelist;

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 30,
    marginTop: 20,
  },
  itemContainer: {
    width: Dimensions.get('screen').width / 5.2, // Better for horizontal list layout
    marginHorizontal: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullImage: {
    width: '90%',
    height: '80%',
    resizeMode: 'contain',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 10,
    padding: 10,
  },
});
