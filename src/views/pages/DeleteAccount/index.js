import React, { useState } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';

const DeleteAccount = () => {
  const [isAccountDeleted, setIsAccountDeleted] = useState(false);

  const handleDeleteAccount = () => {
    Alert.alert(
      "Are you sure?",
      "Do you really want to delete your account? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: () => {
            setIsAccountDeleted(true);
            // Add the function to handle account deletion here
            Alert.alert("Account Deleted", "Your account has been deleted successfully.");
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Delete Account</Text>
      {isAccountDeleted ? (
        <Text style={styles.successMessage}>Your account has been deleted.</Text>
      ) : (
        <Button title="Delete Account" color="#FF6347" onPress={handleDeleteAccount} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  successMessage: {
    fontSize: 18,
    color: 'green',
    marginBottom: 20,
  },
});

export default DeleteAccount;
