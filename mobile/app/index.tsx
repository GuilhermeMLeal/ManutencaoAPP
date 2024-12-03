import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./components/login";
import { DetailsScreen } from "./components/details";
import { HomeScreen } from "./components/home";
import MachineDetailsScreen from "./components/machine/machineDetails";
import RegisterPartsScreen from "./components/registerParts";
import MachineMaintenanceHistoryScreen from "./components/machine/machineMaintenanceHistory";
import CreateMachine from "./components/machine/machineCreate";
import CreateMaintenance from "./components/maintenance/maintenanceCreate";
import { AuthProvider, useAuth } from "./context/authService";

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Details: { name: string; email: string };
  MachineDetails: undefined;
  RegisterParts: undefined;
  MachineMaintenanceHistoryScreen: undefined;
  CreateMachine: undefined;
  CreateMaintenance: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();


export default function Index()  {
  const { isAuthenticated } = useAuth(); // Controle de autenticação

  return (
   
    <Stack.Navigator
      initialRouteName={isAuthenticated ? "Home" : "Login"} // Define a rota inicial com base na autenticação
      screenOptions={{ headerShown: false }} // Oculta os cabeçalhos das telas
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="MachineDetails" component={MachineDetailsScreen} />
      <Stack.Screen name="RegisterParts" component={RegisterPartsScreen} />
      <Stack.Screen
        name="MachineMaintenanceHistoryScreen"
        component={MachineMaintenanceHistoryScreen}
      />
      <Stack.Screen name="CreateMachine" component={CreateMachine} />
      <Stack.Screen name="CreateMaintenance" component={CreateMaintenance} />
    </Stack.Navigator>

  );
}

