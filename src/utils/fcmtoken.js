import messaging from '@react-native-firebase/messaging';

// 📌 Function jo sirf FCM token return karega
export const getFcmToken = async () => {
    try {
      const token = await messaging().getToken();
      return token;  // 👈 Yeh token ko return karega
    } catch (error) {
      console.error('Error getting FCM token:', error);
      return null;  // 👈 Error aaye to null return karega
    }
  };