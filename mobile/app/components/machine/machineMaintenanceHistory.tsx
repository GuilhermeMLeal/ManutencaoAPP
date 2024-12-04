import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

// Dados mockados para o histórico de manutenções
const maintenanceHistory = [
  {
    id: "1",
    startDate: "2024-09-20",
    endDate: "2024-09-30",
    cost: "$150.00",
    description: "Troca de óleo e filtro.",
  },
  {
    id: "2",
    startDate: "2024-08-05",
    endDate: "2024-08-10",
    cost: "$200.00",
    description: "Reparo no sistema de ar condicionado.",
  },
  {
    id: "3",
    startDate: "2024-07-15",
    endDate: "2024-07-20",
    cost: "$100.00",
    description: "Substituição de peças quebradas.",
  },
  {
    id: "4",
    startDate: "2024-06-01",
    endDate: "2024-06-05",
    cost: "$250.00",
    description: "Manutenção geral e calibração.",
  },
];

const MachineMaintenanceHistoryScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Histórico de Manutenções</Text>

      {/* Lista de Manutenções */}
      <View>
        {maintenanceHistory.map((maintenance) => (
          <View key={maintenance.id} style={styles.card}>
            <Text style={styles.label}>Período:</Text>
            <Text style={styles.text}>
              {maintenance.startDate} a {maintenance.endDate}
            </Text>
            <Text style={[styles.label, styles.spacing]}>Custo:</Text>
            <Text style={styles.text}>{maintenance.cost}</Text>
            <Text style={[styles.label, styles.spacing]}>Descrição:</Text>
            <Text style={styles.text}>{maintenance.description}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
    paddingTop: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#555",
  },
  text: {
    fontSize: 16,
    color: "#777",
  },
  spacing: {
    marginTop: 8,
  },
});

export default MachineMaintenanceHistoryScreen;
