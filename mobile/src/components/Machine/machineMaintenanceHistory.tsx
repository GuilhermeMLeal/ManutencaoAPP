import React from 'react';
import { View, Text, ScrollView } from 'react-native';

// Dados mockados para o histórico de manutenções
const maintenanceHistory = [
  { id: '1', startDate: '2024-09-20', endDate: '2024-09-30', cost: '$150.00', description: 'Troca de óleo e filtro.' },
  { id: '2', startDate: '2024-08-05', endDate: '2024-08-10', cost: '$200.00', description: 'Reparo no sistema de ar condicionado.' },
  { id: '3', startDate: '2024-07-15', endDate: '2024-07-20', cost: '$100.00', description: 'Substituição de peças quebradas.' },
  { id: '4', startDate: '2024-06-01', endDate: '2024-06-05', cost: '$250.00', description: 'Manutenção geral e calibração.' },
];

const MachineMaintenanceHistoryScreen = () => {
  return (
    <ScrollView className="flex-1 bg-gray-100 p-5 mt-12">
      <Text className="text-2xl font-bold mb-4">Histórico de Manutenções</Text>

      {/* Lista de Manutenções */}
      <View>
        {maintenanceHistory.map(maintenance => (
          <View
            key={maintenance.id}
            className="bg-white border border-gray-300 p-4 rounded mb-4"
          >
            <Text className="text-lg font-semibold">Período:</Text>
            <Text>{maintenance.startDate} a {maintenance.endDate}</Text>
            <Text className="text-lg font-semibold mt-2">Custo:</Text>
            <Text>{maintenance.cost}</Text>
            <Text className="text-lg font-semibold mt-2">Descrição:</Text>
            <Text>{maintenance.description}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default MachineMaintenanceHistoryScreen;
