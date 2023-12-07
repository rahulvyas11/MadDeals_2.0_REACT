//import { View, Text } from "react-native"
import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigation } from "@react-navigation/native"

import { View, Text, Button } from 'react-native';

const Settings = ({ navigation }) => {
  const navigation = useNavigation()

  return (
    <View>

      {/* List of Pages */}
      <Button
        title="Profile"
        onPress={() => navigation.navigate("Profile")}
      />
      <Button
        title="Other Settings"
        onPress={() => navigation.navigate("OtherSettings")}
      />
    </View>
  );
};

export default Settings;