import React, { useState } from "react";
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, Modal } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const inspirations = [
  { id: "1", name: "Mr. Arun Malhotra", image: require("../assets/panel5.jpg"), subtitle: "Former MD, Nissan India,\n Motivational Speaker" },
  { id: "2", name: "Col. Krish Badhwar", image: require("../assets/krish.jpg"), subtitle: "Guinness World\n Record Holder" },
  { id: "3", name: "Mr. Kamal Singh Chauhan", image: require("../assets/kam.jpg"), subtitle: "Padma Shri\n Awardee" },
];

const Inspirations = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <FlatList
        data={inspirations}
        horizontal
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              setSelectedImage(item.image);
              setModalVisible(true);
            }}
          >
            <View style={styles.itemContainer}>
              <Image source={item.image} style={styles.image} />
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.subtitle}>{item.subtitle}</Text>
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
            onPress={() => setModalVisible(false)}
          >
            <FontAwesome name="close" size={30} color="#fff" />
          </TouchableOpacity>

          {/* Full-Screen Image */}
          <Image source={selectedImage} style={styles.fullImage} resizeMode="contain" />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 20,
  },
  
  itemContainer: {
    alignItems: "center",
    marginHorizontal: 10,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 8,
  },
  subtitle: {
    fontSize: 12,
    color: "gray",
    textAlign: "center",
  },

  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)', // Dark background
    justifyContent: 'center',
    alignItems: 'center',
  },

  fullImage: {
    width: '90%',  // Full-screen width
    height: '80%', // Full-screen height
    resizeMode: 'contain', // Maintain aspect ratio
  },

  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,  // Move button to right top corner
    zIndex: 10, 
    padding: 10,
  },
});

export default Inspirations;
