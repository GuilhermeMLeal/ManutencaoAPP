import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation, useRoute } from "@react-navigation/native";
import MachineService from "../../services/MachineService";
import { apiMachine, endpointMachine, endpointStatus } from "@/app/services/api";
import axios from "axios";

interface MachineDetails {
  Id: number;
  Name: string;
  Type: string;
  Model: string;
  ManufactureDate: string;
  SerialNumber: string;
  Status: string;
  PlaceId?: number | null;
}

const MachineDetailsScreen: React.FC = () => {
  const [machineDetails, setMachineDetails] = useState<MachineDetails | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  // Obtém o ID da máquina a partir dos parâmetros da rota
  const { itemId } = route.params;

  useEffect(() => {
    // Função assíncrona para buscar os detalhes da máquina
    const fetchData = async () => {
      try {
        // Busca os detalhes da máquina pelo ID
        const response = await apiMachine.get(`${endpointMachine.machine}/${itemId}`);
        console.log(response.data + "DADO INTEIRO")
        const details = response.data;
        console.log(details.statusId)
        let statusName = "N/A";
  
        try {
          // Busca o nome do status relacionado
          const statusResponse = await apiMachine.get(`${endpointStatus.status}/${details.statusId}`);
          statusName = statusResponse?.data?.name || "N/A";
        } catch (statusError: any) {
          if (statusError.response && statusError.response.status === 400) {
            console.warn(`Status não encontrado para ID ${details.status}. Usando "N/A".`);
          } else {
            console.error("Erro ao buscar status:", statusError);
            throw statusError; // Repassa outros erros para o bloco catch principal
          }
        }
  
        // Atualiza os detalhes da máquina
        setMachineDetails({
          Id: details.id,
          Name: details.name,
          Type: details.type,
          Model: details.model,
          ManufactureDate: details.manufactureDate,
          SerialNumber: details.serialNumber,
          Status: statusName,
          PlaceId: details.placeId,
        });
  
        setLoading(false);
      } catch (error: any) {
        console.error(`Erro ao buscar os detalhes da máquina para o ID ${itemId}:`, error);
        setError("Não foi possível carregar os detalhes da máquina.");
        setLoading(false);
      }
    };
  
    fetchData();
  }, [itemId]);
  
  const handleOpenMachineDetails = () => {
    navigation.navigate("MachineMaintenanceHistoryScreen", { itemId }); // Navega para a tela de histórico de manutenção
  };

  const handleEditMachine = () => {
    if (machineDetails) {
      navigation.navigate("EditMachineScreen", { machineDetails });
    }
  };
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

  if (!machineDetails) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Detalhes não disponíveis.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Icon name="info" size={30} color="#333" />
        <Text style={styles.title}>Detalhes da Máquina</Text>
      </View>
      <View style={styles.card}>
        <View style={styles.detail}>
          <Text style={styles.label}>Nome:</Text>
          <Text style={styles.value}>{machineDetails.Name}</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.label}>Modelo:</Text>
          <Text style={styles.value}>{machineDetails.Model}</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.label}>Data de Fabricação:</Text>
          <Text style={styles.value}>
            {new Date(machineDetails.ManufactureDate).toLocaleDateString()}
          </Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.label}>Número de Série:</Text>
          <Text style={styles.value}>{machineDetails.SerialNumber}</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.label}>Tipo:</Text>
          <Text style={styles.value}>{machineDetails.Type}</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.label}>Status:</Text>
          <Text style={styles.value}>{machineDetails.Status}</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.label}>Localização:</Text>
          <Text style={styles.value}>
            {machineDetails.PlaceId
              ? `Setor ${machineDetails.PlaceId}`
              : "Desconhecido"}
          </Text>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleEditMachine}>
        <Text style={styles.buttonText}>Editar Máquina</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleOpenMachineDetails}>
        <Text style={styles.buttonText}>
          Visualizar histórico de manutenção da máquina
        </Text>
      </TouchableOpacity>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 8,
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
  detail: {
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#555",
  },
  value: {
    fontSize: 16,
    color: "#777",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 24,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
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

export default MachineDetailsScreen;
