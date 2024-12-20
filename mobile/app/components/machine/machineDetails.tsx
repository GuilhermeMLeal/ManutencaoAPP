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
import { apiMachine, endpointMachine, endpointStatus, endpointPlace } from "@/app/services/api";
import { useReloadContext } from "@/app/context/reloadContext";
interface MachineDetails {
  Id: number;
  Name: string;
  Type: string;
  Model: string;
  ManufactureDate: string;
  SerialNumber: string;
  Status: string;
  StatusId: number;
  PlaceName?: string; // Nome da localização
  PlaceId?: number | null;
}

const MachineDetailsScreen: React.FC = () => {
  const [machineDetails, setMachineDetails] = useState<MachineDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { reloadKey } = useReloadContext();
  // Obtém o ID da máquina a partir dos parâmetros da rota
  const { itemId } = route.params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiMachine.get(`${endpointMachine.machine}/${itemId}`);
        const details = response.data;
  
        let statusName = "N/A";
        let placeName = "Desconhecido";
        try {
          const statusResponse = await apiMachine.get(`${endpointStatus.status}/${details.statusId}`);
          statusName = statusResponse?.data?.name || "N/A";
        } catch (statusError: any) {
          console.warn("Erro ao buscar o status:", statusError.message);
        }
        try {
          const statusResponse = await apiMachine.get(`${endpointPlace.place}/${details.placeId}`);
          placeName = statusResponse?.data?.name || "N/A";
        } catch (statusError: any) {
          console.warn("Erro ao buscar o status:", statusError.message);
        }
  
        setMachineDetails({
          Id: details.id,
          Name: details.name || "N/A",
          Type: details.type || "N/A",
          Model: details.model || "N/A",
          ManufactureDate: details.manufactureDate || "N/A",
          SerialNumber: details.serialNumber || "N/A",
          Status: statusName, // Nome do status (para exibição)
          StatusId: details.statusId, // Adicione o ID do status
          PlaceId: details.placeId,
          PlaceName: placeName,
        });
  
        setLoading(false);
      } catch (error: any) {
        console.error(`Erro ao buscar os detalhes da máquina para o ID ${itemId}:`, error);
        setError("Não foi possível carregar os detalhes da máquina.");
        setLoading(false);
      }
    };

    const unsubscribe = navigation.addListener("focus", () => {
      fetchData(); // Recarrega os dados ao voltar para a tela
    });
    fetchData();
    return unsubscribe;
    
  }, [itemId, navigation]);
  

  const handleEditMachine = () => {
    if (machineDetails) {
      navigation.navigate("EditMachineScreen", { machineDetails });
    }
  };

  const handleDeleteMachine = async () => {
    Alert.alert(
      "Confirmar Exclusão",
      "Tem certeza de que deseja excluir esta máquina?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              await apiMachine.delete(`${endpointMachine.machine}/${itemId}`);
              Alert.alert("Sucesso", "Máquina excluída com sucesso.");
              navigation.goBack();
            } catch (error) {
              console.error("Erro ao excluir a máquina:", error);
              Alert.alert("Erro", "Não foi possível excluir a máquina.");
            }
          },
        },
      ]
    );
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
          <Text style={styles.value}>{machineDetails.PlaceName}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleEditMachine}>
        <Text style={styles.buttonText}>Editar Máquina</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleDeleteMachine}>
        <Text style={styles.buttonText}>Excluir Máquina</Text>
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
