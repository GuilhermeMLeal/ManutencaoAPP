import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MachineMaintenanceHistoryScreen from './machineMaintenanceHistory';
import { useNavigation } from '@react-navigation/native';

const mockMachineDetails = {
  model: 'XYZ-1234',
  manufactureDate: '2022-06-15',
  serialNumber: 'SN1234567890',
  description: 'Fresa',
  location: 'Setor A',
  condiction: 'Bom',
  lastMaintenance: '2023-08-01',
  status: 'Em Operação',

};

const MachineDetailsScreen: React.FC = () => {
  const navigation = useNavigation();

  const handleOpenMachineDetails = () => {
    navigation.navigate('MachineMaintenanceHistoryScreen'); // Navega para a tela de histórico de manutenção
  };

  return (
    <ScrollView className="flex-1 bg-gray-100 p-4 mt-12">
      <View className="flex-row items-center mb-5">
        <Icon name="info" size={30} color="#333" />
        <Text className="text-2xl font-bold ml-3">Detalhes da Máquina</Text>
      </View>
      <View className="bg-white rounded-lg p-4 shadow-md">
        <View className="mb-4">
          <Text className="text-lg font-semibold text-gray-700">Modelo:</Text>
          <Text className="text-lg text-gray-600">{mockMachineDetails.model}</Text>
        </View>
        <View className="mb-4">
          <Text className="text-lg font-semibold text-gray-700">Data de Fabricação:</Text>
          <Text className="text-lg text-gray-600">{mockMachineDetails.manufactureDate}</Text>
        </View>
        <View className="mb-4">
          <Text className="text-lg font-semibold text-gray-700">Número de Série:</Text>
          <Text className="text-lg text-gray-600">{mockMachineDetails.serialNumber}</Text>
        </View>
        <View className="mb-4">
          <Text className="text-lg font-semibold text-gray-700">Descrição:</Text>
          <Text className="text-lg text-gray-600">{mockMachineDetails.description}</Text>
        </View>
        <View className="mb-4">
          <Text className="text-lg font-semibold text-gray-700">Localização:</Text>
          <Text className="text-lg text-gray-600">{mockMachineDetails.location}</Text>
        </View>
        <View className="mb-4">
          <Text className="text-lg font-semibold text-gray-700">Status:</Text>
          <Text className="text-lg text-gray-600">{mockMachineDetails.status}</Text>
        </View>
        <View className="mb-4">
          <Text className="text-lg font-semibold text-gray-700">Última Manutenção:</Text>
          <Text className="text-lg text-gray-600">{mockMachineDetails.lastMaintenance}</Text>
        </View>
      </View>
      <TouchableOpacity 
        className="bg-blue-500 p-3 rounded mt-5"
        onPress={handleOpenMachineDetails}
      >
        <Text className="text-white text-center text-lg">Visualizar histórico de manutenção da máquina</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default MachineDetailsScreen;
