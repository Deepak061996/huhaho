import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import useCommon from "../hooks/useCommon";
import Loader from "./Loader";
import { useTranslate } from "../hooks/useTranslate";
import { translateText } from "../utils/translate";
import { useSelector } from "react-redux";
const { width, height } = Dimensions.get("window");

const isSmallScreen = width < 400;
const services = [
  { id: "1", name: "Consultation", icon: "account-group-outline" },
  { id: "2", name: "Therapy", icon: "face-woman-outline" },
  { id: "3", name: "Cosmetic", icon: "lipstick" },
  { id: "4", name: "Cultural Corridor", icon: "account-group" },
  { id: "5", name: "Other", icon: "apps" },
  { id: "6", name: "games", icon: "gamepad-variant-outline" },
  { id: "7", name: "business", icon: "google-my-business" },
];

const Services = () => {
  const navigation = useNavigation();
  const { serviceCategoryData, isLoading } = useCommon();
  const [serviceCategoryList, setCategoryList] = useState([]);
  const [translatedNames, setTranslatedNames] = useState({});
  const language = useSelector((state) => state.language.code);

  const serviceTranslate = useTranslate("Services");

  useEffect(() => {
    if (serviceCategoryData?.data) {
      const categories = serviceCategoryData.data;
      setCategoryList(categories);

      if (language !== "en") {
        categories.forEach(async (item) => {
          const translated = await translateText(item.service_name, language);
          setTranslatedNames((prev) => ({
            ...prev,
            [item.service_name]: translated,
          }));
        });
      } else {
        // reset if switching back to English
        setTranslatedNames({});
      }
    }
  }, [serviceCategoryData, language]);

  const swapServices = (list) => {
    const newList = [...list];
  
    const indexA = newList.findIndex(item => item.service_name === "Activity Arena");
    const indexB = newList.findIndex(item => item.service_name === "Cultural_Coridor");
  
    // If both items are found, swap them
    if (indexA !== -1 && indexB !== -1) {
      const temp = newList[indexA];
      newList[indexA] = newList[indexB];
      newList[indexB] = temp;
    }
  
    return newList;
  };
  
  const sortedServiceCategoryList = swapServices(serviceCategoryList);

  console.log("Services",sortedServiceCategoryList);
  

  return (
    <View style={styles.container}>
      <Text style={[styles.title]}>{serviceTranslate}</Text>

      {/* <Loader visible={isLoading} /> */}
      <FlatList
        data={sortedServiceCategoryList}
        horizontal
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ margin: 5 }}
        renderItem={({ item, index }) => {
          const iconName = services[index]?.icon || "apps";
          const nameToDisplay =
            item.service_name === "Cultural_Coridor"
              ? "Cultural Corridor"
              : language === "en"
              ? item.service_name
              : translatedNames[item.service_name] || item.service_name;

          return (
            <View
              style={{
                marginBottom: 20,
                // backgroundColor: 'red',
                width: Dimensions.get("screen").width / 4,
              
                alignItems: "center", // <- Center everything inside
              }}
            >
              <TouchableOpacity
                style={[styles.serviceItem]}
                onPress={() =>
                  navigation.navigate("ServiceCopy", {
                    service: item,
                    hideStatus:
                      item.service_name === "Consultation" ? true : false,
                  })
                }
              >
                <View
                  style={{
                    // backgroundColor: "#E18A5E",
                    // backgroundColor: "#FF914D",
                    width: 80,
                    height: 80,
                    borderRadius: 10,
                    // resizeMode: "contein",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 30,
                    // marginRight: 10,
                  }}
                >
                  {item.service_name === "Consultation" ? (
                    <Image
                      source={require("../assets/raj3.jpeg")}
                      style={{
                        width: 80,
                        height: 80,
                        resizeMode: "contein",
                        borderRadius: 10,
                      }}
                    />
                  ) : item.service_name === "Therapy" ? (
                    <Image
                      source={require("../assets/raj4.jpeg")}
                      style={{
                        width: 80,
                        height: 80,
                        resizeMode: "contein",
                        borderRadius: 10,
                      }}
                    />
                  ) : item.service_name === "Cosmetic Treatment" ? (
                    <Image
                      source={require("../assets/raj2.jpeg")}
                      style={{
                        width: 80,
                        height: 80,
                        resizeMode: "contein",
                        borderRadius: 10,
                      }}
                    />
                  ) : item.service_name === "Cultural_Coridor" ? (
                    <Image
                      source={require("../assets/raj1.jpeg")}
                      style={{
                        width: 80,
                        height: 80,
                        resizeMode: "contein",
                        borderRadius: 10,
                      }}
                    />
                  ) : item.service_name === "Activity Arena" ? (
                    <Image
                      source={require("../assets/activityarena.jpg")}
                      style={{
                        marginTop: 7,
                        width: 80,
                        height: 80,
                        borderRadius: 10,
                        resizeMode: "contein",
                      }}
                    />
                  ) : (
                    <Image
                      source={require("../assets/activityarena.jpg")}
                      style={{
                        marginTop: 7,
                        width: 80,
                        height: 80,
                        resizeMode: "contein",
                        borderRadius: 10,
                      }}
                    />
                  )}
                </View>
              </TouchableOpacity>
              <View
                style={{
                  // width: isSmallScreen ? 110 : 95,
                  // marginRight: 8,
                  alignItems: "center",
                  marginTop: 5
                  // paddingLeft: 10,

                }}
              >
                <Text
                  style={[
                    styles.serviceText,
                    // {
                    //   marginLeft:
                    //     item.service_name === "Cultural_Coridor" ||
                    //     item.service_name === "Cosmetic Treatment"
                    //       ? 15
                    //       : isSmallScreen
                    //       ? -25
                    //       : 0,
                    // },
                    // {fontFamily:'roboto_condensed-regular'}
                  ]}
                >
                  {nameToDisplay}
                </Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

  width: Dimensions.get("screen").width,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    paddingLeft: 15,
    paddingTop: 5,
  },
  serviceItem: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
   // fontFamily: 'roboto_condensed-regular',  // 👈 Add this line
    // marginBottom: 5,
    // marginRight: 20,
  },
  serviceText: {
    marginTop: 5,
    fontSize: 12,
    color: "black",
    alignItems: "center",
    textAlign:'center'
  },
});

export default Services;
