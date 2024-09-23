import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Modal, Text, TextInput } from 'react-native';
import { Button, ListItem } from 'react-native-elements';

const initialMachines = [
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
  const [machines, setMachines] = useState(initialMachines);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newMachine, setNewMachine] = useState({
    id: '',
    name: '',
    type: '',
    location: '',
    status: '',
    model: '',
    fabricationDate: '',
    serialNumber: '',
  });

  const handleSaveMachine = () => {
    setMachines([...machines, { ...newMachine, id: (machines.length + 1).toString() }]);
    setIsModalVisible(false);
    setNewMachine({
      id: '',
      name: '',
      type: '',
      location: '',
      status: '',
      model: '',
      fabricationDate: '',
      serialNumber: '',
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button 
          title="Criar Máquina" 
          buttonStyle={styles.button} 
          onPress={() => setIsModalVisible(true)}
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

      <Modal
        transparent={true}
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Criar Máquina</Text>

            <TextInput
              style={styles.input}
              placeholder="Nome da Máquina"
              value={newMachine.name}
              onChangeText={(text) => setNewMachine({ ...newMachine, name: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Tipo"
              value={newMachine.type}
              onChangeText={(text) => setNewMachine({ ...newMachine, type: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Localização"
              value={newMachine.location}
              onChangeText={(text) => setNewMachine({ ...newMachine, location: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Status"
              value={newMachine.status}
              onChangeText={(text) => setNewMachine({ ...newMachine, status: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Modelo"
              value={newMachine.model}
              onChangeText={(text) => setNewMachine({ ...newMachine, model: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Data de Fabricação"
              value={newMachine.fabricationDate}
              onChangeText={(text) => setNewMachine({ ...newMachine, fabricationDate: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Número Serial"
              value={newMachine.serialNumber}
              onChangeText={(text) => setNewMachine({ ...newMachine, serialNumber: text })}
            />

            <Button
              title="Salvar"
              buttonStyle={styles.saveButton}
              onPress={handleSaveMachine}
            />

            <Button
              title="Cancelar"
              buttonStyle={styles.cancelButton}
              onPress={() => setIsModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    padding: 8,
  },
  saveButton: {
    backgroundColor: '#35b043',
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: '#f74545',
    marginTop: 10,
  },
});
