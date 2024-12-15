import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialIcons";
import { View, Text, StyleSheet } from "react-native";
import MachineScreen from "./machine/machine";
import MaintenanceHistoryScreen from "./maintenance/maintenance";
import MaintenanceRequestScreen from "./maintenance/maintenanceRequest";
import StockScreen from "./tool/stock";
import ManageSquadsScreen from "./squads/manageSquads";
import UserListScreen from "./user/userList";

const Tab = createBottomTabNavigator();

export function HomeScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          const iconMap: Record<string, string> = {
            Machine: "build",
            Maintenance: "handyman",
            Stock: "storage",
            MaintenanceRequest: "note-add",
            Squads: "group",
            Users: "people",
          };

          const iconName = iconMap[route.name] || "home";

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: styles.tabBarActiveTintColor.color,
        tabBarInactiveTintColor: styles.tabBarInactiveTintColor.color,
        tabBarStyle: styles.tabBar,
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
        name="Squads"
        options={{ tabBarLabel: "Squads" }}
        component={ManageSquadsScreen}
      />
      <Tab.Screen
        name="Users"
        options={{ tabBarLabel: "Users" }}
        component={UserListScreen}
      />
      {/* <Tab.Screen
        name="MaintenanceRequest"
        options={{ tabBarLabel: "Solicitação" }}
        component={MaintenanceRequestScreen}
      /> */}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#f8f8f8",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    height: 60,
    paddingBottom: 5,
    paddingTop: 5,
  },
  tabBarActiveTintColor: {
    color: "tomato",
  },
  tabBarInactiveTintColor: {
    color: "gray",
  },
});
