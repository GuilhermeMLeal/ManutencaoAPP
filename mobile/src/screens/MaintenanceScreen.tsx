import React, { useState } from 'react';
import { SafeAreaView, FlatList, View, Text, Button, StyleSheet } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

interface Maintenance {
  id: number;
  description: string;
  priority: string;
  responsible: string;
  status: string;
  materials: string[];
  date: string;
}

interface NavigationProps {
  addMaintenance: (newMaintenance: Omit<Maintenance, 'id' | 'date' | 'status' | 'materials'>) => void;
}

const initialData: Maintenance[] = [
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
  const navigation = useNavigation<NavigationProps>();
  const [maintenances, setMaintenances] = useState<Maintenance[]>(initialData);

  const addMaintenance = (newMaintenance: Omit<Maintenance, 'id' | 'date' | 'status' | 'materials'>) => {
    const nextId = maintenances.length + 1;
    const newEntry: Maintenance = {
      id: nextId,
      ...newMaintenance,
      status: 'Pendente',
      materials: [],
      date: new Date().toISOString().split('T')[0],
    };
    setMaintenances([...maintenances, newEntry]);
  };

  const renderMaintenanceItem = ({ item }: { item: Maintenance }) => (
    <ListItem bottomDivider>
      <ListItem.Content>
        <ListItem.Title>{item.description}</ListItem.Title>
        <ListItem.Subtitle>
          Prioridade: {item.priority} | Responsável: {item.responsible} | Status: {item.status}
        </ListItem.Subtitle>
        <Text>Data: {item.date}</Text>
        <Text>Materiais usados: {item.materials.join(', ') || 'Nenhum material registrado'}</Text>
        <View style={styles.buttonContainer}>
          <Icon name="edit" onPress={() => {}} />
          <Icon name="delete" onPress={() => {}} />
        </View>
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
      <Button title="Cadastrar Nova Manutenção" onPress={() => navigation.navigate('CreateMaintenance', { addMaintenance })} />
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
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
});
