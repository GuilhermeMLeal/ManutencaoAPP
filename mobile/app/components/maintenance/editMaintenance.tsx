import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useRoute, useNavigation } from "@react-navigation/native";
import {
  apiMachine,
  apiTool,
  apiMaintenance,
  endpointMachine,
  endpointTool,
  endpointMaintenance,
} from "@/app/services/api";

interface MaintenancePart {
  id: number;
  maintenanceId: number;
  partId: number;
  quantity: number;
}

interface Maintenance {
  id: number;
  machineId: number;
  machineName: string;
  observations: string;
  lastUpdate: string;
  startDate: string;
  endDate: string;
  maintenanceParts: MaintenancePart[];
}

const EditMaintenanceScreen: React.FC = () => {
  const route = useRoute<any>();
  const navigation = useNavigation();

  const { maintenanceId } = route.params;

  const [maintenance, setMaintenance] = useState<Maintenance | null>(null);
  const [machines, setMachines] = useState<{ id: number; name: string }[]>([]);
  const [tools, setTools] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState(true);

  const [currentPartId, setCurrentPartId] = useState<number | null>(null);
  const [currentQuantity, setCurrentQuantity] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch maintenance details
        const maintenanceResponse = await apiMaintenance.get(
          `${endpointMaintenance.maintenance}/${maintenanceId}`
        );
        const maintenanceData = maintenanceResponse.data;

        // Fetch machine name
        const machineResponse = await apiMachine.get(
          `${endpointMachine.machine}/${maintenanceData.machineId}`
        );
        const machineName = machineResponse?.data?.name || "N/A";

        setMaintenance({ ...maintenanceData, machineName });

        // Fetch machines
        const machinesResponse = await apiMachine.get(endpointMachine.machine);
        setMachines(machinesResponse.data);

        // Fetch tools
        const toolsResponse = await apiTool.get(endpointTool.tool);
        setTools(toolsResponse.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        Alert.alert("Erro", "Não foi possível carregar os dados.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [maintenanceId]);

  const handleAddPart = () => {
    if (!currentPartId || !currentQuantity) {
      Alert.alert("Erro", "Selecione uma peça e informe a quantidade.");
      return;
    }

    const quantity = parseInt(currentQuantity, 10);
    if (isNaN(quantity) || quantity <= 0) {
      Alert.alert("Erro", "A quantidade deve ser um número válido maior que zero.");
      return;
    }

    setMaintenance((prev: any) => {
      if (!prev) return prev;
      return {
        ...prev,
        maintenanceParts: [
          ...prev.maintenanceParts,
          { partId: currentPartId, quantity },
        ],
      };
    });
    setCurrentPartId(null);
    setCurrentQuantity("");
  };

  const handleRemovePart = (partId: number) => {
    setMaintenance((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        maintenanceParts: prev.maintenanceParts.filter((part) => part.partId !== partId),
      };
    });
  };

  const handleSave = async () => {
    if (!maintenance) return;

    try {
      const response = await apiMaintenance.put(
        `${endpointMaintenance.maintenance}`,
        maintenance
      );

      if (response.status === 204) {
        Alert.alert("Sucesso", "Manutenção atualizada com sucesso!");
        navigation.goBack();
      } else {
        throw new Error("Erro ao atualizar manutenção");
      }
    } catch (error) {
      console.error("Erro ao salvar a manutenção:", error);
      Alert.alert("Erro", "Não foi possível salvar as alterações.");
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text>Carregando detalhes...</Text>
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
      <Text style={styles.title}>Editar Manutenção</Text>
      <TextInput
        style={styles.input}
        placeholder="Observações"
        value={maintenance.observations}
        onChangeText={(text) =>
          setMaintenance((prev) => (prev ? { ...prev, observations: text } : prev))
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Data Inicial (YYYY-MM-DD)"
        value={maintenance.startDate}
        onChangeText={(text) =>
          setMaintenance((prev) => (prev ? { ...prev, startDate: text } : prev))
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Data Final (YYYY-MM-DD)"
        value={maintenance.endDate}
        onChangeText={(text) =>
          setMaintenance((prev) => (prev ? { ...prev, endDate: text } : prev))
        }
      />
      <Text style={styles.label}>Selecione a Máquina:</Text>
      <Picker
        selectedValue={maintenance.machineId}
        onValueChange={(value) =>
          setMaintenance((prev) => (prev ? { ...prev, machineId: value } : prev))
        }
        style={styles.picker}
      >
        {machines.map((machine) => (
          <Picker.Item key={machine.id} label={machine.name} value={machine.id} />
        ))}
      </Picker>
      <Text style={styles.label}>Peças Utilizadas:</Text>
      {maintenance.maintenanceParts.map((part) => (
        <View key={part.id} style={styles.partItem}>
          <Text>
            Peça ID: {part.partId} - Quantidade: {part.quantity}
          </Text>
          <TouchableOpacity onPress={() => handleRemovePart(part.partId)}>
            <Text style={styles.removeButton}>Remover</Text>
          </TouchableOpacity>
        </View>
      ))}
      <Text style={styles.label}>Adicionar Nova Peça:</Text>
      <View style={styles.partInputContainer}>
        <Picker
          selectedValue={currentPartId}
          onValueChange={(value) => setCurrentPartId(value)}
          style={[styles.picker, styles.partPicker]}
        >
          <Picker.Item label="Selecione uma peça" value={null} />
          {tools.map((tool) => (
            <Picker.Item key={tool.id} label={tool.name} value={tool.id} />
          ))}
        </Picker>
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
      <Button title="Salvar Alterações" onPress={handleSave} />
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
    padding: 8,
    marginBottom: 16,
  },
  partInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  partPicker: {
    flex: 2,
    marginRight: 8,
  },
  partInput: {
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    backgroundColor: "#fff",
  },
  addButton: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  partItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
    padding: 8,
    backgroundColor: "#e9e9e9",
    borderRadius: 8,
  },
  removeButton: {
    color: "#ff0000",
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


export default EditMaintenanceScreen;
