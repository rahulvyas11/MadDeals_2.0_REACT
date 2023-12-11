import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dashboard from "./Dashboard"
import Restaurant from "./Restaurant";
import Settings from "./Settings"
import Profile from "./Profile"
import OtherSettings from "./OtherSettings"
import ChangePassword from "./ChangePassword"

const Stack = createNativeStackNavigator();

export default function NavigateStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name = "Dashboard" component = {Dashboard} />
            <Stack.Screen name="Restaurant" component={Restaurant}/>
            <Stack.Screen name="Settings" component={Settings}/>
            <Stack.Screen name="Profile" component={Profile}/>
            <Stack.Screen name="OtherSettings" component={OtherSettings}/>
            <Stack.Screen name="ChangePassword" component={ChangePassword}/>
        </Stack.Navigator>
    );
}