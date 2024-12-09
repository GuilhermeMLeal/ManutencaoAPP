import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { apiMachine, endpointMaintenance, endpointMachine, apiMaintenance } from "@/app/services/api";

interface MaintenancePart {
  id: number;
  maintenanceId: number;
  partId: number;
  quantity: number;
}

interface Maintenance {
  id: number;
  machineId: number;
  machineName: string; // Novo campo para o nome da máquina
  observations: string;
  lastUpdate: string;
  startDate: string;
  endDate: string;
  maintenanceParts: MaintenancePart[];
}

const MaintenanceDetailsScreen: React.FC = () => {
  const [maintenance, setMaintenance] = useState<Maintenance | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const route = useRoute<any>();

  // Obtém o ID da manutenção a partir dos parâmetros da rota
  const { maintenanceId } = route.params;

  useEffect(() => {
    const fetchMaintenanceDetails = async () => {
      try {
        // Busca os detalhes da manutenção pelo ID
        const maintenanceResponse = await apiMaintenance.get(
          `${endpointMaintenance.maintenance}/${maintenanceId}`
        );
        const maintenanceData = maintenanceResponse.data;

        let machineName = "N/A";

        try {
          // Busca o nome da máquina pelo machineId
          const machineResponse = await apiMachine.get(
            `${endpointMachine.machine}/${maintenanceData.machineId}`
          );
          machineName = machineResponse?.data?.name || "N/A";
        } catch (machineError: any) {
          if (machineError.response && machineError.response.status === 404) {
            console.warn(
              `Máquina não encontrada para ID ${maintenanceData.machineId}. Usando "N/A".`
            );
          } else {
            console.error("Erro ao buscar detalhes da máquina:", machineError);
            throw machineError; // Repassa outros erros para o bloco catch principal
          }
        }

        // Atualiza os detalhes da manutenção com o nome da máquina
        setMaintenance({
          ...maintenanceData,
          machineName, // Adiciona o nome da máquina
        });

        setLoading(false);
      } catch (error: any) {
        console.error(
          `Erro ao buscar os detalhes da manutenção para o ID ${maintenanceId}:`,
          error
        );
        setError("Não foi possível carregar os detalhes da manutenção.");
        setLoading(false);
      }
    };

    fetchMaintenanceDetails();
  }, [maintenanceId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.loadingText}>Carregando detalhes...</Text>
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

  if (!maintenance) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Detalhes não disponíveis.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Detalhes da Manutenção</Text>
      <View style={styles.card}>
        <Text style={styles.label}>ID:</Text>
        <Text style={styles.value}>{maintenance.id}</Text>

        <Text style={styles.label}>Nome da Máquina:</Text>
        <Text style={styles.value}>{maintenance.machineName}</Text>

        <Text style={styles.label}>Observações:</Text>
        <Text style={styles.value}>{maintenance.observations}</Text>

        <Text style={styles.label}>Última Atualização:</Text>
        <Text style={styles.value}>
          {new Date(maintenance.lastUpdate).toLocaleString()}
        </Text>

        <Text style={styles.label}>Início:</Text>
        <Text style={styles.value}>
          {new Date(maintenance.startDate).toLocaleString()}
        </Text>

        <Text style={styles.label}>Fim:</Text>
        <Text style={styles.value}>
          {new Date(maintenance.endDate).toLocaleString()}
        </Text>

        <Text style={styles.label}>Peças Utilizadas:</Text>
        {maintenance.maintenanceParts.map((part) => (
          <View key={part.id} style={styles.partDetail}>
            <Text style={styles.value}>
              Peça #{part.partId} - {part.quantity} unidades
            </Text>
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#555",
  },
  value: {
    fontSize: 16,
    marginBottom: 12,
    color: "#777",
  },
  partDetail: {
    marginLeft: 16,
    marginBottom: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
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

export default MaintenanceDetailsScreen;
