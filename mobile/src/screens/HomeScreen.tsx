import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const screens: ScreenItem[] = [
  { name: "Manutenções", icon: "wrench" },
  { name: "Máquinas", icon: "list" },
  { name: "Estoque de Peças", icon: "box" },
  { name: "Perfil do Usuário", icon: "user" },
];

export function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Bem-vindo, Usuário!</Text>
      <View style={styles.grid}>
        {screens.map((screen, index) => (
          <TouchableOpacity
            key={index}
            style={styles.square}
            onPress={() => navigation.navigate(screen.name)}
          >
            <Icon name={screen.icon} type="font-awesome-5" size={30} color="black" />
            <Text style={styles.text}>{screen.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  square: {
    width: 150,
    height: 150,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});