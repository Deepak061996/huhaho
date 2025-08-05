import React from 'react';
import {Text, StyleSheet, View, FlatList, TouchableOpacity} from 'react-native';
import TopHeader from '../../components/TopHeader';
import {useSelector} from 'react-redux';
import Events from '../../components/Events';
import {useNavigation} from '@react-navigation/native';
import {useTranslate} from '../../hooks/useTranslate';
import Section from '../../components/Section';

const UpcomingEvents = () => {
  const {allData} = useSelector(({user}) => user);
  const navigation = useNavigation();

  const eventsData = Array.isArray(allData?.events) ? allData.events : [];
  const translatedTxt = useTranslate('Upcoming Events');

  return (
    <View style={styles.container}>
      <TopHeader showBack={true} title={translatedTxt} />

      <FlatList
        data={eventsData}
        numColumns={4}
        keyExtractor={item => item?.id?.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          eventsData.length === 0 && styles.emptyContainer,
          {paddingTop: 10, paddingHorizontal: 8},
        ]}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No upcoming events found.</Text>
        }
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ServiceDetails', {
                categoryType: 'upcomingEvnt',
                event_id: item?.id,
              })
            }
            style={styles.itemContainer}>
            <Events
              image={item.event_image}
              date={item?.date}
              completeData={item}
              showForitem={true}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
  itemContainer: {
    width: 80,
    height: 130,
    margin: 8, // Uniform margin around each item
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default UpcomingEvents;
