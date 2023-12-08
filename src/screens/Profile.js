// //import React from 'react';
// import { View, Text } from 'react-native';
// import {
//     Alert,
//     Button,
//     TextInput,
//     StyleSheet,
//     TouchableOpacity,
//   } from "react-native"
//   import React, { useState } from "react"
//   import { firebase } from "../../config"
//   import { useNavigation } from "@react-navigation/native"
//   import { useEffect } from "react"
//   import * as Location from "expo-location"

// const Profile = () => {

//     firstName =  firebase.firstName
//     lastName = firebase.lastName
//     email = firebase.email
//     password = firebase.password
//     entryError = firebase.entryError
//     location = firebase.location

    
//   return (
//     <View style={styles.container}>

//     <Text style={styles.inputName}>First Name</Text>
//     <TextInput
//       style={styles.input}
//       value={firstName}
//       onChangeText={(text) => setFirstName(text)}
//     />
//     <Text style={styles.inputName}>Last Name</Text>
//     <TextInput
//       style={styles.input}
//       value={lastName}
//       onChangeText={(text) => setLastName(text)}
//     />
//     <Text style={styles.inputName}>Email</Text>
//     <TextInput
//       style={styles.input}
//       value={email}
//       onChangeText={(text) => {
//         setEmail(text)
//         setEntryError("")
//       }}
//       keyboardType="email-address"
//     />
//     <Text style={styles.inputName}>Password</Text>
//     <TextInput
//       style={styles.input}
//       value={password}
//       onChangeText={(text) => {
//         setPassword(text)
//         setEntryError("")
//       }}
//       secureTextEntry={true}
//     />
//     {entryError ? <Text style={styles.errorText}>{entryError}</Text> : null}
//     <TouchableOpacity
//       style={styles.signUpButton}
//       onPress={() =>
//         registerUser(email, password, firstName, lastName, location)
//       }
//     >
//       <Text style={[styles.buttonText, { color: "#EAF5EC" }]}>Signup</Text>
//     </TouchableOpacity>

//     <TouchableOpacity
//       style={styles.neverMind}
//       onPress={() => navigation.navigate("Login")}
//     >
//       <Text style={[styles.buttonText, { color: "#1C251E" }]}>
//         Nevermind!
//       </Text>
//     </TouchableOpacity>
//   </View>
//   );
// };

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: "#fff",
//       alignItems: "center",
//       justifyContent: "center",
//     },
//     errorText: {
//       color: "red",
//       fontSize: 14,
//       marginBottom: 5,
//     },
//     buttonText: {
//       color: "white",
//       textAlign: "center",
//       fontSize: 16,
//       fontWeight: "bold",
//     },
//     input: {
//       height: 40,
//       width: 200,
//       borderColor: "gray",
//       borderWidth: 1,
//       borderRadius: 8,
//       marginBottom: 16,
//       marginTop: 16,
//       paddingHorizontal: 10,
//     },
//     inputName: {
//       fontSize: 16,
//       marginBottom: 1,
//     },
//     signUpButton: {
//       borderRadius: 5,
//       marginTop: 5,
//       backgroundColor: "#1C251E",
//       paddingVertical: 10,
//       paddingHorizontal: 20,
//       borderRadius: 5,
//       borderWidth: 1,
//       borderColor: "#ddd",
//       elevation: 5,
//     },
//     neverMind: {
//       marginTop: 10,
//       backgroundColor: "#EAF5EC",
//       paddingVertical: 10,
//       paddingHorizontal: 20,
//       borderRadius: 5,
//       borderWidth: 1,
//       borderColor: "#ddd",
//       elevation: 5,
//     },
//     grayWhiteButton: {
//       backgroundColor: "gray",
//       color: "white",
//       padding: 10,
//       borderRadius: 5,
//       textAlign: "center",
//       fontWeight: "bold",
//     },
//   })
// export default Profile;
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
        <Button title="Change Password" onPress={() => navigation.navigate("ChangePassword")} />
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

