import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput
} from "react-native"
import { useState, useEffect } from "react"
import { firebase } from "../../config"
import React from "react"
import { useNavigation } from "@react-navigation/native"
import * as Location from "expo-location"
import { Feather } from "@expo/vector-icons"


const Dashboard = () => {
  const navigation = useNavigation()
  const [name, setName] = useState("")
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
      <ScrollView>
        <Text style={{ fontWeight: "bold" }}>Today's Pick</Text>
        <View style={{ padding: 20 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Restaurant")}
          >
            <Image
              source={{
                uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png'
              }}
              style={{ width: 375, height: 200 }}
            />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={{ fontWeight: "bold" }}>Popular Restaurants</Text>
          <Text>Check out what people around you have been trying:</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 20 }}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Restaurant")}
            >
              <Image
                source={{
                  uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png'
                }}
                style={{ width: 100, height: 100 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Restaurant")}
            >
              <Image
                source={{
                  uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png'
                }}
                style={{ width: 100, height: 100 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Restaurant")}
            >
              <Image
                source={{
                  uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png'
                }}
                style={{ width: 100, height: 100 }}
              />
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 20 }}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Restaurant")}
            >
              <Image
                source={{
                  uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png'
                }}
                style={{ width: 100, height: 100 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Restaurant")}
            >
              <Image
                source={{
                  uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png'
                }}
                style={{ width: 100, height: 100 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Restaurant")}
            >
              <Image
                source={{
                  uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png'
                }}
                style={{ width: 100, height: 100 }}
              />
            </TouchableOpacity>
          </View>

        </View>
        <View>
          <Text style={{ fontWeight: "bold" }}>Top picks based on your preferences:</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 20 }}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Restaurant")}
            >
              <Image
                source={{
                  uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png'
                }}
                style={{ width: 100, height: 100 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Restaurant")}
            >
              <Image
                source={{
                  uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png'
                }}
                style={{ width: 100, height: 100 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Restaurant")}
            >
              <Image
                source={{
                  uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png'
                }}
                style={{ width: 100, height: 100 }}
              />
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 20 }}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Restaurant")}
            >
              <Image
                source={{
                  uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png'
                }}
                style={{ width: 100, height: 100 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Restaurant")}
            >
              <Image
                source={{
                  uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png'
                }}
                style={{ width: 100, height: 100 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Restaurant")}
            >
              <Image
                source={{
                  uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png'
                }}
                style={{ width: 100, height: 100 }}
              />
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
      {/* <Text style={{ fontSize: 26 }}>Hello, {user.firstName}</Text>
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
        </View> */}

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    justifyContent: "flex-start", // Updated to "flex-start" to align content at the top
    paddingTop: 20, // Optional: Add padding from the top if needed
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
