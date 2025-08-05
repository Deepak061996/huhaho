import {StyleSheet, Text, View, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import TopHeader from '../../components/TopHeader';
import {useTranslate} from '../../hooks/useTranslate';
import useDetails from '../../hooks/useDetail';
import {useSelector} from 'react-redux';
import Loader from '../../components/Loader';

const Notification = () => {
  const {getAllnotification, isLoading} = useDetails();
  const {userInfo} = useSelector(({user}) => user);

  const [notifications, setNotification] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllnotification({
          user_id: userInfo?.data?.id,
        });
        if (response) {
          setNotification(response?.data || []);
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
        // Optional: show a toast or set an error state
      }
    };

    fetchData();
  }, []);

  const renderItem = ({item}) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.title || 'No Title'}</Text>
      <Text style={styles.cardMessage}>{item.message}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Loader visible={isLoading} />
      <TopHeader showBack={true} title={'Notification'} />
      {notifications.length === 0 ? (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>No notifications yet</Text>
        </View>
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    fontSize: 18,
    color: '#999',
    marginTop: 20,
    fontWeight: '500',
  },
  listContent: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Elevation for Android
    elevation: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  cardMessage: {
    fontSize: 14,
    color: '#555',
  },
});
