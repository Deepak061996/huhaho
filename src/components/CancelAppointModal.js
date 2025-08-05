import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import axios from 'axios';
import useDetails from '../hooks/useDetail';

const CancelConfirmationModal = ({
  visible,
  onCancel,
  appointmentId,
  onSuccess,
  details,
}) => {
  const [loading, setLoading] = useState(false);

  const {CancelAppointment} = useDetails();
  console.log(
    appointmentId,
    details?.booking_date,
    details?.booking_time,
    'appointmentIdappointmentIdappointmentId',
  );
  const handleConfirm = async () => {
    setLoading(true);
    try {
      const response = await CancelAppointment({
        booking_id: appointmentId,
      });

      if (response) {
        Alert.alert('Success', 'Appointment cancelled successfully');
        onSuccess(); // callback for parent
        onCancel(); // close modal
      } else {
        Alert.alert('Error', 'Something went wrong.');
      }
    } catch (error) {
      console.error('API error:', error);
      Alert.alert('Error', 'Failed to cancel appointment.');
    } finally {
      setLoading(false);
    }
  };

  //

  const isWithin24Hours = (dateStr, timeStr) => {
    if (!dateStr || !timeStr) return false;

    const [day, month, year] = dateStr.split('/');
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);

    if (modifier === 'PM' && hours !== 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;

    const bookingDateTime = new Date(year, month - 1, day, hours, minutes);
    const now = new Date();
    const diffInMs = Math.abs(bookingDateTime - now); // absolute difference
    const diffInHours = diffInMs / (1000 * 60 * 60);

    return diffInHours <= 24;
  };

  console.log(
    isWithin24Hours(details?.booking_date, details?.booking_time),
    'askhdfjkashdfshfd',
  );
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onCancel}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.message}>
            {isWithin24Hours(details?.booking_date, details?.booking_time)
              ? 'Cancellation period over. No refund.'
              : 'Appointment will be cancelled. Refund in 5–7 days.'}
          </Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={onCancel}
              style={styles.cancelButton}
              disabled={loading}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleConfirm}
              style={styles.confirmButton}
              disabled={loading}>
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.confirmText}>Confirm</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '75%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    elevation: 5,
    height: 150,
  },
  message: {
    fontSize: 18,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 22,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  cancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
    backgroundColor: '#ccc',
    borderRadius: 8,
  },
  confirmButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#E18A5E',
    borderRadius: 8,
  },
  cancelText: {
    color: '#333',
    fontWeight: 'bold',
  },
  confirmText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CancelConfirmationModal;
