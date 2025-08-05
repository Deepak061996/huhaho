import React from 'react';
import {
  Dimensions,
  View,
  Text,
  ActivityIndicator,
  Modal,
  StyleSheet,
} from 'react-native';

const {width, height} = Dimensions.get('screen');

const Loader = ({visible = false}) => {
  if (!visible) return null; // Prevent rendering if not visible

  return (
    <Modal visible={true} transparent animationType="fade">
      <View style={styles.modalView}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    </Modal>
  );
};

export default Loader;

const styles = StyleSheet.create({
  modalView: {
    width: width,
    height: height,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    fontSize: 18,
    marginTop: 10,
  },
});
