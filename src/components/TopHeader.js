import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Icon2 from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const TopHeader = ({title, showBack, transparent}) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={transparent ? 'transparent' : '#E18A5E'}
        translucent={transparent}
      />
      <View
        style={[
          styles.header,
          transparent && styles.transparentHeader,
          {paddingTop: insets.top},
        ]}>
        {showBack && (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}>
            <Icon2
              name="doubleleft"
              size={24}
              color={transparent ? '#333333' : '#ffffff'}
            />
          </TouchableOpacity>
        )}

        {!transparent && <Text style={styles.headerText}>{title}</Text>}

        {/* Spacing view to balance the layout */}
        {showBack && !transparent && <View style={styles.backButton} />}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E18A5E',
    paddingVertical: 10,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    zIndex: 10,
  },

  transparentHeader: {
    backgroundColor: 'transparent',
    elevation: 0,
    shadowOpacity: 0,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  backButton: {
    width: 50,
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
});

export default TopHeader;
