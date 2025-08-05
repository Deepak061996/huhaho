import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const ProgramItem = ({ subtitle, image }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image source={image} style={styles.image} />
      </View>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "22%", 
    alignItems: "center",
    margin: 8,
  },
  // 
  image: {
    width: 50,
    height: 50,
    
  },
  subtitle: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 5,
  },
});

export default ProgramItem;
