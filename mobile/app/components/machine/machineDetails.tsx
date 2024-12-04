import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";

const mockMachineDetails = {
  model: "XYZ-1234",
  manufactureDate: "2022-06-15",
  serialNumber: "SN1234567890",
  description: "Fresa",
  location: "Setor A",
  condiction: "Bom",
  lastMaintenance: "2023-08-01",
  status: "Em Operação",
};

const MachineDetailsScreen: React.FC = () => {
  const navigation = useNavigation();

  const handleOpenMachineDetails = () => {
    navigation.navigate("MachineMaintenanceHistoryScreen"); // Navega para a tela de histórico de manutenção
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Icon name="info" size={30} color="#333" />
        <Text style={styles.title}>Detalhes da Máquina</Text>
      </View>
      <View style={styles.card}>
        <View style={styles.detail}>
          <Text style={styles.label}>Modelo:</Text>
          <Text style={styles.value}>{mockMachineDetails.model}</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.label}>Data de Fabricação:</Text>
          <Text style={styles.value}>
            {mockMachineDetails.manufactureDate}
          </Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.label}>Número de Série:</Text>
          <Text style={styles.value}>{mockMachineDetails.serialNumber}</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.label}>Descrição:</Text>
          <Text style={styles.value}>{mockMachineDetails.description}</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.label}>Localização:</Text>
          <Text style={styles.value}>{mockMachineDetails.location}</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.label}>Status:</Text>
          <Text style={styles.value}>{mockMachineDetails.status}</Text>
        </View>
        <View style={styles.detail}>
          <Text style={styles.label}>Última Manutenção:</Text>
          <Text style={styles.value}>
            {mockMachineDetails.lastMaintenance}
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
});

export default MachineDetailsScreen;
