import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons"; // Verifique a instalação correta
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MachineScreen from "./machine/machine";
import MaintenanceHistoryScreen from "./maintenance/maintenance";
import MaintenanceRequestScreen from "./maintenance/maintenanceRequest";
import StockScreen from "./stock";

const Tab = createBottomTabNavigator();

export function HomeScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          // Mapeamento de ícones para as abas
          const iconMap: Record<string, string> = {
            Machine: "build",
            Maintenance: "handyman",
            Stock: "storage",
            MaintenanceRequest: "note-add",
          };

          const iconName = iconMap[route.name] || "home";

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Machine"
        options={{ tabBarLabel: "Máquinas" }}
        component={MachineScreen}
      />
      <Tab.Screen
        name="Maintenance"
        options={{ tabBarLabel: "Manutenções" }}
        component={MaintenanceHistoryScreen}
      />
      <Tab.Screen
        name="Stock"
        options={{ tabBarLabel: "Estoque" }}
        component={StockScreen}
      />
      <Tab.Screen
        name="MaintenanceRequest"
        options={{ tabBarLabel: "Solicitação" }}
        component={MaintenanceRequestScreen}
      />
    </Tab.Navigator>
  );
}
