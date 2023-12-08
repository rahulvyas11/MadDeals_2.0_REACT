import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(12); // Initial zoom level

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    })();
  }, []);

  const handleZoomIn = () => {
    setZoomLevel(zoomLevel + 1);
  };

  const handleZoomOut = () => {
    if (zoomLevel > 0) {
      setZoomLevel(zoomLevel - 1);
    }
  };

  return (
    <View style={styles.container}>
      {location ? (
        <MapView
          provider={MapView.PROVIDER_GOOGLE}
          style={styles.map}
          showsUserLocation={true} // Shows the user's location as a blue dot
          followsUserLocation={true} // Automatically moves the map to the user's location
          showsMyLocationButton={false} // Hides the default pin marker
          region={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922 * Math.pow(2, 12 - zoomLevel),
            longitudeDelta: 0.0421 * Math.pow(2, 12 - zoomLevel),
          }}
        >
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="Your Location"
            description="You are here!"
            pinColor="blue" // Custom marker color
          />
        </MapView>
      ) : (
        <Text>Loading...</Text>
      )}

      <TouchableOpacity style={styles.zoomInButton} onPress={handleZoomIn}>
        <Text>+</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.zoomOutButton} onPress={handleZoomOut}>
        <Text>-</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  zoomInButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
  },
  zoomOutButton: {
    position: 'absolute',
    top: 70,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
  },
});

export default MapScreen;
