import { React, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

const Restaurant = (props) => {
  const restaurant = props.route.params.rest;
  const [address, setAddress] = useState(props.route.params.rest.properties.address_line2)
  const [distance, setDistance] = useState(props.route.params.rest.properties.distance)
  const [hours, setHours] = useState(props.route.params.rest.properties.datasource.raw.opening_hours)

  const initialCuisine = props.route.params.rest.properties.datasource.raw.cuisine;
  const cuisineFormatted = initialCuisine
    ? initialCuisine[0].toUpperCase() + initialCuisine.slice(1)
    : 'No info available';

  const [cuisine, setCuisine] = useState(cuisineFormatted);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Cuisine:</Text>
        {
          cuisine === null ? (
            <Text style={styles.info}>No info available</Text>
          ) : (
            <Text style={styles.info}>{cuisine}</Text>
          )
        }
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Price:</Text>
        <Text style={styles.info}>$$$</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Coupons:</Text>
        <Text style={styles.info}></Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Distance:</Text>
        <Text style={styles.info}>{distance} meters</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Hours:</Text>
        {
          hours === null ? (
            <Text style={styles.info}>No info available</Text>
          ) : (
            <Text style={styles.info}>{hours}</Text>
          )
        }
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Address:</Text>
        <Text style={styles.info}>{address}</Text>
      </View>
      <Text style={styles.mapLink}>View on map</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
    width: "40%",
  },
  info: {
    width: "60%",
  },
  mapLink: {
    marginTop: 10,
    color: "blue",
    textDecorationLine: "underline",
  },
});

export default Restaurant;
