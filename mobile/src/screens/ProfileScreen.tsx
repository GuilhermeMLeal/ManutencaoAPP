import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export function ProfileScreen({ navigation }: { navigation: any }) {
  const user = {
    name: 'Guilherme Ferramenteiro',
    email: 'neyma.jr@gmail.com',
    address: 'Ferramentaria',
    profilePicture: require('../imgs/ferramentaria.jpeg'),
  };

  return (
    <View style={styles.container}>
      <Image
        source={user.profilePicture}
        style={styles.profileImage}
      />
      
      <Text style={styles.userName}>{user.name}</Text>
      
      <View style={styles.userInfo}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.info}>{user.email}</Text>
        
        <Text style={styles.label}>Setor:</Text>
        <Text style={styles.info}>{user.address}</Text>
      </View>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('EditProfile')}
      >
        <Text style={styles.buttonText}>Editar Perfil</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  userInfo: {
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  info: {
    fontSize: 16,
    color: '#555',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
