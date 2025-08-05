import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
} from 'react-native';
import Video from 'react-native-video';

const Testinomial = ({image}) => {
  const [paused, setPaused] = useState(false);

  return (
    <View style={styles.container}>
      <Video
        source={{uri: image}}
        style={styles.video}
        resizeMode="contain"
        controls={false}
        paused={paused}
      />
      <TouchableOpacity
        onPress={() => setPaused(!paused)}
        style={styles.pauseButton}>
        <Text style={styles.pauseText}>{!paused ? '▶' : '❚❚'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  video: {
    width: width - 20,
    height: 200,
    borderRadius: 15,
    overflow: 'hidden',
  },
  pauseButton: {
    position: 'absolute',
    bottom: 75,
    right: 160,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 30,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pauseText: {
    color: '#fff',
    fontSize: 20,
  },
});

export default Testinomial;

//

//

// backupcode

// import React, { useState } from "react";
// import {
//   View,
//   StyleSheet,
//   Dimensions,
//   TouchableOpacity,
//   Image,
//   Text,
// } from "react-native";
// import Video from "react-native-video";
// import { imageBase } from "../config/Constent";

// const Testinomial = ({ image }) => {
//   const [showVideo, setShowVideo] = useState(false);

//   const thumbnailUrl =
//     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1I717EjFjwrG7tpAJ3T44_HiCCgHVuVF9OQ&s";

//   return (
//     <View style={styles.container}>
//       {!showVideo ? (
//         <TouchableOpacity
//           onPress={() => setShowVideo(true)}
//           activeOpacity={0.8}
//         >
//           <Image source={{ uri: thumbnailUrl }} style={styles.video} />
//           <Text style={styles.playIcon}>▶</Text>
//         </TouchableOpacity>
//       ) : (
//         <View>
//           <Video
//             source={{ uri: image }}
//             style={styles.video}
//             controls
//             resizeMode="contain"
//             paused={false}
//           />
//           <TouchableOpacity
//             onPress={() => setShowVideo(false)}
//             style={styles.closeButton}
//           >
//             <Text style={styles.closeText}>✕</Text>
//           </TouchableOpacity>
//         </View>
//       )}
//     </View>
//   );
// };

// const { width } = Dimensions.get("window");

// const styles = StyleSheet.create({
//   container: {
//     margin: 10,
//   },
//   video: {
//     width: 120,
//     height: 120,

//     borderRadius: 10,
//     overflow: "hidden",
//   },
//   playIcon: {
//     position: "absolute",
//     top: "40%",
//     left: "33%",
//     fontSize: 28,
//     color: "#fff",
//     backgroundColor: "rgba(0,0,0,0.6)",
//     borderRadius: 40,
//     paddingHorizontal: 6,
//     paddingLeft: 8,
//     paddingBottom: 3,
//   },
//   closeButton: {
//     position: "absolute",
//     top: 10,
//     right: 15,
//     backgroundColor: "rgba(0,0,0,0.6)",
//     borderRadius: 15,
//     paddingHorizontal: 8,
//     paddingVertical: 2,
//   },
//   closeText: {
//     color: "#fff",
//     fontSize: 18,
//   },
// });

// export default Testinomial;
