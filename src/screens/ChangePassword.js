import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import { useNavigation } from "@react-navigation/native"

const ChangePassword = ({ navigation }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleConfirmPassword = () => {
    // Handle the press event for the "Confirm" button
    console.log('Password Change Confirmed');
    // You can add your password change logic here
  };

  return (
    <View style={styles.container}>
      <View style={styles.bubbleContainer}>
        <Text style={styles.bubbleTitle}>New Password</Text>
        <TextInput
          style={styles.passwordInput}
          placeholder="Enter new password"
          secureTextEntry
          value={newPassword}
          onChangeText={(text) => setNewPassword(text)}
        />
      </View>

      <View style={styles.bubbleContainer}>
        <Text style={styles.bubbleTitle}>Confirm Password</Text>
        <TextInput
          style={styles.passwordInput}
          placeholder="Confirm new password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
        />
      </View>

      <View style={styles.centeredButton}>
        <Button title="Confirm" onPress={() => navigation.navigate("Profile")} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  bubbleContainer: {
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  bubbleTitle: {
    fontSize: 16,
    marginBottom: 5,
  },
  passwordInput: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    width: '100%',
  },
  centeredButton: {
    alignItems: 'center',
  },
});

export default ChangePassword;
