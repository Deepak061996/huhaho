import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import { imageBase } from "../config/Constent";
import { useTranslate } from "../hooks/useTranslate";

const width = Dimensions.get("screen").width;
const Events = ({
  date,
  title,
  subtitle,
  image,
  completeData,
  name,
  showForitem,
}) => {
  console.log(JSON.stringify(completeData, null, 2), "jimsajkfdsahfk");

  const dateObj = new Date(date);

  const formatted = dateObj.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  const [month, day] = formatted.split(" ");
  const customFormatted = `${day} ${month}`;
  //
  return (
    <View
      style={[
        styles.container,
        {
          width: showForitem ? width / 5.2 : width / 3.6,
          height: showForitem ? 80 : 180,
        },
      ]}
    >
      {/* Images with date overlay */}
      <View style={[styles.imageContainer]}>
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: image }}
            style={[
              styles.image,
              {
                width: showForitem ? width / 5.2 : width / 3.6,
                height: showForitem ? 80 : 120,
              },
            ]}
          />
        </View>
        <View style={styles.dateOverlay}>
          <Text style={styles.dateText}>{customFormatted}</Text>
        </View>
      </View>

      {/* Title and Subtitle */}
      <Text style={[styles.title, { fontSize: showForitem ? 14 : 16 }]}>
        {useTranslate(
          completeData?.event_name
            ? completeData.event_name.length > 5
              ? completeData.event_name.slice(0, 5) + "..."
              : completeData.event_name
            : ""
        )}
      </Text>
      <Text style={[styles.subtitle, { fontSize: showForitem ? 10 : 12 }]}>
        {useTranslate(
          completeData?.description
            ? completeData.description.length > 10
              ? completeData.description.slice(0, 10) + "..."
              : completeData.description
            : ""
        )}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 5,
    width: Dimensions.get("screen").width / 3.6,
  },
  imageContainer: {
    flexDirection: "row", // Align images in a row
    alignItems: "center",
    justifyContent: "space-between",
    // position: 'relative',
  },

  image: {
    width: Dimensions.get("screen").width / 3.6,
    height: 120, // Adjusted height for 3 images
    borderRadius: 10,
  },
  dateOverlay: {
    position: "absolute",
    top: 0,
    left: 15,
    backgroundColor: "#E8B091",
    paddingVertical: 8,
    paddingHorizontal: 10,
    // borderRadius: 5,
    opacity: 0.8,
  },
  dateText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 10,
  },
  title: {
    fontSize: 16,
    // fontWeight: "bold",
    marginTop: 8,
    marginLeft: 10,
  },
  subtitle: {
    fontSize: 12,
    color: "gray",
    marginLeft: 10,
  },
});

export default Events;
