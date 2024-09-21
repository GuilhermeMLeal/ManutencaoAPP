import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Button, ListItem } from 'react-native-elements';

const machines = [
  { id: '1', name: 'Máquina 1', type: 'Tipo A', location: 'Fábrica A', status: 'Verde', model: 'Modelo A', fabricationDate: '01/01/2020', serialNumber: '123456' },
  { id: '2', name: 'Máquina 2', type: 'Tipo B', location: 'Fábrica B', status: 'Amarela', model: 'Modelo B', fabricationDate: '02/02/2021', serialNumber: '789012' },
  { id: '3', name: 'Máquina 3', type: 'Tipo C', location: 'Fábrica C', status: 'Vermelho', model: 'Modelo C', fabricationDate: '03/03/2022', serialNumber: '345678' },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Verde': return 'green';
    case 'Amarela': return 'yellow';
    case 'Vermelho': return 'red';
    default: return 'gray';
  }
};

export function MachineListScreen({ navigation }: { navigation: any }) {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button 
          title="Criar Máquina" 
          buttonStyle={styles.button} 
        />
      </View>
      <FlatList
        data={machines}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ListItem bottomDivider onPress={() => navigation.navigate('MachineDetails', { machine: item })}>
            <ListItem.Content>
              <ListItem.Title>{item.name}</ListItem.Title>
              <ListItem.Subtitle>{item.type} - {item.location}</ListItem.Subtitle>
            </ListItem.Content>
            <View style={[styles.statusCircle, { backgroundColor: getStatusColor(item.status) }]} />
            <ListItem.Chevron />
          </ListItem>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  buttonContainer: {
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 10, 
  },
  statusCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
});
