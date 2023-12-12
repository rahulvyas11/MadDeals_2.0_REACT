import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Button } from 'react-native';
import { useNavigation } from "@react-navigation/native"

const Profile = ({ navigation }) => {
  const handlePress = (field) => {
    // Handle the press event for each field as needed
    console.log(`Pressed ${field}`);
  };

  const handleChangePassword = () => {
    // Handle the press event for the "Change Password" button
    console.log('Change Password Pressed');
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.bubbleContainer}>
          <Text style={styles.bubbleTitle}>First Name</Text>
          <TextInput
            style={styles.profileItem}
            placeholder="John"
            onChangeText={(text) => console.log(`First Name: ${text}`)}
          />
        </View>

        <View style={styles.bubbleContainer}>
          <Text style={styles.bubbleTitle}>Last Name</Text>
          <TextInput
            style={styles.profileItem}
            placeholder="Doe"
            onChangeText={(text) => console.log(`Last Name: ${text}`)}
          />
        </View>
      </View>

      <View style={styles.bubbleContainer}>
        <Text style={styles.bubbleTitle}>Email</Text>
        <TextInput
          style={styles.profileItem}
          placeholder="johndoe@example.com"
          onChangeText={(text) => console.log(`Email: ${text}`)}
        />
      </View>

      <View style={styles.bubbleContainer}>
        <Text style={styles.bubbleTitle}>Address 1</Text>
        <TextInput
          style={styles.profileItem}
          placeholder="123 Main St"
          onChangeText={(text) => console.log(`Address 1: ${text}`)}
        />
      </View>

      <View style={styles.bubbleContainer}>
        <Text style={styles.bubbleTitle}>Address 2</Text>
        <TextInput
          style={styles.profileItem}
          placeholder="Unit 456"
          onChangeText={(text) => console.log(`Address 2: ${text}`)}
        />
      </View>

      <View style={styles.addressContainer}>
        <View style={styles.bubbleContainer}>
          <Text style={styles.bubbleTitle}>Zip</Text>
          <TextInput
            style={styles.addressItem}
            placeholder="12345"
            onChangeText={(text) => console.log(`Zip: ${text}`)}
          />
        </View>

        <View style={styles.bubbleContainer}>
          <Text style={styles.bubbleTitle}>City</Text>
          <TextInput
            style={styles.addressItem}
            placeholder="Anytown"
            onChangeText={(text) => console.log(`City: ${text}`)}
          />
        </View>

        <View style={styles.bubbleContainer}>
          <Text style={styles.bubbleTitle}>State</Text>
          <TextInput
            style={styles.addressItem}
            placeholder="CA"
            onChangeText={(text) => console.log(`State: ${text}`)}
          />
        </View>
      </View>

      <View style={styles.centeredButton}>
        <Button title="Change Password" onPress={() => navigation.navigate("Reset Password")} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  bubbleContainer: {
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  bubbleTitle: {
    fontSize: 16,
    marginBottom: 5,
  },
  profileItem: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    width: '100%',
  },
  addressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addressItem: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    width: '100%',
    marginRight: 5,
  },
  centeredButton: {
    alignItems: 'center',
  },
});

export default Profile;

