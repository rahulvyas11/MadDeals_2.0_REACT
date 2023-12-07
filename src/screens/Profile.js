//import React from 'react';
import { View, Text } from 'react-native';
import {
    Alert,
    Button,
    TextInput,
    StyleSheet,
    TouchableOpacity,
  } from "react-native"
  import React, { useState } from "react"
  import { firebase } from "../../config"
  import { useNavigation } from "@react-navigation/native"
  import { useEffect } from "react"
  import * as Location from "expo-location"

const Profile = () => {

    firstName =  firebase.firstName
    lastName = firebase.lastName
    email = firebase.email
    password = firebase.password
    entryError = firebase.entryError
    location = firebase.location

    
  return (
    <View style={styles.container}>

    <Text style={styles.inputName}>First Name</Text>
    <TextInput
      style={styles.input}
      value={firstName}
      onChangeText={(text) => setFirstName(text)}
    />
    <Text style={styles.inputName}>Last Name</Text>
    <TextInput
      style={styles.input}
      value={lastName}
      onChangeText={(text) => setLastName(text)}
    />
    <Text style={styles.inputName}>Email</Text>
    <TextInput
      style={styles.input}
      value={email}
      onChangeText={(text) => {
        setEmail(text)
        setEntryError("")
      }}
      keyboardType="email-address"
    />
    <Text style={styles.inputName}>Password</Text>
    <TextInput
      style={styles.input}
      value={password}
      onChangeText={(text) => {
        setPassword(text)
        setEntryError("")
      }}
      secureTextEntry={true}
    />
    {entryError ? <Text style={styles.errorText}>{entryError}</Text> : null}
    <TouchableOpacity
      style={styles.signUpButton}
      onPress={() =>
        registerUser(email, password, firstName, lastName, location)
      }
    >
      <Text style={[styles.buttonText, { color: "#EAF5EC" }]}>Signup</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.neverMind}
      onPress={() => navigation.navigate("Login")}
    >
      <Text style={[styles.buttonText, { color: "#1C251E" }]}>
        Nevermind!
      </Text>
    </TouchableOpacity>
  </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
    errorText: {
      color: "red",
      fontSize: 14,
      marginBottom: 5,
    },
    buttonText: {
      color: "white",
      textAlign: "center",
      fontSize: 16,
      fontWeight: "bold",
    },
    input: {
      height: 40,
      width: 200,
      borderColor: "gray",
      borderWidth: 1,
      borderRadius: 8,
      marginBottom: 16,
      marginTop: 16,
      paddingHorizontal: 10,
    },
    inputName: {
      fontSize: 16,
      marginBottom: 1,
    },
    signUpButton: {
      borderRadius: 5,
      marginTop: 5,
      backgroundColor: "#1C251E",
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: "#ddd",
      elevation: 5,
    },
    neverMind: {
      marginTop: 10,
      backgroundColor: "#EAF5EC",
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
      borderWidth: 1,
      borderColor: "#ddd",
      elevation: 5,
    },
    grayWhiteButton: {
      backgroundColor: "gray",
      color: "white",
      padding: 10,
      borderRadius: 5,
      textAlign: "center",
      fontWeight: "bold",
    },
  })
export default Profile;