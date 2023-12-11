import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Modal,
  Button,
  // Picker
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
  const [radius, setRadius] = useState('1000')
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

  const randomNum = (dayOfMonth % 10) + 6;

  const [selectedCategories, setSelectedCategories] = useState(['restaurant, fast_food']);

  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((item) => item !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }

  };

  const generateUrl = () => {
    let categories = '';

    if (selectedCategories.includes('restaurant')) {
      categories += 'catering.restaurant,';
    }

    if (selectedCategories.includes('fast_food')) {
      categories += 'catering.fast_food,';
    }

    categories = categories.replace(/,$/, '');

    const url = `https://api.geoapify.com/v2/places?categories=${categories}&filter=circle:-89.398065,43.072633,${radius}&bias=proximity:-89.398065,43.072633&limit=10&apiKey=54e1a62e66a34d32a0f17b1de7af1121`;
    return url;
  };


  useEffect(() => {
    fetch("https://api.geoapify.com/v2/places?categories=catering.restaurant,catering.fast_food&filter=circle:-89.398065,43.072633,1000&bias=proximity:-89.398065,43.072633&limit=20&apiKey=54e1a62e66a34d32a0f17b1de7af1121", requestOptions)
      .then(response => response.json())
      .then(data => {
        setPopular(data.features.slice(0, 5))
        setTodaysPick(data.features[randomNum])
      })
      .catch(error => {
        console.log('error', error)
      });

    const url = generateUrl()

    fetch(url, requestOptions)
      .then(response => response.json())
      .then(data => {
        setTopPicks(data.features)
      })
      .catch(error => {
        console.log('error', error)
      });
  }, [radius, selectedCategories])


  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };


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
      <TouchableOpacity onPress={toggleModal} style={styles.openModalButton}>
        <Text style={styles.openModalButtonText}>Filters</Text>
      </TouchableOpacity>
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
              onPress={() => navigation.navigate("Restaurant", { rest: todaysPick })}
            >
              {todaysPick ? ( 
                <View style={styles.card}>
                  <Text>{todaysPick.properties.name}</Text>
                  <Text>{todaysPick.properties.distance} meters</Text>
                </View>
              ) : (
                <Text>Loading...</Text>
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

        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => {
            toggleModal();
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text>Choose Radius:</Text>
              <TextInput
                style={{ borderWidth: 1, borderColor: 'gray', margin: 10, padding: 5 }}
                placeholder="Enter radius"
                value={radius}
                onChangeText={(text) => setRadius(text)}
              />

              <Text>Choose Restaurant Type:</Text>
              <TouchableOpacity
                onPress={() => toggleCategory('restaurant')}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 10,
                }}
              >
                <View
                  style={{
                    height: 24,
                    width: 24,
                    borderRadius: 12,
                    borderWidth: 2,
                    borderColor: selectedCategories.includes('restaurant') ? 'blue' : 'black',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {selectedCategories.includes('restaurant') && (
                    <View
                      style={{
                        height: 12,
                        width: 12,
                        borderRadius: 6,
                        backgroundColor: 'blue',
                      }}
                    />
                  )}
                </View>
                <Text style={{ marginLeft: 10 }}>Restaurant</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => toggleCategory('fast_food')}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 10,
                }}
              >
                <View
                  style={{
                    height: 24,
                    width: 24,
                    borderRadius: 12,
                    borderWidth: 2,
                    borderColor: selectedCategories.includes('fast_food') ? 'blue' : 'black',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {selectedCategories.includes('fast_food') && (
                    <View
                      style={{
                        height: 12,
                        width: 12,
                        borderRadius: 6,
                        backgroundColor: 'blue',
                      }}
                    />
                  )}
                </View>
                <Text style={{ marginLeft: 10 }}>Fast Food</Text>
              </TouchableOpacity>
              <Button title="Close" onPress={toggleModal} />
            </View>
          </View>
        </Modal>

        <View>
          <Text style={{ fontWeight: "bold" }}>Top picks based on your preferences:</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
            <ScrollView vertical>
              {
                topPick !== undefined ? (
                  Object.values(topPick).map((restaurant, index) => (
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
                ) : (
                  <Text>Please expand search criteria</Text>
                )
              }
            </ScrollView>
          </View>

        </View>
      </ScrollView>

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
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  openModalButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
    marginBottom: 10
  },
  openModalButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  checkbox: {
    alignSelf: 'center',
  },
})

export default Dashboard
