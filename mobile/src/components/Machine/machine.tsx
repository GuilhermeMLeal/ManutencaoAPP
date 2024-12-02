import React from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from 'expo-router';
import Card from '../card'; 
import FloatingButton from '../floatingButton';

type Machine = {
  id: string;
  name: string;
  type: string;
  location: string;
};

const mockMachines: Machine[] = [
  { id: '1', name: 'Máquina A', type: '1', location: 'Setor 1' },
  { id: '2', name: 'Máquina B', type: '2', location: 'Setor 2' },
  { id: '3', name: 'Máquina C', type: '3', location: 'Setor 3' },
  { id: '4', name: 'Máquina D', type: '4', location: 'Setor 4' },
  { id: '5', name: 'Máquina E', type: '5', location: 'Setor 5' },
];

const MachineScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  
  const handlePress = (itemId: string) => {
    navigation.navigate('MachineDetails', {
      itemId: itemId,
      otherParam: 'any value',
    });
  };

  const renderItem = ({ item }: { item: Machine }) => (
    <TouchableOpacity onPress={() => handlePress(item.id)}>
      <Card
        title={item.name}
        field={{
          Tipo: item.type,
          Localização: item.location,
        }}
        icons={[]} 
        onIconPress={() => {}} 
      />
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-100 p-4 mt-12">
      <FlatList
        data={mockMachines}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <FloatingButton type="machine" />
    </View>
  );
};

export default MachineScreen;
