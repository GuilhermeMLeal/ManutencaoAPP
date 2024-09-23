import React, { useState } from 'react';
import { SafeAreaView, FlatList, View, Text, Button, StyleSheet, Modal, TextInput, Alert, Image } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

interface Maintenance {
  id: number;
  description: string;
  priority: string;
  responsible: string;
  status: string;
  materials: string[];
  date: string;
  photos: string[];
}

const initialData: Maintenance[] = [
  {
    id: 1,
    description: 'Troca de filtro de óleo',
    priority: 'Alta',
    responsible: 'João',
    status: 'Pendente',
    materials: ['Filtro de óleo', 'Chave de fenda'],
    photos: [],
    date: '2024-09-19',
  },
  {
    id: 2,
    description: 'Reparo na suspensão',
    priority: 'Média',
    responsible: 'Maria',
    status: 'Em andamento',
    materials: ['Amortecedor', 'Mola'],
    photos: [],
    date: '2024-09-18',
  },
];

export default function MaintenanceScreen() {
  const navigation = useNavigation();
  const [maintenances, setMaintenances] = useState<Maintenance[]>(initialData);
  const [maintenanceModalVisible, setMaintenanceModalVisible] = useState(false);
  const [materialInput, setMaterialInput] = useState('');
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [newMaintenance, setNewMaintenance] = useState({
    description: '',
    priority: '',
    responsible: '',
    comments: '',
    materials: '',
  });

  const handleCreateMaintenance = () => {
    if (newMaintenance.description && newMaintenance.priority && newMaintenance.responsible) {
      const newId = maintenances.length + 1;
      const newDate = new Date().toISOString().split('T')[0];
      const materialsArray = newMaintenance.materials.split(',').map(item => item.trim());

      const newEntry = {
        id: newId,
        ...newMaintenance,
        status: 'Pendente',
        materials: materialsArray,
        photos: photoUri ? [photoUri] : [],
        date: newDate,
      };
      setMaintenances(prev => [...prev, newEntry]);
      Alert.alert('Sucesso', 'Manutenção criada com sucesso.');
      setNewMaintenance({ description: '', priority: '', responsible: '', comments: '', materials: '' });
      setPhotoUri(null);
      setMaintenanceModalVisible(false);
    } else {
      Alert.alert('Erro', 'Preencha todos os campos para criar uma manutenção.');
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPhotoUri(result.assets[0].uri);
    }
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
        <Text>Fotos:</Text>
        {item.photos.map((photo, index) => (
          <Image key={index} source={{ uri: photo }} style={styles.photo} />
        ))}
        <View style={styles.buttonContainer}>
          <Icon name="edit" onPress={() =>{}} />
          <Icon name="delete" onPress={() => { /* handle delete */ }} />
        </View>
      </ListItem.Content>
    </ListItem>
  );

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Lista de Manutenções</Text>
        <Button
          title="Cadastrar Manutenção"
          onPress={() => setMaintenanceModalVisible(true)}
          style={styles.buttonCreate}
        />
        <FlatList
          data={maintenances}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderMaintenanceItem}
        />

        <Modal
          animationType="slide"
          transparent={true}
          visible={maintenanceModalVisible}
          onRequestClose={() => setMaintenanceModalVisible(false)}
        >
          <SafeAreaView style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Cadastro de Manutenção</Text>

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
            <TextInput
              placeholder="Comentários"
              value={newMaintenance.comments}
              onChangeText={(text) => setNewMaintenance({ ...newMaintenance, comments: text })}
              style={styles.input}
            />
            <TextInput
              placeholder="Peças utilizadas (separadas por vírgula)"
              value={newMaintenance.materials}
              onChangeText={(text) => setNewMaintenance({ ...newMaintenance, materials: text })}
              style={styles.input}
            />
            <Button title="Carregar Foto" onPress={pickImage} />
            {photoUri && <Image source={{ uri: photoUri }} style={styles.photoPreview} />}

            <View style={styles.buttonContainer1}>
              <Button title="Cadastrar Manutenção" onPress={handleCreateMaintenance} />
              <View style={styles.space} />
              <Button title="Cancelar" onPress={() => setMaintenanceModalVisible(false)} />
            </View>
          </SafeAreaView>
        </Modal>
      </SafeAreaView>
    </>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonCreate: {
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  buttonContainer1: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  space: {
    width: 10,
  },
  photo: {
    width: 50,
    height: 50,
    margin: 5,
  },
  photoPreview: {
    width: 100,
    height: 100,
    margin: 5,
  },
});
