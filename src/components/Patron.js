import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const patron = [
  {
    id: '1',
    name: 'Mr. Pankaj Narula',
    image: require('../assets/pankaj.jpg'),
    subtitle: 'Advisor, Suzuki\nCorporation Japan',
  },
  {
    id: '2',
    name: 'Mr. Kim',
    image: require('../assets/kim.jpg'),
    subtitle: 'Former MD,\nKia India & VP,\n Ola Electric',
  },
  {
    id: '3',
    name: 'Mr. Manohar Bhat',
    image: require('../assets/mano.jpg'),
    subtitle: 'Senior Official,\nKia India,\n Automobile Veteran',
  },
];

const Patron = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <View style={styles.container}>
      <FlatList
        data={patron}
        horizontal
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedImage(item.image);
              setModalVisible(true);
            }}>
            <View style={styles.itemContainer}>
              <Image source={item.image} style={styles.image} />
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.subtitle}>{item.subtitle}11</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Full-Screen Image Modal */}
      <Modal visible={modalVisible} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          {/* Close Button Right Top Corner */}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}>
            <FontAwesome name="close" size={30} color="#fff" />
          </TouchableOpacity>

          {/* Full-Screen Image */}
          <Image
            source={selectedImage}
            style={styles.fullImage}
            resizeMode="contain"
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
  },

  itemContainer: {
    alignItems: 'center',
    marginHorizontal: 10,
    paddingBottom: 10,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 12,
    color: 'gray',
    marginTop: 4,
    textAlign: 'center',
  },

  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)', // Dark background
    justifyContent: 'center',
    alignItems: 'center',
  },

  fullImage: {
    width: '90%', // Full-screen width
    height: '80%', // Full-screen height
    resizeMode: 'contain',
  },

  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20, // Move button to right top corner
    zIndex: 10,
    padding: 10,
  },
});

export default Patron;
