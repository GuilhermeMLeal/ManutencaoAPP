import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { apiMaintenance, endpointMaintenance } from "../../services/api";
import FloatingButton from "../floatingButton";

interface MaintenancePart {
  id: number;
  maintenanceId: number;
  partId: number;
  quantity: number;
}

interface Maintenance {
  id: number;
  machineId: number;
  observations: string;
  lastUpdate: string;
  startDate: string;
  endDate: string;
  maintenanceParts: MaintenancePart[];
}

const MaintenanceListScreen: React.FC = () => {
  const [maintenances, setMaintenances] = useState<Maintenance[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchMaintenances = async () => {
      try {
        const response = await apiMaintenance.get(
          endpointMaintenance.maintenance
        );
        setMaintenances(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar manutenções:", error);
        setError("Não foi possível carregar as manutenções.");
        setLoading(false);
      }
    };

    fetchMaintenances();

    const unsubscribe = navigation.addListener("focus", () => {
      fetchMaintenances();
    });

    return unsubscribe;
  }, [navigation]);

  const renderMaintenance = ({ item }: { item: Maintenance }) => (
    <View style={styles.card}>
      <Text style={styles.title}>Manutenção #{item.id}</Text>
      <Text style={styles.detail}>
        <Text style={styles.label}>ID da Máquina: </Text>
        {item.machineId}
      </Text>
      <Text style={styles.detail}>
        <Text style={styles.label}>Observações: </Text>
        {item.observations}
      </Text>
      <Text style={styles.detail}>
        <Text style={styles.label}>Última Atualização: </Text>
        {new Date(item.lastUpdate).toLocaleString()}
      </Text>
      <Text style={styles.detail}>
        <Text style={styles.label}>Início: </Text>
        {new Date(item.startDate).toLocaleString()}
      </Text>
      <Text style={styles.detail}>
        <Text style={styles.label}>Fim: </Text>
        {new Date(item.endDate).toLocaleString()}
      </Text>
      <Text style={styles.label}>Peças:</Text>
      {item.maintenanceParts.map((part) => (
        <Text key={part.id} style={styles.partDetail}>
          - Peça #{part.partId}: {part.quantity} unidades
        </Text>
      ))}
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("MaintenanceDetailsScreen", {
            maintenanceId: item.id,
          })
        }
      >
        <Text style={styles.buttonText}>Ver Detalhes</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.loadingText}>Carregando manutenções...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={maintenances}
        renderItem={renderMaintenance}
        keyExtractor={(item: any) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
      <FloatingButton type="maintenance" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  listContainer: {
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  detail: {
    fontSize: 16,
    color: "#555",
    marginBottom: 4,
  },
  label: {
    fontWeight: "bold",
  },
  partDetail: {
    fontSize: 14,
    color: "#777",
    marginLeft: 16,
    marginBottom: 4,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 8,
    fontSize: 16,
    color: "#555",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  errorText: {
    fontSize: 18,
    color: "#ff0000",
    textAlign: "center",
    paddingHorizontal: 16,
  },
});

export default MaintenanceListScreen;
