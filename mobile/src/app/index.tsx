import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, Header } from '@react-navigation/stack';
import { HomeScreen } from "../components/home";
import { DetailsScreen } from "../components/DetailsScreen";


const Stack = createStackNavigator();

export default function Index() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}