import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const moreImages = [
  {id: '101', image: require('../../../assets/more.png')},
  {id: '102', image: require('../../../assets/more2.png')},
  {id: '103', image: require('../../../assets/more3.png')},
  {id: '104', image: require('../../../assets/more4.png')},
  {id: '105', image: require('../../../assets/more5.png')},
];

const Career = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Image */}
        <View style={styles.headerContainer}>
          <Image
            source={require('../../../assets/men.png')}
            style={styles.headerImage}
          />
          <View style={styles.overlay}>
            <Text style={styles.headerText}>Time Management</Text>
          </View>
          {/* Top Right Icons */}
          <View style={styles.iconContainer}>
            <Icon
              name="notifications"
              size={24}
              color="#fff"
              style={styles.icon}
            />
            <Icon name="search" size={24} color="#fff" style={styles.icon} />
            <Icon name="settings" size={24} color="#fff" style={styles.icon} />
          </View>
        </View>

        {/* About the Program */}
        <View style={styles.sectionContainer}>
          <View style={styles.rowContainer}>
            <Text style={styles.sectionTitle}>About the Program</Text>
            <TouchableOpacity
              style={styles.bookNowButton}
              onPress={() => navigation.navigate('Calendars')}>
              <Text style={styles.bookNowText}>BOOK NOW</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.pointsContainer}>
            <Text style={styles.point}>
              ⭐ Experience a seamless blend of luxury and comfort at our
              exquisite hotel, where every moment is designed to leave you with
              lasting memories.
            </Text>
            <Text style={styles.point}>
              ⭐ Whether it's a gourmet breakfast, a leisurely lunch, or a
              sumptuous dinner, our dining experience is a celebration of
              culinary excellence.
            </Text>
            <Text style={styles.point}>
              ⭐ Planning an event? Our versatile and well-equipped event spaces
              are the perfect canvas for your celebrations, be it weddings, or
              conferences.
            </Text>
            <Text style={styles.point}>
              ⭐ Experience a seamless blend of luxury and comfort at our
              exquisite hotel, where every moment is designed to leave you with
              lasting memories.
            </Text>
          </View>
        </View>

        {/* More Images */}
        <Text style={styles.moreImagesTitle}>More Images</Text>
        <FlatList
          data={moreImages}
          horizontal
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <Image source={item.image} style={styles.moreImage} />
          )}
        />

        {/* Back Button Icon */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <FontAwesome name="angle-double-left" size={40} color="#E18A5E" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    position: 'relative',
  },
  headerImage: {
    width: '100%',
    height: 400,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingVertical: 20,
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  iconContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 15,
  },
  sectionContainer: {
    padding: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  bookNowButton: {
    backgroundColor: '#E18A5E',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  bookNowText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  pointsContainer: {
    marginTop: 10,
  },
  point: {
    fontSize: 16,
    marginBottom: 5,
  },
  moreImagesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 20,
  },
  moreImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    margin: 10,
  },
  backButton: {
    alignSelf: 'center',
    marginVertical: 20,
  },
});

export default Career;
