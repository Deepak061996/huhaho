// import React from 'react';
// import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
// import {useNavigation} from '@react-navigation/native';

// const BookingAppointment = ({
//   title,
//   image,
//   date,
//   clinic,
//   service_name,
//   booking_id,
//   booking_time,
//   amount,
// }) => {
//   const navigation = useNavigation(); // Navigation hook

//   return (
//     <TouchableOpacity
//       onPress={() =>
//         navigation.navigate('AllAppointment', {
//           title,
//           date,
//           service_name,
//           booking_id,
//           booking_time,
//           amount,
//           upcomming: false,
//         })
//       }
//       style={styles.card}>
//       <View style={styles.image}>
//         <Image source={{uri: image}} />
//       </View>

//       <View style={styles.content}>
//         <Text style={styles.title}>{title}</Text>
//         <View style={styles.dateBadge}>
//           <Text style={styles.dateText}>{date}</Text>
//         </View>
//         <Text style={styles.clinic}>{clinic}</Text>
//         {/* <Text style={styles.details}>View details</Text> */}
//       </View>
//     </TouchableOpacity>
//   );
// };

// const styles = StyleSheet.create({
//   card: {
//     flexDirection: 'row',
//     backgroundColor: '#F2F1F0',
//     borderRadius: 15,
//     padding: 10,
//     alignItems: 'center',
//     marginHorizontal: 8,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   image: {
//     width: 120,
//     height: 90,
//     borderRadius: 10,

//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   content: {
//     flex: 1,
//     paddingHorizontal: 12,
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#000',
//   },
//   dateBadge: {
//     backgroundColor: '#E18A5E',
//     paddingVertical: 5,
//     paddingHorizontal: 12,
//     borderRadius: 10,
//     alignSelf: 'flex-start',
//     marginTop: 5,
//   },
//   dateText: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: '#000',
//   },
//   clinic: {
//     fontSize: 14,
//     fontStyle: 'italic',
//     color: '#555',
//     marginTop: 4,
//   },
//   details: {
//     fontSize: 14,
//     color: '#000',
//     marginTop: 6,
//   },
// });

// export default BookingAppointment;

import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const BookingAppointment = ({title, image, date, clinic}) => {
  const navigation = useNavigation(); // Navigation hook

  return (
    <Pressable
      onPress={
        () => {}
        // navigation.navigate('AllAppointment', {title, image, date, clinic})
      }
      style={styles.card}>
      <Image source={{uri: image}} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.dateBadge}>
          <Text style={styles.dateText}>{date}</Text>
        </View>
        <Text style={styles.clinic}>{clinic}</Text>
        {/* <Text style={styles.details}>View details</Text> */}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#F2F1F0',
    borderRadius: 15,
    padding: 10,
    alignItems: 'center',
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 120,
    height: 90,
    borderRadius: 10,
  },
  content: {
    flex: 1,
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  dateBadge: {
    backgroundColor: '#E18A5E',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginTop: 5,
  },
  dateText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  clinic: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#555',
    marginTop: 4,
  },
  details: {
    fontSize: 14,
    color: '#000',
    marginTop: 6,
  },
});

export default BookingAppointment;
