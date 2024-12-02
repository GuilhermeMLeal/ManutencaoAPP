import Icon from "react-native-vector-icons/MaterialIcons";
import { GrOfflineStorage } from "react-icons/gr";
import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { LoginScreen } from "./login";
import MachineScreen from "./machine/machine";
import MaintenanceHistoryScreen from "./maintenance/maintenance";
import MaintenanceRequestScreen from "./maintenance/maintenanceRequest";
import StockScreen from "./stock"
const Tab = createBottomTabNavigator();
export function HomeScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Settings") {
            iconName = "settings";
          } else if (route.name === "Machine") {
            iconName = "build";
          } else if (route.name === "Maintenance") {
            iconName = "handyman";
          }
          else if(route.name === "Stock"){
            iconName = "storage";
          }else if (route.name === "MaintenanceRequest") {
            iconName = "note-add";
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Machine"
        options={{ tabBarLabel: "Máquinas",  headerShown: false }}
        component={MachineScreen}
      />
      <Tab.Screen
        name="Maintenance"
        options={{ tabBarLabel: "Manutenções", headerShown: false }}
        component={MaintenanceHistoryScreen}
      />
      <Tab.Screen
        name="Stock"
        options={{ tabBarLabel: "Estoque",  headerShown: false }}
        component={StockScreen}
      />
      <Tab.Screen
        name="MaintenanceRequest"
        options={{ tabBarLabel: "Solicitação",  headerShown: false}}
        component={MaintenanceRequestScreen}
      />
    </Tab.Navigator>
  );
}
