import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from "../components/login";
import { DetailsScreen } from "../components/details";
import { HomeScreen } from "../components/home";
import MachineDetailsScreen from "../components/machine/machineDetails";
import RegisterPartsScreen from "../components/registerParts";
import MachineMaintenanceHistoryScreen from "../components/machine/machineMaintenanceHistory";
import CreateMachine from "../components/machine/machineCreate";
import CreateMaintenance from "../components/maintenance/maintenanceCreate";
import { AuthProvider, useAuth } from "../context/authService";

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Details: {name: string; email: string};
};

const Stack = createStackNavigator<RootStackParamList>();

export default function Index() {
  const {isAuthenticated } = useAuth();
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName={isAuthenticated ?  "Home" : "Login" } screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home"  options={{ headerShown: false }} component={HomeScreen}/>
        <Stack.Screen name="MachineDetails" options={{ headerShown: false }} component={MachineDetailsScreen} />
        <Stack.Screen name="RegisterParts" options={{ headerShown: false }} component={RegisterPartsScreen}/>
        <Stack.Screen name="MachineMaintenanceHistoryScreen" options={{ headerShown: false }} component={MachineMaintenanceHistoryScreen}/>
        <Stack.Screen name="CreateMachine" options={{ headerShown: false }} component={CreateMachine} />
        <Stack.Screen name="CreateMaintenance" options={{ headerShown: false }} component={CreateMaintenance} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
