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
import CreateMaintenanceScreen from '../screens/CreateMaintenanceScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MaintenanceStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MaintenanceList" component={MaintenanceScreen} />
      <Stack.Screen name="CreateMaintenance" component={CreateMaintenanceScreen} />
    </Stack.Navigator>
  );
}

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
            } else if (route.name === 'Manutenções') {
              iconName = 'wrench';
            } else if (route.name === 'Máquinas') {
              iconName = 'list';
            } else if (route.name === 'Estoque de Peças') { 
              iconName = 'box';
            } else if (route.name === 'Perfil do Usuário') {
              iconName = 'user';
            }

            // Retorna o ícone com base no nome da rota
            return <Icon name={iconName} type="font-awesome-5" color={color} size={size} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Manutenções" component={MaintenanceScreen} />
        <Tab.Screen name="Máquinas" component={MachineStack} />
        <Tab.Screen name="Estoque de Peças" component={StockScreen} />
        <Tab.Screen name="Perfil do Usuário" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}