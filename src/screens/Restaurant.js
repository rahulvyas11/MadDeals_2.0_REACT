import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Restaurant = () => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Cuisine:</Text>
        <Text style={styles.info}></Text>
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
        <Text style={styles.info}></Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Popularity:</Text>
        <Text style={styles.info}></Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Address:</Text>
        <Text style={styles.info}></Text>
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
