import React from 'react';
import {Modal, View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const SuccessPaymnt = ({
  visible,
  onClose,
  iconName = 'check-circle',
  message = 'Payment Successful!',
}) => {
  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Icon name={iconName} size={64} color="#E18A5E" style={styles.icon} />
          <Text style={styles.message}>{message}</Text>
          <TouchableOpacity style={styles.okButton} onPress={onClose}>
            <Text style={styles.okText}>OK</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default SuccessPaymnt;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#fff',
    width: 280,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    elevation: 10,
  },
  icon: {
    marginBottom: 16,
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: 'black',
  },
  okButton: {
    backgroundColor: '#E18A5E',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  okText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
