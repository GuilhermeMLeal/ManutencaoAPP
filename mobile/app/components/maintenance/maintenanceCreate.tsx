import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "expo-router";
import { apiMachine, endpointMaintenance, endpointMachine, apiMaintenance } from "@/app/services/api";

const CreateMaintenance: React.FC = () => {
  const navigation = useNavigation();
  const [observations, setObservations] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [machineId, setMachineId] = useState<number | null>(null);
  const [machines, setMachines] = useState<{ id: number; name: string }[]>([]);
  const [maintenanceParts, setMaintenanceParts] = useState<
    { partId: number; quantity: number }[]
  >([]);
  const [currentPartId, setCurrentPartId] = useState<number | null>(null);
  const [currentQuantity, setCurrentQuantity] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Busca as máquinas para preencher o dropdown
    const fetchMachines = async () => {
      try {
        const response = await apiMachine.get(endpointMachine.machine);
        setMachines(response.data);
      } catch (error) {
        console.error("Erro ao buscar máquinas:", error);
        Alert.alert("Erro", "Não foi possível carregar as máquinas.");
      } finally {
        setLoading(false);
      }
    };

    fetchMachines();
  }, []);

  const handleAddPart = () => {
    if (!currentPartId || !currentQuantity) {
      Alert.alert("Erro", "Informe o ID da peça e a quantidade.");
      return;
    }

    const quantity = parseInt(currentQuantity, 10);
    if (isNaN(quantity) || quantity <= 0) {
      Alert.alert("Erro", "A quantidade deve ser um número válido maior que zero.");
      return;
    }

    setMaintenanceParts([...maintenanceParts, { partId: currentPartId, quantity }]);
    setCurrentPartId(null);
    setCurrentQuantity("");
  };

  const handleSubmit = async () => {
    if (!observations || !startDate || !endDate || !machineId) {
      Alert.alert("Erro", "Todos os campos são obrigatórios.");
      return;
    }

    if (maintenanceParts.length === 0) {
      Alert.alert("Erro", "Adicione pelo menos uma peça de manutenção.");
      return;
    }

    const maintenance = {
      machineId,
      observations,
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
      maintenanceParts,
    };

    try {
      const response = await apiMaintenance.post(endpointMaintenance.maintenance, maintenance);
      if (response.status === 201) {
        Alert.alert("Sucesso", "Manutenção criada com sucesso!");
        navigation.goBack();
      } else {
        throw new Error(`Erro: ${response.status}`);
      }
    } catch (error: any) {
      console.error("Erro ao criar a manutenção:", error);
      Alert.alert("Erro", "Não foi possível criar a manutenção.");
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text>Carregando máquinas...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Cadastrar Manutenção</Text>
      <TextInput
        style={styles.input}
        placeholder="Observações"
        value={observations}
        onChangeText={setObservations}
      />
      <TextInput
        style={styles.input}
        placeholder="Data Inicial (YYYY-MM-DD)"
        value={startDate}
        onChangeText={setStartDate}
      />
      <TextInput
        style={styles.input}
        placeholder="Data Final (YYYY-MM-DD)"
        value={endDate}
        onChangeText={setEndDate}
      />
      <Text style={styles.label}>Selecione a Máquina:</Text>
      <Picker
        selectedValue={machineId}
        onValueChange={(itemValue) => setMachineId(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Selecione uma máquina" value={null} />
        {machines.map((machine) => (
          <Picker.Item key={machine.id} label={machine.name} value={machine.id} />
        ))}
      </Picker>
      <Text style={styles.label}>Peças de Manutenção:</Text>
      <View style={styles.partInputContainer}>
        <TextInput
          style={[styles.input, styles.partInput]}
          placeholder="ID da Peça"
          value={currentPartId ? currentPartId.toString() : ""}
          onChangeText={(text) => setCurrentPartId(Number(text))}
          keyboardType="numeric"
        />
        <TextInput
          style={[styles.input, styles.partInput]}
          placeholder="Quantidade"
          value={currentQuantity}
          onChangeText={setCurrentQuantity}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddPart}>
          <Text style={styles.addButtonText}>Adicionar</Text>
        </TouchableOpacity>
      </View>
      {maintenanceParts.map((part, index) => (
        <View key={index} style={styles.partItem}>
          <Text>Peça ID: {part.partId}</Text>
          <Text>Quantidade: {part.quantity}</Text>
        </View>
      ))}
      <Button title="Salvar" onPress={handleSubmit} />
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
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#fff",
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#555",
  },
  picker: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#fff",
    padding: 12,
    marginBottom: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  partInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  partInput: {
    flex: 1,
    marginRight: 8,
  },
  addButton: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 8,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  partItem: {
    marginBottom: 8,
    padding: 8,
    backgroundColor: "#e9e9e9",
    borderRadius: 8,
  },
});

export default CreateMaintenance;
