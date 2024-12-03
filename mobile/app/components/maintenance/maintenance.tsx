import React from "react";
import { Button, View, Text, FlatList } from "react-native";
import { useTailwind } from "nativewind";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "expo-router";
import Icon from 'react-native-vector-icons/FontAwesome'; // Exemplo com FontAwesome
import FloatingButton from "../floatingButton";

type MaintenanceRecord = {
  machine_id: string;
  id: string;
  date: string;
  status: number;
};
/* Status:
 0- Concluído 
 1- Em Andamento 
 2- Pendente
*/

const transformStringStatus = (status: number): string => {
  if (status === 0) return "Concluído";
  else if (status === 1) return "Em Andamento";
  else return "Pendente";
};

const transformColorStatus = (status: number): string => {
  if (status === 0) {
    return "custom-green";
  } else if (status === 1) {
    return "custom-yellow";
  } else {
    return "custom-red";
  }
};

const mockMaintenanceRecords: MaintenanceRecord[] = [
  { id: "1", date: "2024-09-10", machine_id: "1", status: 0 },
  { id: "2", date: "2024-09-08", machine_id: "1", status: 1 },
  { id: "3", date: "2024-09-05", machine_id: "1", status: 2 },
  { id: "4", date: "2024-09-01", machine_id: "1", status: 0 },
  { id: "5", date: "2024-09-10", machine_id: "1", status: 0 },
  { id: "6", date: "2024-09-08", machine_id: "1", status: 1 },
  { id: "7", date: "2024-09-05", machine_id: "1", status: 2 },
  { id: "8", date: "2024-09-01", machine_id: "1", status: 0 },
];

const MaintenanceHistoryScreen: React.FC = () => {
  const navigation = useNavigation<any>(); // Idealmente, defina um tipo específico para a navegação
  const handlePress = () => {
    navigation.navigate("RegisterParts");
  };

  const renderItem = ({ item }: { item: MaintenanceRecord }) => {
    const bgColor =
      item.status === 0
        ? "bg-custom-green"
        : item.status === 1
        ? "bg-custom-yellow"
        : "bg-custom-red";
    return (
      <TouchableOpacity onPress={handlePress}>
        <View className={`rounded mb-2 ${bgColor}`}>
          <View className="bg-white p-4 ml-2 rounded flex-row justify-between ">
            <View>
              <Text className="text-lg font-bold mb-1">{item.date}</Text>
              <Text className="text-bold-600">Máquina: {item.machine_id}</Text>
              <Text className="text-gray-600">
                Status: {transformStringStatus(item.status)}
              </Text>
            </View>
            <Icon name="pencil" size={20} />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1 bg-gray-100 p-4 mt-12">
      <FlatList
        data={mockMaintenanceRecords}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <FloatingButton type="maintenance" />
    </View>
  );
};

export default MaintenanceHistoryScreen;
