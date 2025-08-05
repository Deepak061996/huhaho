// import React, { useRef } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   Image,
//   TouchableOpacity,
//   StyleSheet,
// } from "react-native";
// import Icon from "react-native-vector-icons/AntDesign";
// import { useNavigation } from "@react-navigation/native";
// import { imageBase } from "../config/Constent";
// import { useTranslate } from "../hooks/useTranslate";

// const TechniqueCard = ({ item }) => (
//   <View style={styles.card}>
//     <View style={styles.imageContainer}>
//       <Image source={{ uri: item.vector_icon }} style={styles.icon} />
//     </View>
//     <Text style={styles.title}>{item.title}</Text>
//   </View>
// );

// const Techniques = ({ data }) => {
//   const navigation = useNavigation();
//   const flatListRef = useRef(null);

//   const scrollLeft = () => {
//     flatListRef.current.scrollToOffset({ offset: 0, animated: true });
//   };

//   const scrollRight = () => {
//     flatListRef.current.scrollToEnd({ animated: true });
//   };

//   return (
//     <View style={styles.container}>
//       {/* Header with Techniques & View All */}
//       <View style={styles.header}>
//         <Text style={styles.heading}>{useTranslate("Techniques (30)")}</Text>
//         <TouchableOpacity onPress={() => navigation.navigate("AllProgram")}>
//           <Text style={styles.viewAll}>{useTranslate("View All")}</Text>
//         </TouchableOpacity>
//       </View>

//       {/* FlatList with Arrows */}
//       <View style={styles.listContainer}>
//         <TouchableOpacity onPress={scrollLeft} style={styles.arrow}>
//           <Icon name="left" size={24} color="white" />
//         </TouchableOpacity>

//         <FlatList
//           ref={flatListRef}
//           data={data}
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           keyExtractor={(item) => item.id}
//           renderItem={({ item }) => <TechniqueCard item={item} />}
//         />

//         <TouchableOpacity onPress={scrollRight} style={styles.arrow}>
//           <Icon name="right" size={24} color="white" />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { padding: 10 },
//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingHorizontal: 10,
//     alignItems: "center",
//     marginBottom: 40,
//   },
//   heading: { fontSize: 18 },
//   viewAll: {
//     fontSize: 14,
//     color: "black",
//     textDecorationLine: "underline", // Underline like in image
//   },
//   listContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   arrow: {
//     padding: 10,
//     backgroundColor: "#D4845F",
//     borderRadius: 20,
//     marginHorizontal: 5,
//     alignItems: "center",
//   },
//   card: {
//     alignItems: "center",
//     justifyContent: "flex-start", // 'center' ke jagah 'flex-start' use karo
//     marginRight: 10,
//     width: 120,
//     flexDirection: "column", // Ensure items stay in a column
//   },
//   imageContainer: {
//     width: 80,
//     height: 80,
//     backgroundColor: "#D4845F",
//     alignItems: "center",
//     justifyContent: "center",
//     borderRadius: 10,
//     marginBottom: 5, // Ensure spacing is consistent
//   },
//   icon: {
//     width: 50,
//     height: 50,
//     alignItems: "center",
//   },
//   title: { color: "#000", textAlign: "center", fontWeight: "bold" },
// });

// export default Techniques;
//

//
//{marginLeft: '-5'}
import React, { useRef } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import { useTranslate } from "../hooks/useTranslate";

const screenWidth = Dimensions.get("window").width;
const ITEM_WIDTH = screenWidth / 4 - 15; // adjust for spacing/margin

const TechniqueCard = ({ item }) => (
  <View style={[styles.card, { width: ITEM_WIDTH }]}>
    <View style={[styles.imageContainer, {}]}>
      <Image source={{ uri: item?.image }} style={[styles.icon]} />
    </View>
    <Text style={styles.title}>{useTranslate(item.name)}</Text>
  </View>
);

const Techniques = ({ data }) => {
  console.log(data, "sdfahsdfjasfdjskf");

  const navigation = useNavigation();
  const flatListRef = useRef(null);

  const length = data?.length;
  const scrollLeft = () => {
    flatListRef.current.scrollToOffset({ offset: 0, animated: true });
  };
  //

  //
  const scrollRight = () => {
    flatListRef.current.scrollToEnd({ animated: true });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.heading,]}>
          {useTranslate(`Techniques (${length})`)}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("AllProgram")}>
          <Text style={[styles.viewAll]}>{useTranslate("View All")}</Text>
        </TouchableOpacity>
      </View>

      {/* Scrollable FlatList with Optional Arrows */}
      <View style={styles.listWrapper}>
        <TouchableOpacity onPress={scrollLeft} style={styles.arrowLeft}>
          <Icon name="chevron-left" size={30} color="white" />
        </TouchableOpacity>

        <FlatList
          ref={flatListRef}
          data={data}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("ServiceDetails", {
                  navigate_data: item,
                  categoryType: "dashboardDetails",
                })
              }
            >
              <TechniqueCard item={item} />
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.flatListContent}
        />

        <TouchableOpacity onPress={scrollRight} style={styles.arrowRight}>
          <Icon name="chevron-right" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 10, marginBottom: 20 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    alignItems: "center",
    marginBottom: 20,

  },
  heading: { fontSize: 20 },
  // viewAll: {
  //   fontSize: 14,
  //   color: "black",
  //   textDecorationLine: "underline",
  // },
  viewAll: {
    fontSize: 14,
    color: 'black',
    textDecorationLine: 'underline',
  },
  listWrapper: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    flexDirection: "row",
  },
  flatListContent: {
    paddingHorizontal: 2,
  },
  arrowLeft: {
    position: "absolute",
    left: 0,
    zIndex: 1,
    padding: 10,
    // backgroundColor: "#D4845F",
    borderRadius: 20,
    top: 18,
  },
  arrowRight: {
    position: "absolute",
    right: 0,
    zIndex: 1,
    padding: 10,
    // backgroundColor: "#D4845F",
    borderRadius: 20,
    top: 18,
  },
  card: {
    alignItems: "center",
    justifyContent: "flex-start",
    marginHorizontal: 5,
  },
  imageContainer: {
    width: 80,
    height: 80,

    // backgroundColor: '#FF914D',
    // backgroundColor: "#E18A5E",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginBottom: 5,
  },
  icon: {
    width: 80,
    height: 80,
    resizeMode: "contein",
    borderRadius: 10,
    // tintColor: "#FFFFFF",
  },
  title: {
    color: "#000",
    textAlign: "center",
    fontSize: 12,
    // fontWeight: "bold",
  },
});

export default Techniques;
