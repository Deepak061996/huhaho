import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Pressable,
  Dimensions,
} from "react-native";
import Section from "../../../components/Section";

import { useNavigation } from "@react-navigation/native";
import TopHeader from "../../../components/TopHeader";
import useDetails from "../../../hooks/useDetail";
import Loader from "../../../components/Loader";
import { useTranslate } from "../../../hooks/useTranslate";

const ServiceCopy = ({ route }) => {
  const navigation = useNavigation();
  const { getServiceList, isLoading } = useDetails();
  const consultationRef = useRef(null);

  //
  const navigatedData = route.params;
  console.log(navigatedData, "navigated data");
  const types = navigatedData?.type;
  console.log(navigatedData?.service, "test****11");

  // let hederTitle = types == 'guest' ? 'Guest Explore' : 'Service';
  const hederTitle = useTranslate(
    types === "guest" ? "Guest Explore" : "Services"
  );

  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    const getCategoryList = async () => {
      const response = await getServiceList({
        service_category_id: navigatedData?.service?.id ?? 5,
      });
      if (response) {
        console.log(response.data, "service data *****");
        setDataList(response?.data);
      }
    };

    getCategoryList();
  }, []);

  return (
    <>
      <TopHeader showBack={true} title={hederTitle} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <Iconcontainer /> */}
        <Loader visible={isLoading} />

        <Text style={styles.heading}>
          {/* {useTranslate('Services')}/ */}
          {navigatedData?.service?.service_name === "Cultural_Coridor"
            ? "Cultural Corridor"
            : navigatedData?.service?.service_name}
        </Text>

        <View style={styles.listContainer}>
          <FlatList
            ref={consultationRef}
            data={dataList}
            numColumns={4}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => {
                  navigation.navigate("ServiceDetails", {
                    navigate_data: item,
                    hideStatus:
                      navigatedData?.hideStatus ||
                      navigatedData?.service?.hideStatus,
                    categoryType: false,
                    value:
                      navigatedData?.service?.service_name ===
                      "Cultural_Coridor"
                        ? false
                        : true,
                  });
                }}
                style={{ width: "25%" }} // 100 / 4 = 25%
              >
                <Section image={item.image} title={item.name} />
              </Pressable>
            )}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default ServiceCopy;

const styles = StyleSheet.create({
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "black", // matches theme color
    textAlign: "center",
    marginVertical: 15,
    textTransform: "capitalize",
    borderBottomWidth: 2,
    borderBottomColor: "black",
    paddingBottom: 5,
    alignSelf: "flex-start",
    marginLeft: 10,
  },
  listContainer: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: 'red',
    width: Dimensions.get("screen").width,
  },
  arrowButton: {
    backgroundColor: "#E18A5E",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: -30,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  fullImage: {
    width: "90%",
    height: "80%",
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 10,
    borderRadius: 20,
  },
});
