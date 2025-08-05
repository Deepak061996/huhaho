import React from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";
import { imageBase } from "../config/Constent";

const Images = ({ image }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  image: {
    width: Dimensions.get("screen").width / 5.2,
    height: 80,
    borderRadius: 10,
    // borderRadius: 80,
  },
});

export default Images;
