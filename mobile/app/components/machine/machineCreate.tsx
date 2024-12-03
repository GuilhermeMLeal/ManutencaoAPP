import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useNavigation } from 'expo-router'; // Importação do useNavigation

const CreateMachine: React.FC = () => {
  const navigation = useNavigation(); // Use o hook para navegação
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = () => {
    // Lógica para salvar a nova máquina
    console.log('Máquina criada:', { name, type, location });

    // Retornar à página anterior
    navigation.goBack(); // Navegar de volta
  };

  return (
    <View className="flex-1 bg-gray-100 p-4 mt-12">
      <Text className="text-xl font-bold mb-4">Cadastrar Máquina</Text>
      <TextInput
        className="border border-gray-300 p-2 rounded mb-4"
        placeholder="Nome da Máquina"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        className="border border-gray-300 p-2 rounded mb-4"
        placeholder="Tipo"
        value={type}
        onChangeText={setType}
      />
      <TextInput
        className="border border-gray-300 p-2 rounded mb-4"
        placeholder="Localização"
        value={location}
        onChangeText={setLocation}
      />
      <Button title="Salvar" onPress={handleSubmit} />
    </View>
  );
};

export default CreateMachine;
