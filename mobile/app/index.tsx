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
import PrivateRoute from "./privateRoute";

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
        {/* Tela de Login (Acessível sem autenticação) */}
        <Stack.Screen name="Login" component={LoginScreen} />

        {/* Rotas protegidas */}
        <Stack.Screen
          name="Home"
          component={() => (
            <PrivateRoute>
              <HomeScreen />
            </PrivateRoute>
          )}
        />
        <Stack.Screen
          name="MachineDetails"
          component={() => (
            <PrivateRoute>
              <MachineDetailsScreen />
            </PrivateRoute>
          )}
        />
        <Stack.Screen
          name="RegisterParts"
          component={() => (
            <PrivateRoute>
              <RegisterPartsScreen />
            </PrivateRoute>
          )}
        />
        <Stack.Screen
          name="MachineMaintenanceHistoryScreen"
          component={() => (
            <PrivateRoute>
              <MachineMaintenanceHistoryScreen />
            </PrivateRoute>
          )}
        />
        <Stack.Screen
          name="CreateMachine"
          component={() => (
            <PrivateRoute>
              <CreateMachine />
            </PrivateRoute>
          )}
        />
        <Stack.Screen
          name="CreateMaintenance"
          component={() => (
            <PrivateRoute>
              <CreateMaintenance />
            </PrivateRoute>
          )}
        />
      </Stack.Navigator>

  );
}

