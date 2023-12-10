import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
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
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [radius, setRadius] = useState(1000)
  const [popular, setPopular] = useState([])
  const [topPick, setTopPicks] = useState([])

  const [todaysPick, setTodaysPick] = useState(null)


  const updateLocation = async () => {
    const geocodeLocation = await Location.geocodeAsync(address);
    if (geocodeLocation.length > 0) {
      setLatitude(geocodeLocation[0].latitude);
      setLongitude(geocodeLocation[0].longitude);
    }
  };

  var requestOptions = {
    method: 'GET',
  };

  const currentDate = new Date();
  const dayOfMonth = currentDate.getDate();

  const randomNum = (dayOfMonth % 10) + 11;


  useEffect(() => {
    fetch("https://api.geoapify.com/v2/places?categories=catering.restaurant&filter=circle:-89.398065,43.072633,1000&bias=proximity:-89.398065,43.072633&limit=20&apiKey=54e1a62e66a34d32a0f17b1de7af1121", requestOptions)
      .then(response => response.json())
      .then(data => {
        setPopular(data.features.slice(0, 10))
        setTodaysPick(data.features[randomNum])
      })
      .catch(error => {
        console.log('error', error)
      });

      fetch(`https://api.geoapify.com/v2/places?categories=catering.restaurant&filter=circle:${lon},${lat},${radius}&bias=proximity:${lon},${lat}&limit=5&apiKey=54e1a62e66a34d32a0f17b1de7af1121`, requestOptions)
      .then(response => response.json())
      .then(data => {
        setPopular(data.features)
      })
      .catch(error => {
        console.log('error', error)
      });
  }, [])


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
        <View>
          {/* <TouchableOpacity
            onPress={() => navigation.navigate("Restaurant")}
          >
            <Image
              source={{
                uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png'
              }}
              style={{ width: 375, height: 200 }}
            />
          </TouchableOpacity> */}

          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate("Restaurant", {rest : todaysPick})}
            >
              {todaysPick ? ( // Check if todaysPick has a value
                <View style={styles.card}>
                  <Text>{todaysPick.properties.name}</Text>
                  <Text>{todaysPick.properties.distance} meters</Text>
                </View>
              ) : (
                <Text>Loading...</Text> // Render a loading message or other indicator while data is being fetched
              )}
            </TouchableOpacity>
          </View>

        </View>
        <View>
          <Text style={{ fontWeight: "bold" }}>Popular Restaurants</Text>
          <Text>Check out what people around you have been trying:</Text>
          <ScrollView vertical>
            {
              Object.values(popular).map((restaurant, index) => (
                <View key={index}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Restaurant", { rest: restaurant })}
                  >


                    <View style={styles.card}>
                      <Text>{restaurant.properties.name}</Text>
                      <Text>{restaurant.properties.distance} meters</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ))
            }
          </ScrollView>
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
  card: {
    padding: 16,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'grey',
    margin: 5
  }
})

export default Dashboard
