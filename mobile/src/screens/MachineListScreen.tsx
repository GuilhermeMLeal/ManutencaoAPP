import React from 'react';
import { View, FlatList, StyleSheet, Modal, Text, TextInput } from 'react-native';
import { Button, ListItem } from 'react-native-elements';

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Verde': return 'green';
    case 'Amarela': return 'yellow';
    case 'Vermelho': return 'red';
    default: return 'gray';
  }
};

const initialMachines = [
  { id: '1', name: 'Máquina 1', type: 'Tipo A', location: 'Fábrica A', status: 'Verde' },
  { id: '2', name: 'Máquina 2', type: 'Tipo B', location: 'Fábrica B', status: 'Amarela' },
  { id: '3', name: 'Máquina 3', type: 'Tipo C', location: 'Fábrica C', status: 'Vermelho' },
];

const MachineList = ({ machines, navigation }: { machines: any[], navigation: any }) => (
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
);

const MachineModal = ({ isVisible, onClose }: { isVisible: boolean; onClose: () => void }) => (
  <Modal
    transparent={true}
    animationType="slide"
    visible={isVisible}
    onRequestClose={onClose}
  >
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Criar Máquina</Text>
        <TextInput style={styles.input} placeholder="Nome da Máquina" />
        <TextInput style={styles.input} placeholder="Tipo" />
        <TextInput style={styles.input} placeholder="Localização" />
        <TextInput style={styles.input} placeholder="Status" />
        <TextInput style={styles.input} placeholder="Modelo" />
        <TextInput style={styles.input} placeholder="Data de Fabricação" />
        <TextInput style={styles.input} placeholder="Número Serial" />

        <Button title="Salvar" buttonStyle={styles.saveButton} onPress={() => {}} />
        <Button title="Cancelar" buttonStyle={styles.cancelButton} onPress={onClose} />
      </View>
    </View>
  </Modal>
);

export function MachineListScreen({ navigation }: { navigation: any }) {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button 
          title="Criar Máquina" 
          buttonStyle={styles.button} 
          onPress={() => setIsModalVisible(true)}
        />
      </View>

      <MachineList machines={initialMachines} navigation={navigation} />
      <MachineModal isVisible={isModalVisible} onClose={() => setIsModalVisible(false)} />
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
