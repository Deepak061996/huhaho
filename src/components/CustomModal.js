import React from 'react';
import {Modal, View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {useTranslate} from '../hooks/useTranslate';

const CustomModal = ({visible, title, onConfirm, onCancel}) => {
  const isDelete = title.toLowerCase().includes('delete');

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.iconWrapper}>
            <Icon
              name={isDelete ? 'delete' : 'exclamationcircleo'}
              size={60}
              color={'#E18A5E'}
            />
          </View>

          <Text style={styles.modalTitle}>{title}</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.confirmButton]}
              onPress={onConfirm}>
              <Text style={styles.buttonText}>{useTranslate('Yes')}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onCancel}>
              <Text style={[styles.buttonText, styles.cancelButtonText]}>
                {useTranslate('No')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 5},
  },
  iconWrapper: {
    padding: 20,
    borderRadius: 60,
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: '#333',
    marginBottom: 25,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },
  button: {
    width: 100,
    height: 45,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: '#E18A5E', // 🔶 Yes button
  },
  cancelButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#E18A5E', // 🔶 Border for No button
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'white',
  },
  cancelButtonText: {
    color: '#FF914D', // 🔶 Text color for No
  },
});

export default CustomModal;
