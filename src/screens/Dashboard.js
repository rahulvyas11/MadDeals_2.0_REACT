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
import { useState, useEffect, useRef } from "react"
import { firebase } from "../../config"
import React from "react"
import { useNavigation } from "@react-navigation/native"
import * as Location from "expo-location"
import { Feather } from "@expo/vector-icons"


const Dashboard = () => {
  const navigation = useNavigation()
  const textInputRef = useRef(null);
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
  const [location, setLocation] = useState(null)
  const [addr, setAddr] = useState("")
  const [currentLocation, setCurrentLocation] = useState(null)

  const [todaysPick, setTodaysPick] = useState(null)


  const updateLocation = async () => {
    const geocodeLocation = await Location.geocodeAsync(address);
    if (geocodeLocation.length > 0) {
      setLatitude(geocodeLocation[0].latitude);
      setLongitude(geocodeLocation[0].longitude);
    }
  };

  
  useEffect(() => {
  (async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let currentLocation = await Location.getCurrentPositionAsync({});
    setCurrentLocation(currentLocation);
  })();
}, []);



  useEffect(() => {
    const addressToCoordinates = async () => {
      try {
        let location = await Location.geocodeAsync(address);
        if (location.length > 0) {
          setLatitude(location[0].latitude);
          setLongitude(location[0].longitude);
        } else {
          setLatitude(null);
          setLongitude(null);
        }
      } catch (error) {
        console.error('Error geocoding address:', error);
        setLatitude(null);
        setLongitude(null);
      }
    };

    addressToCoordinates();
  }, [address]);


  const clearAddress = () => {
    setLatitude(null)
    setLongitude(null)
    if (textInputRef.current) {
      textInputRef.current.clear();
    }
  }

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

    const lat = latitude !== null ? parseFloat(latitude).toFixed(6) : 
      currentLocation && currentLocation.coords.latitude ?
      parseFloat(currentLocation.coords.latitude).toFixed(6) : 0.0;

    const lon = longitude !== null ? parseFloat(longitude).toFixed(6) :
      currentLocation && currentLocation.coords.longitude ?
      parseFloat(currentLocation.coords.longitude).toFixed(6) : 0.0;


    const url = `https://api.geoapify.com/v2/places?categories=${categories}&filter=circle:${lon},${lat},${radius}&bias=proximity:${lon},${lat}&limit=10&apiKey=54e1a62e66a34d32a0f17b1de7af1121`;
    // const url = `https://api.geoapify.com/v2/places?categories=${categories}&filter=circle:,${radius}&bias=proximity:&limit=10&apiKey=54e1a62e66a34d32a0f17b1de7af1121`
    return url;
  };


  useEffect(() => {
    const lat = currentLocation && currentLocation.coords.latitude ?
    parseFloat(currentLocation.coords.latitude).toFixed(6) : 0.0;

    const lon = currentLocation && currentLocation.coords.longitude ?
      parseFloat(currentLocation.coords.longitude).toFixed(6) : 0.0;


    fetch(`https://api.geoapify.com/v2/places?categories=catering.restaurant,catering.fast_food&filter=circle:${lon},${lat},1000&bias=proximity:${lon},${lat}&limit=20&apiKey=54e1a62e66a34d32a0f17b1de7af1121`, requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data.features)
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
  }, [radius, selectedCategories, latitude, longitude, address, currentLocation])


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
        <TouchableOpacity
          onPress={() => clearAddress()}
        >
          <Feather style={{ margin: 3 }} name="map-pin" size={20} color="blue" />
        </TouchableOpacity>
        <TextInput
          ref={textInputRef}
          style={{
            fontSize: 18,
            padding: 10,
          }}
          placeholder={`${street}, ${pCode}`}
          onChangeText={setAddr}
        />
        <TouchableOpacity 
          onPress={() => setAddress(addr)}
        >
          <Feather style={{ margin: 3 }} name="search" size={20} color="black" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={toggleModal} style={styles.openModalButton}>
        <Text style={styles.openModalButtonText}>Filters</Text>
      </TouchableOpacity>
      <ScrollView>
        <Text style={{ fontWeight: "bold" }}>Today's Pick</Text>
        <View>
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
