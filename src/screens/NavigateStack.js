import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Dashboard from "./Dashboard"
import Restaurant from "./Restaurant";

// Stack for NewsScreen and Articles
const Stack = createNativeStackNavigator();

export default function NavigateStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name = "Dashboard" component = {Dashboard} />
            <Stack.Screen name="Restaurant" component={Restaurant}/>
        </Stack.Navigator>
    );
}