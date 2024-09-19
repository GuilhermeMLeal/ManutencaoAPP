import React, { useState } from 'react';
import { SafeAreaView, FlatList, View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { ListItem } from 'react-native-elements';

const initialData = [
  {
    id: 1,
    description: 'Troca de filtro de óleo',
    priority: 'Alta',
    responsible: 'João',
    status: 'Pendente',
    materials: ['Filtro de óleo', 'Chave de fenda'],
    date: '2024-09-19',
  },
  {
    id: 2,
    description: 'Reparo na suspensão',
    priority: 'Média',
    responsible: 'Maria',
    status: 'Em andamento',
    materials: ['Amortecedor', 'Mola'],
    date: '2024-09-18',
  },
];

export default function MaintenanceScreen() {
  const [maintenances, setMaintenances] = useState(initialData);
  const [newMaintenance, setNewMaintenance] = useState({
    description: '',
    priority: '',
    responsible: '',
  });
  const [materialInput, setMaterialInput] = useState('');
  const [nextId, setNextId] = useState(initialData.length + 1);

  const createMaintenance = () => {
    if (newMaintenance.description && newMaintenance.priority && newMaintenance.responsible) {
      const newEntry = {
        id: nextId, 
        description: newMaintenance.description,
        priority: newMaintenance.priority,
        responsible: newMaintenance.responsible,
        status: 'Pendente',
        materials: [],
        date: new Date().toISOString().split('T')[0], 
      };
      setMaintenances([...maintenances, newEntry]);
      setNewMaintenance({ description: '', priority: '', responsible: '' });
      setNextId(nextId + 1); 
    } else {
      Alert.alert('Erro', 'Preencha todos os campos para criar uma manutenção.');
    }
  };

  const addMaterial = (maintenanceId: number) => {
    if (materialInput) {
      const updatedMaintenances = maintenances.map((m) => {
        if (m.id === maintenanceId) {
          return {
            ...m,
            materials: [...m.materials, materialInput],
          };
        }
        return m;
      });
      setMaintenances(updatedMaintenances);
      setMaterialInput('');
    } else {
      Alert.alert('Erro', 'Preencha o nome do material.');
    }
  };

  const renderMaintenanceItem = ({ item, navigation }: { item: any , navigation: any}) => (
    <ListItem bottomDivider>
      <ListItem.Content>
        <ListItem.Title>{item.description}</ListItem.Title>
        <ListItem.Subtitle>
          Prioridade: {item.priority} | Responsável: {item.responsible} | Status: {item.status}
        </ListItem.Subtitle>
        <Text>Data: {item.date}</Text>
        <Text>Materiais usados: {item.materials.join(', ') || 'Nenhum material registrado'}</Text>
        <TextInput
          placeholder="Registrar novo material"
          value={materialInput}
          onChangeText={setMaterialInput}
          style={styles.input}
        />
        <Button title="Adicionar Material" onPress={() => addMaterial(item.id)} />
      </ListItem.Content>
    </ListItem>
  );

  return (
    
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Lista de Manutenções</Text>
      <FlatList
        data={maintenances}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderMaintenanceItem}
      />

      <View style={styles.form}>
        <Text style={styles.title}>Criar Nova Manutenção</Text>
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
        <Button title="Criar Manutenção" onPress={createMaintenance} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  form: {
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});
