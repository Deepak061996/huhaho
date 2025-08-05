import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import { useTranslate } from "../hooks/useTranslate";

const Section = ({ title, image }) => {
  const translatedTitle = useTranslate(title);

  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />

      <View style={styles.textContainer}>
        <Text style={styles.title}
         numberOfLines={1}
         ellipsizeMode="tail">
          {/* {translatedTitle?.length > 10
            ? `${translatedTitle.substring(0, 10)}...`
            : translatedTitle} */}
             {translatedTitle}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("screen").width / 5.2,
    height: 100,
    marginHorizontal: 8,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "70%",
    resizeMode: "cover",
    borderRadius: 10,
  },
  textContainer: {
    width: "100%",
    height: "30%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5,
    marginTop: 5,
  },
  title: {
    fontSize: 10,
    color: "black",
    fontWeight: "600",
    textAlign: "center",
  },
});

export default Section;
