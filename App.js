import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import React, { useState, useEffect } from "react"
import { firebase } from "./config"
import Login from "./src/screens/Login"
import Registration from "./src/screens/Registration"
import Dashboard from "./src/screens/Dashboard"
import Header from "./src/components/Header"

const Stack = createStackNavigator()

function App() {
  const [initializing, setInitializing] = useState(true)
  const [user, setUser] = useState()

  function onAuthStateChanged(user) {
    setUser(user)
    if (initializing) {
      setInitializing(false)
    }
  }

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged)
    return subscriber
  }, [])

  if (initializing) return null

  if (!user) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerTitle: () => <Header name="Login" />,
          }}
        />
        <Stack.Screen
          name="Registration"
          component={Registration}
          options={{
            headerTitle: () => <Header name="Registration" />,
          }}
        />
      </Stack.Navigator>
    )
  }

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerTitle: () => <Header name="Dashboard" />,
        }}
      />
    </Stack.Navigator>
  )
}
export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  )
}
