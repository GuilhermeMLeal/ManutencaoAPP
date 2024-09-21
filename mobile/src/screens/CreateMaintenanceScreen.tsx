import React, { useState } from 'react';
import { SafeAreaView, TextInput, Button, StyleSheet, Alert } from 'react-native';

const CreateMaintenanceScreen = ({ navigation, route }) => {
  const { addMaintenance } = route.params;
  const [newMaintenance, setNewMaintenance] = useState({
    description: '',
    priority: '',
    responsible: '',
  });

  const handleCreateMaintenance = () => {
    if (newMaintenance.description && newMaintenance.priority && newMaintenance.responsible) {
      addMaintenance(newMaintenance);
      Alert.alert('Sucesso', 'Manutenção criada com sucesso.');
      navigation.goBack();
    } else {
      Alert.alert('Erro', 'Preencha todos os campos para criar uma manutenção.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        placeholder="Descrição do problema"
        value={newMaintenance.description}
        onChangeText={(text) => setNewMaintenance({ ...newMaintenance, description: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Prioridade (Alta, Média, Baixa)"
        value={newMaintenance.priority}
        onChangeText={(text) => setNewMaintenance({ ...newMaintenance, priority: text })}
        style={styles.input}
      />
      <TextInput
        placeholder="Responsável"
        value={newMaintenance.responsible}
        onChangeText={(text) => setNewMaintenance({ ...newMaintenance, responsible: text })}
        style={styles.input}
      />
      <Button title="Cadastrar Manutenção" onPress={handleCreateMaintenance} />
      <Button title="Voltar" onPress={() => navigation.goBack()} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default CreateMaintenanceScreen;
