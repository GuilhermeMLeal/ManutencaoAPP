import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { apiMachine, endpointStatus, endpointPlace, endpointMachine } from "@/app/services/api";
import { Picker } from "@react-native-picker/picker";

const EditMachineScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const { machineDetails: initialMachineDetails } = route.params;

  const [machineDetails, setMachineDetails] = useState(initialMachineDetails);
  const [statuses, setStatuses] = useState<{ id: number; name: string }[]>([]);
  const [places, setPlaces] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const statusResponse = await apiMachine.get(endpointStatus.status);
        const placeResponse = await apiMachine.get(endpointPlace.place);

        setStatuses(statusResponse.data);
        setPlaces(placeResponse.data);
      } catch (err) {
        Alert.alert("Erro", "Não foi possível carregar dados adicionais.");
      }
    };

    fetchDropdownData();
  }, []);

  const handleSave = async () => {
    try {
      // Enviando os dados corrigidos com os IDs de Status e Place
      const dataToSave = {
        ...machineDetails,
        statusId: machineDetails.Status, // ID do status
        placeId: machineDetails.PlaceId, // ID do local
      };
      await apiMachine.put(`${endpointMachine.machine}`, dataToSave);

      Alert.alert("Sucesso", "Os dados foram salvos!");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar os dados.");
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
        selectedValue={machineDetails.Status}
        onValueChange={(value: number) => setMachineDetails({ ...machineDetails, Status: value })}
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
      <Button title="Salvar" onPress={handleSave} />
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
