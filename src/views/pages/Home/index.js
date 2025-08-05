import React, {useRef} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const techniques = [
  {id: '1', image: require('../../../assets/b1.png'), title: 'Train The Brain'},
  {
    id: '2',
    image: require('../../../assets/b2.png'),
    title: 'Satisfaction of Life',
  },
  {id: '3', image: require('../../../assets/b3.png'), title: "Kill your 'I'"},
  {
    id: '4',
    image: require('../../../assets/b4.png'),
    title: 'Body, Mind & Soul Control',
  },
  {id: '5', image: require('../../../assets/b5.png'), title: 'Eill your ‘I’'},
];
const Home = ({navigation}) => {
  const flatListRef = useRef(null);

  const scrollLeft = () => {
    flatListRef.current?.scrollToOffset({offset: 0, animated: true});
  };

  const scrollRight = () => {
    flatListRef.current?.scrollToEnd({animated: true});
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <TouchableOpacity>
              <Icon name="menu" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.headerIcons}>
            <TouchableOpacity>
              <Icon name="bell" size={24} color="#fff" style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon name="search" size={24} color="#fff" style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity>
              <IconMaterial
                name="settings"
                size={24}
                color="#fff"
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          <Image
            source={require('../../../assets/logo3.png')}
            style={styles.logo}
          />
        </View>

        {/* Services */}
        <Text style={styles.sectionTitle}>Services</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.servicesContainer}>
          <TouchableOpacity style={styles.serviceButton}>
            <Icon name="user" size={24} color="#fff" />
            <Text style={styles.serviceText}>Consultation</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.serviceButton}>
            <Icon name="heart" size={24} color="#fff" />
            <Text style={styles.serviceText}>Therapy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.serviceButton}>
            <Icon name="shopping-bag" size={24} color="#fff" />
            <Text style={styles.serviceText}>Cosmetic</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.serviceButton}>
            <Icon name="users" size={24} color="#fff" />
            <Text style={styles.serviceText}>Cultural Corridor</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.serviceButton}>
            <Icon name="more-horizontal" size={24} color="#fff" />
            <Text style={styles.serviceText}>Other</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Promo Banner */}
        <View style={styles.bannerContainer}>
          <Image
            source={require('../../../assets/yoga.png')}
            style={styles.bannerImage}
          />
          <Text style={styles.bannerText}>PHYSIO THERAPY</Text>
          <Text style={styles.bannerSubText}>
            Improve your overall physical{'\n'} well-being
          </Text>
          <TouchableOpacity>
            <Text style={styles.bookText}>Book an Appointment</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.header1}>
          <Text style={styles.title}>Techniques (30)</Text>
          <Text style={styles.viewAll}>View All</Text>
        </View>
        <View style={styles.carouselContainer}>
          <TouchableOpacity onPress={scrollLeft} style={styles.navButton}>
            <AntDesign name="left" size={24} color="#fff" />
          </TouchableOpacity>
          <FlatList
            ref={flatListRef}
            data={techniques}
            horizontal
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <View style={styles.item}>
                <Image source={item.image} style={styles.image} />
                <Text style={styles.caption}>{item.title}</Text>
              </View>
            )}
          />
          <TouchableOpacity onPress={scrollRight} style={styles.navButton}>
            <AntDesign name="right" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        {/* Upcoming Events */}
        <Text style={styles.sectionTitle}>Upcoming Events</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Image
            source={require('../../../assets/u1.png')}
            style={styles.eventImage}
          />
          <Image
            source={require('../../../assets/u2.png')}
            style={styles.eventImage}
          />
          <Image
            source={require('../../../assets/u3.png')}
            style={styles.eventImage}
          />
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#2A1E1E', padding: 10},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoContainer: {flexDirection: 'row', alignItems: 'center'},
  headerIcons: {flexDirection: 'row'},
  icon: {marginLeft: 15},
  logo: {width: 70, height: 70, marginLeft: 10, top: -30},
  welcomeText: {color: 'white', fontSize: 18},
  boldText: {fontWeight: 'bold', right: 150},
  sectionTitle: {color: 'white', fontSize: 18, marginVertical: 10},
  servicesContainer: {flexDirection: 'row', marginVertical: 10},
  serviceButton: {
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginRight: 10,
  },
  serviceText: {color: 'white', marginTop: 5},
  bannerContainer: {
    alignItems: 'center',
    marginVertical: 10,
    padding: 10,
    borderRadius: 10,
  },
  bannerImage: {width: '100%', height: 150, borderRadius: 10},
  bannerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    top: -130,
    alignSelf: 'flex-start',
    left: 10,
  },
  bannerSubText: {
    color: 'white',
    fontSize: 14,
    marginTop: -115,
    alignSelf: 'flex-start',
    left: 15,
  },
  bookText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    left: -60,
  },
  eventImage: {width: 150, height: 200, borderRadius: 10, marginLeft: 10},
  header1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  title: {color: '#fff', fontSize: 18, fontWeight: 'bold'},
  viewAll: {color: '#fff', fontSize: 16, textDecorationLine: 'underline'},
  carouselContainer: {flexDirection: 'row', alignItems: 'center'},
  navButton: {padding: 10},
  item: {alignItems: 'center', marginHorizontal: 10},
  image: {width: 80, height: 80, resizeMode: 'contain'},
  caption: {color: '#fff', fontSize: 14, textAlign: 'center', marginTop: 5},
});

export default Home;
