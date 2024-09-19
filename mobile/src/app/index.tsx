import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import { Icon } from 'react-native-elements';
import { MachineListScreen } from '../screens/MachineListScreen';
import { MachineDetailsScreen } from '../screens/MachineDetailsScreen';
import { HomeScreen } from '../screens/HomeScreen';
import MaintenanceScreen from '../screens/MaintenanceScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import StockScreen from '../screens/ProductList';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MachineStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MachineList" component={MachineListScreen} />
      <Stack.Screen name="MachineDetails" component={MachineDetailsScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Maintenance') {
              iconName = 'wrench';
            } else if (route.name === 'Machines') {
              iconName = 'list';
            } else if (route.name === 'Stock') { // Nova aba para Produtos
              iconName = 'box';
            } else if (route.name === 'Profile') {
              iconName = 'user';
            }

            // Retorna o ícone com base no nome da rota
            return <Icon name={iconName} type="font-awesome" color={color} size={size} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Maintenance" component={MaintenanceScreen} />
        <Tab.Screen name="Machines" component={MachineStack} />
        <Tab.Screen name="Stock" component={StockScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
