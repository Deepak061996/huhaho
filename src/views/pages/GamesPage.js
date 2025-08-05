import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, Image,TouchableOpacity } from "react-native";
import TopHeader from "../../components/TopHeader";
import useCommon from "../../hooks/useCommon";
import { useTranslate } from "../../hooks/useTranslate";

const GamesPage = ({route} ) => {
  const { gameid } = route.params??{};  // yaha par id mil jayegi
  console.log('all_games',gameid)
  const { allGamesData } = useCommon();
  const [getDataList, setDataList] = useState([]);
  const [expandedItems, setExpandedItems] = useState({});
const [seeMoreMap, setSeeMoreMap] = useState({});
const [isTruncated, setIsTruncated] = useState(true);

  useEffect(() => {
    if (allGamesData) {
      setDataList(allGamesData?.data || []);
    }
  }, [allGamesData]);

  const toggleExpand = (id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

 const handleTextLayout = (id, e) => {
  if (e.nativeEvent.lines.length > 4) {
    setSeeMoreMap(prev => ({ ...prev, [id]: true }));
  }
};

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.description}>{item.description}</Text>

      {/* Subcategory Title */}
    <Text style={[styles.title,{ marginTop: 10 }]}>Games You Can Play</Text>

       {/* Subcategory Cards
    {item.get_all_sub_games && item.get_all_sub_games.map(renderSubCategory)} */}
    {/* Subcategory Cards OR No Data */}
  {item.get_all_sub_games && item.get_all_sub_games.length > 0 ? (
    item.get_all_sub_games.map(renderSubCategory)
  ) : (
    <View style={styles.noDataContainer}>
      <Text style={styles.noDataText}>No Data Available</Text>
    </View>
  )}
    </View>
  );
//   const renderSubCategory = (subItem) => 
//     {
//       const isTruncated = expandedItems[subItem.id] ==true;
//        const maxChars = 100; // ✅ Set your character limit here
//   const shouldTruncate = subItem.description.length > maxChars;
//   const shortText = subItem.description.slice(0, maxChars);
//       return (
//       <View key={subItem.id} style={styles.subcard}>
//       <View style={styles.row}>
//           {/* Image */}
//      {subItem.image && (
//        <Image
//          source={{ uri: subItem.image }}
//          style={styles.imagesub}
//          resizeMode="cover"
//        />
//      )}
//       <View style={styles.textContainer}>
//  {/* Name */}
//  <Text style={styles.subtitle}>{subItem.name}</Text>
 
//  {/* Description */}
//        {/* <View style={{ padding: 5, marginBottom: 5, flexDirection: "row" }}>
//              <Text numberOfLines={isTruncated ? 2 : Number.MAX_SAFE_INTEGER} 
//             onTextLayout={(e) => {
//               const lines = e.nativeEvent.lines;
//               if (lines.length > 3 && !seeMoreMap[subItem.id]) {
//                 setSeeMoreMap(prev => ({ ...prev, [subItem.id]: true }));
//               }
//             }}
//              style={{ flex: 1, color: "#555", textAlign: "justify" }}>
//              {subItem.description}
//                {
//                  !isTruncated && (
//                    <Text onPress={() => toggleExpand(subItem.id)} style={{ color: '#E18A5E' }}>
//                      Read less
//                    </Text>
//                  )
//                }
//              </Text>
//              {
//                isTruncated && seeMoreMap[subItem.id] && <Text onPress={() => toggleExpand(subItem.id)} style={{ color: '#E18A5E',
//                marginTop:20 }}>
//                  Read more
//                </Text>
//              }
//            </View> */}

//            <View style={{ padding: 5, marginBottom: 5, flexDirection: 'column' }}>
//   <Text style={{ color: '#555', textAlign: 'justify' }}>
//     {isTruncated && shouldTruncate ? shortText + '...' : subItem.description}
//   </Text>

//   {shouldTruncate && (
//     <TouchableOpacity onPress={() => toggleExpand(subItem.id)}>
//       <Text style={{ color: '#E18A5E', marginTop: 5 }}>
//         {isTruncated ? 'Read more' : 'Read less'}
//       </Text>
//     </TouchableOpacity>
//   )}
// </View>

//       </View>
   
//       </View>
  
//    </View>
//       );
//     }

const renderSubCategory = (subItem) => {
  const maxChars = 100;
  const isExpanded = expandedItems[subItem.id] === true;
  const shouldTruncate = subItem.description.length > maxChars;
  const shortText = subItem.description.slice(0, maxChars);

  // Final text based on state
  const displayText = isExpanded || !shouldTruncate
    ? subItem.description + ' Read less'
    : shortText + ' Read more';

  // Where to make clickable
  const clickableText = isExpanded ? 'Read less' : 'Read more';

  return (
    <View key={subItem.id} style={styles.subcard}>
      <View style={styles.row}>
        {subItem.image && (
          <Image
            source={{ uri: subItem.image }}
            style={styles.imagesub}
            resizeMode="cover"
          />
        )}

        <View style={styles.textContainer}>
          <Text style={styles.subtitle}>{subItem.name}</Text>

          <View style={{ padding: 5, marginBottom: 5 }}>
            <Text style={{ color: '#555', textAlign: 'justify' }}>
              {/* Non-clickable part */}
              {isExpanded || !shouldTruncate
                ? subItem.description
                : shortText + '... '}

              {/* Clickable "Read more / less" */}
              {shouldTruncate && (
                <Text
                  onPress={() => toggleExpand(subItem.id)}
                  style={{ color: '#E18A5E' }}
                >
                  {clickableText}
                </Text>
              )}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

  

  return (
    <View style={{ flex: 1 }}>
      <TopHeader showBack={true} title={useTranslate("Games")} />
      <FlatList
        data={getDataList.filter(item => item.id === gameid)}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.container}
      />

  
    </View>
  );
};

export default GamesPage;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  noDataContainer: {
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: 20,
},
noDataText: {
  fontSize: 16,
  color: '#999',
  fontStyle: 'italic',
},
  seeMore: {
    color: 'blue',
    fontSize: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imagesub: {
    width: '30%',       // 30% of row width
    height: 100,
    borderRadius: 8,
    marginRight: 10,
    alignSelf: 'flex-start', // 👈 this line ensures image stays at top
  },
    textContainer: {
    width: '70%',    // Remaining 70%
  //  marginBottom: 60,
    alignSelf: 'flex-start', // 👈 this line ensures image stays at top   
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  subcard: {
    backgroundColor: "#fff",
    marginVertical: 4,
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  image: {
    width: "100%",
    height: 180,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 0, // ✅ remove any default top margin

  },
  description: {
    fontSize: 14,
    color: "#555",
  },
});
