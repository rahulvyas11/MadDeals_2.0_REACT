import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet, TextInput } from "react-native"
import { firebase } from "../../config"
import * as Location from "expo-location"
import { Feather } from "@expo/vector-icons"

const Dashboard = () => {
  const [user, setUser] = useState("")
  const [street, setStreet] = useState("")
  const [pCode, setPcode] = useState("")
  const [address, setAddress] = useState("")

  const updateLocation = async () => {
    const geocodeLocation = await Location.geocodeAsync(address)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userSnapshot = await firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .get()

        if (userSnapshot.exists) {
          const userData = userSnapshot.data()
          setUser(userData)

          const reverseGeocodedAddress = await Location.reverseGeocodeAsync({
            longitude: userData.location.coords.longitude,
            latitude: userData.location.coords.latitude,
          })

          const { name, postalCode } = reverseGeocodedAddress[0]
          setStreet(name)
          setPcode(postalCode)
        } else {
          console.log("User Does Not Exist")
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
  }, [])

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 26 }}>Hello, {user.firstName}</Text>
      <View style={styles.locationContainer}>
        <Feather style={{ margin: 3 }} name="map-pin" size={20} color="blue" />
        <TextInput
          style={{
            fontSize: 18,
            padding: 10,
          }}
          placeholder={`${street}, ${pCode}`}
          onChangeText={setAddress}
        />
        <Feather style={{ margin: 3 }} name="search" size={20} color="black" />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 20,
  },
  locationContainer: {
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    width: 325,
    marginTop: 10,
  },
})

export default Dashboard
