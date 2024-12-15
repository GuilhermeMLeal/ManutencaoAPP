import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { apiMachine, endpointStatus, endpointPlace, endpointMachine } from "@/app/services/api";
import { Picker } from "@react-native-picker/picker";

const EditMachineScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const { machineDetails: initialMachineDetails } = route.params;

  const [machineDetails, setMachineDetails] = useState({
    ...initialMachineDetails,
    StatusId: initialMachineDetails.StatusId || null, // Use o ID do status
  });

  const [statuses, setStatuses] = useState<{ id: number; name: string }[]>([]);
  const [places, setPlaces] = useState<{ id: number; name: string }[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const [statusResponse, placeResponse] = await Promise.all([
          apiMachine.get(endpointStatus.status),
          apiMachine.get(endpointPlace.place),
        ]);

        setStatuses(statusResponse.data);
        setPlaces(placeResponse.data);
      } catch (err) {
        Alert.alert("Erro", "Não foi possível carregar dados adicionais.");
      }
    };

    fetchDropdownData();
  }, []);

  const handleSave = async () => {
    const dataToSave = {
      id: machineDetails.Id,
      name: machineDetails.Name,
      type: machineDetails.Type,
      model: machineDetails.Model,
      manufactureDate: machineDetails.ManufactureDate,
      serialNumber: machineDetails.SerialNumber,
      statusId: machineDetails.StatusId, // Envie o ID do status
      placeId: machineDetails.PlaceId,
    };

    console.log("Dados enviados:", dataToSave);
    setSaving(true);
    try {
      await apiMachine.put(`${endpointMachine.machine}`, dataToSave);
      Alert.alert("Sucesso", "Os dados foram salvos!");
      navigation.goBack();
    } catch (error: any) {
      console.error("Erro ao salvar máquina:", error.response?.data || error);
      Alert.alert("Erro", "Não foi possível salvar os dados.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Editar Máquina</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={machineDetails.Name}
        onChangeText={(text) => setMachineDetails({ ...machineDetails, Name: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Modelo"
        value={machineDetails.Model}
        onChangeText={(text) => setMachineDetails({ ...machineDetails, Model: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Tipo"
        value={machineDetails.Type}
        onChangeText={(text) => setMachineDetails({ ...machineDetails, Type: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Número de Série"
        value={machineDetails.SerialNumber}
        onChangeText={(text) => setMachineDetails({ ...machineDetails, SerialNumber: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Data de Fabricação (YYYY-MM-DD)"
        value={machineDetails.ManufactureDate}
        onChangeText={(text) => setMachineDetails({ ...machineDetails, ManufactureDate: text })}
      />

      <Text style={styles.label}>Status:</Text>
      <Picker
        selectedValue={machineDetails.StatusId}
        onValueChange={(value: number) => setMachineDetails({ ...machineDetails, StatusId: value })}
        style={styles.picker}
      >
        {statuses.map((status) => (
          <Picker.Item key={status.id} label={status.name} value={status.id} />
        ))}
      </Picker>

      <Text style={styles.label}>Localização:</Text>
      <Picker
        selectedValue={machineDetails.PlaceId}
        onValueChange={(value: number) => setMachineDetails({ ...machineDetails, PlaceId: value })}
        style={styles.picker}
      >
        {places.map((place) => (
          <Picker.Item key={place.id} label={place.name} value={place.id} />
        ))}
      </Picker>

      <Button title={saving ? "Salvando..." : "Salvar"} onPress={handleSave} disabled={saving} />

      {saving && <ActivityIndicator size="large" color="#007bff" style={{ marginTop: 16 }} />}
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
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#555",
  },
  picker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
});

export default EditMachineScreen;
