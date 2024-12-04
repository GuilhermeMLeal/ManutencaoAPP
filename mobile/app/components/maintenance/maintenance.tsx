import React from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome";
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
    return "#4CAF50"; // Verde para "Concluído"
  } else if (status === 1) {
    return "#FFC107"; // Amarelo para "Em Andamento"
  } else {
    return "#F44336"; // Vermelho para "Pendente"
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
    const bgColor = transformColorStatus(item.status);
    return (
      <TouchableOpacity onPress={handlePress}>
        <View style={[styles.card, { backgroundColor: bgColor }]}>
          <View style={styles.cardContent}>
            <View>
              <Text style={styles.date}>{item.date}</Text>
              <Text style={styles.machine}>Máquina: {item.machine_id}</Text>
              <Text style={styles.status}>
                Status: {transformStringStatus(item.status)}
              </Text>
            </View>
            <Icon name="pencil" size={20} color="#333" />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={mockMaintenanceRecords}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <FloatingButton type="maintenance" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
    paddingTop: 24,
  },
  card: {
    borderRadius: 8,
    marginBottom: 12,
    padding: 8,
  },
  cardContent: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  date: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#333",
  },
  machine: {
    fontSize: 16,
    color: "#555",
    marginBottom: 4,
  },
  status: {
    fontSize: 16,
    color: "#777",
  },
});

export default MaintenanceHistoryScreen;
