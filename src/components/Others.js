import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import AuthModal from "./AuthModal";
import Constent from "../config/Constent";


const Others = ({ title, image }) => {
  const navigation = useNavigation();
  const dataType = Constent.userType;
  const [isModalVisible, setModalVisible] = useState(false);

  const handleLogout = () => {
    // Handle the log out logic here
    console.log('Logged out!');
    setModalVisible(false);
    navigation.navigate('Login')
  };



  const handleCancel = () => {
    // Close the modal
    setModalVisible(false);
  };
  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image source={image} style={styles.image} />

        {/* Overlay Text for Title */}
        <View style={styles.overlay}>
          <Text style={styles.overlayText}>{title?.toUpperCase() || ""}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (dataType == 'guest') {
            setModalVisible(true)
          } else {
            navigation.navigate("ServiceDetails", { selectedImage: image, title })
          }

        }}
      >

        <Text style={styles.buttonText} >BOOK NOW</Text>
      </TouchableOpacity>

      <AuthModal

        visible={isModalVisible}
        title="Login First Before Booking"
        onConfirm={handleLogout}
        onCancel={handleCancel}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginHorizontal: 8,
  },
  imageWrapper: {
    position: "relative",
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  overlay: {
    position: "absolute",
    bottom: 10,
    left: 10,
    backgroundColor: "#E18A5E",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  overlayText: {
    color: "#000",
    fontWeight: "bold",
  },
  button: {
    marginTop: 10,
    backgroundColor: "#E18A5E",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
  },
});

export default Others;
