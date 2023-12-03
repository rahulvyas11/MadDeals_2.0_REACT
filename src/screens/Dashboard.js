import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native"
import { useState, useEffect } from "react"
import { firebase } from "../../config"
import React from "react"

const Dashboard = () => {
  const [name, setName] = useState("")

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setName(snapshot.data())
        } else {
          console.log("User Does Not Exist")
        }
      })
  }, [])
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 26 }}>Hello, {name.firstName}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start", // Updated to "flex-start" to align content at the top
    paddingTop: 20, // Optional: Add padding from the top if needed
  },
})
export default Dashboard
