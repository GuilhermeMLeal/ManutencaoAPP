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
    description: 'Troca de filtro de óleo - Máquina X',
    priority: 'Alta',
    responsible: 'João',
    status: 'Pendente',
    materials: ['Filtro de óleo', 'Chave de fenda'],
    photos: [],
    date: '2024-09-19',
  },
  {
    id: 2,
    description: 'Reparo na suspensão - Máquina Y',
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
  const [addMaterialModalVisible, setAddMaterialModalVisible] = useState(false);
  const [materialInput, setMaterialInput] = useState('');
  const [materialsList, setMaterialsList] = useState<string[]>([]);
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [newMaintenance, setNewMaintenance] = useState({
    description: '',
    priority: '',
    responsible: '',
    comments: '',
  });
  const [currentMaintenanceId, setCurrentMaintenanceId] = useState<number | null>(null);

  const handleCreateMaintenance = () => {
    if (newMaintenance.description && newMaintenance.priority && newMaintenance.responsible) {
      const newId = maintenances.length + 1;
      const newDate = new Date().toISOString().split('T')[0];

      const newEntry = {
        id: newId,
        ...newMaintenance,
        status: 'Pendente',
        materials: materialsList.length ? materialsList : [],
        photos: photoUri ? [photoUri] : [],
        date: newDate,
      };
      setMaintenances(prev => [...prev, newEntry]);
      Alert.alert('Sucesso', 'Manutenção criada com sucesso.');
      resetForm();
      setMaintenanceModalVisible(false);
    } else {
      Alert.alert('Erro', 'Preencha todos os campos para criar uma manutenção.');
    }
  };

  const resetForm = () => {
    setNewMaintenance({ description: '', priority: '', responsible: '', comments: '' });
    setMaterialsList([]);
    setPhotoUri(null);
  };

  const addMaterial = () => {
    if (materialInput && currentMaintenanceId !== null) {
      setMaintenances(prev => 
        prev.map(item => 
          item.id === currentMaintenanceId 
            ? { ...item, materials: [...item.materials, materialInput] } 
            : item
        )
      );
      setMaterialInput('');
      setAddMaterialModalVisible(false);
    } else {
      Alert.alert('Erro', 'Digite um material antes de adicionar.');
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
          <Icon name="edit" onPress={() => {}} />
          <Icon name="delete" onPress={() => {}} />
          <Button title="Adicionar Peça" onPress={() => handleAddMaterialClick(item.id)} />
        </View>
      </ListItem.Content>
    </ListItem>
  );

  const handleAddMaterialClick = (id: number) => {
    setCurrentMaintenanceId(id);
    setMaterialInput('');
    setAddMaterialModalVisible(true); 
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Lista de Manutenções</Text>
        <Button
          title="Cadastrar Manutenção"
          onPress={() => setMaintenanceModalVisible(true)}
          color="#3498db"
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

            <Text style={styles.sectionTitle}>Descrição da Manutenção</Text>
            <TextInput
              placeholder="Descrição do problema"
              value={newMaintenance.description}
              onChangeText={(text) => setNewMaintenance({ ...newMaintenance, description: text })}
              style={styles.input}
            />
            
            <Text style={styles.sectionTitle}>Prioridade e Responsável</Text>
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

            <Text style={styles.sectionTitle}>Materiais</Text>
            <Button title="Adicionar Peça" onPress={() => setAddMaterialModalVisible(true)} />
            {materialsList.length > 0 && (
              <View style={styles.materialsContainer}>
                <Text>Peças Adicionadas:</Text>
                {materialsList.map((material, index) => (
                  <Text key={index} style={styles.materialItem}>{material}</Text>
                ))}
              </View>
            )}

            <Text style={styles.sectionTitle}>Fotos</Text>
            <Button title="Carregar Foto" onPress={pickImage} />
            {photoUri && <Image source={{ uri: photoUri }} style={styles.photoPreview} />}

            <View style={styles.buttonContainer1}>
              <Button title="Cadastrar Manutenção" onPress={handleCreateMaintenance} color="green" />
              <View style={styles.space} />
              <Button title="Cancelar" onPress={() => setMaintenanceModalVisible(false)} color="red" />
            </View>
          </SafeAreaView>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={addMaterialModalVisible}
          onRequestClose={() => setAddMaterialModalVisible(false)}
        >
          <SafeAreaView style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Adicionar Material</Text>
            <TextInput
              placeholder="Nome do material"
              value={materialInput}
              onChangeText={setMaterialInput}
              style={styles.input}
            />
            <View style={styles.buttonContainer1}>
              <Button title="Adicionar" onPress={addMaterial} color="green" />
              <View style={styles.space} />
              <Button title="Cancelar" onPress={() => setAddMaterialModalVisible(false)} color="red" />
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  buttonContainer1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  photo: {
    width: 50,
    height: 50,
    marginVertical: 5,
  },
  photoPreview: {
    width: 100,
    height: 100,
    marginVertical: 5,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  materialsContainer: {
    marginVertical: 10,
  },
  materialItem: {
    fontSize: 14,
    marginVertical: 2,
  },
  space: {
    width: 10,
  },
});
