// CreateMaintenance.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useNavigation } from 'expo-router'; // Importação do useNavigation

const CreateMaintenance: React.FC = () => {
    const navigation = useNavigation(); // Use o hook para navegação
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [machineId, setMachineId] = useState('');

  const handleSubmit = () => {
    // Lógica para salvar a nova manutenção
    console.log('Manutenção criada:', { description, date, machineId });

    // Retornar à página anterior
    navigation.goBack(); // Navegar de volta
  };

  return (
    <View className="flex-1 bg-gray-100 p-4 mt-12">
      <Text className="text-xl font-bold mb-4">Cadastrar Manutenção</Text>
      <TextInput
        className="border border-gray-300 p-2 rounded mb-4"
        placeholder="Descrição"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        className="border border-gray-300 p-2 rounded mb-4"
        placeholder="Data (YYYY-MM-DD)"
        value={date}
        onChangeText={setDate}
      />
      <TextInput
        className="border border-gray-300 p-2 rounded mb-4"
        placeholder="ID da Máquina"
        value={machineId}
        onChangeText={setMachineId}
      />
      <Button title="Salvar" onPress={handleSubmit} />
    </View>
  );
};

export default CreateMaintenance;
