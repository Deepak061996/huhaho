import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useTranslate } from "../hooks/useTranslate";

const Other = ({ image, title }) => {
  const translatedTitle = useTranslate(title);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.image} />
      </View>
      <Text style={styles.title}>{translatedTitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    alignItems: "center",
  },
  imageContainer: {
    position: "relative",
  },

  image: {
    width: 200,
    height: 150,
    borderRadius: 10,
  },

  arrowText: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "bold",
  },
  title: {
    fontSize: 18,
    marginTop: 8,
  },
});

export default Other;
