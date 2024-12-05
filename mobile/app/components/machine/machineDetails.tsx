import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation, useRoute } from "@react-navigation/native";
import MachineService from "../../services/MachineService";
import { apiMachine, endpointMachine } from "@/app/services/api";
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
    // Busca os detalhes da máquina com base no ID
    apiMachine.get(`${endpointMachine.machine}/${itemId}`)
      .then((response) => {
        const details = response.data; // Os dados da máquina estão em `response.data`

        console.log("Dados recebidos:", details);
    
        setMachineDetails({
          Id: details.id, // Atualize os campos para corresponder ao retorno da API
          Name: details.name,
          Type: details.type,
          Model: details.model,
          ManufactureDate: details.manufactureDate,
          SerialNumber: details.serialNumber,
          Status: details.status,
          PlaceId: details.placeId,
        });
    
        console.log("Detalhes da máquina:", details);
        setLoading(false);
      })
      .catch((err) => {
        console.error(`Error fetching machine details for ID ${itemId}:`, err);
        setError("Não foi possível carregar os detalhes da máquina.");
        setLoading(false);
      });
  }, [itemId]);

  const handleOpenMachineDetails = () => {
    navigation.navigate("MachineMaintenanceHistoryScreen", { itemId }); // Navega para a tela de histórico de manutenção
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
