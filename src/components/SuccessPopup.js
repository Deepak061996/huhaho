import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Modal} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SuccessPopup = ({isVisible, onClose, message}) => {
  return (
    <Modal visible={isVisible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.iconContainer}>
            <Icon name="check-circle" size={60} color="#fff" />
          </View>
          <Text style={styles.successText}>Success!</Text>
          <Text style={styles.messageText}>{message}</Text>
          <TouchableOpacity style={styles.okButton} onPress={onClose}>
            <Text style={styles.okButtonText}>Ok</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: 300,
  },
  iconContainer: {
    backgroundColor: '#E18A5E',
    padding: 15,
    borderRadius: 50,
    marginBottom: 10,
  },
  successText: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  messageText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: 'black',
  },
  okButton: {
    backgroundColor: '#E18A5E',
    paddingVertical: 12,
    paddingHorizontal: 70,
    borderRadius: 30,
  },
  okButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default SuccessPopup;
