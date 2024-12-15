import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "expo-router";
import { apiAuth, endpointMachine, endpointPlace, apiMachine, endpointStatus } from '../../services/api'
import {getAccessToken} from '../../../app/utils/storage'
const CreateMachine: React.FC = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [model, setModel] = useState("");
  const [manufactureDate, setManufactureDate] = useState("");
  const [status, setStatus] = useState<number | null>(null);
  const [statuses, setStatuses] = useState<{ id: number; name: string }[]>([]);
  const [placeId, setPlaceId] = useState<number | null>(null);
  const [places, setPlaces] = useState<
    { id: number; name: string; description: string; observation: string }[]
  >([]);
  const [loading, setLoading] = useState(true);

  // Fetch places using .then and .catch
  useEffect(() => {
    apiMachine
      .get(endpointPlace.place) 
      .then((response) => {
        if (response.status === 200) {
          setPlaces(response.data);
        } else {
          throw new Error(`Erro: ${response.status}`);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar lugares:", error);
        Alert.alert("Erro", "Não foi possível carregar os lugares.");
        setLoading(false);
      });

    apiMachine
      .get(endpointStatus.status) 
      .then((response) => {
        if (response.status === 200) {
          setStatuses(response.data);
        } else {
          throw new Error(`Erro: ${response.status}`);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar lugares:", error);
        Alert.alert("Erro", "Não foi possível carregar os lugares.");
        setLoading(false);
      });
  }, []);

  const handleSubmit = () => {
    const machine = {
      name,
      type,
      model,
      manufactureDate: new Date(manufactureDate).toISOString(),
      serialNumber,
      statusId: status,
      placeId,
    };

    console.log(machine);
    apiMachine
      .post(endpointMachine.machine, machine)
      .then((response) => {
        console.log(machine);
        if (response.status === 201) {
          console.log("Máquina criada com sucesso:", response.data);
          Alert.alert("Sucesso", "Máquina criada com sucesso!");
          navigation.goBack();
        } else {
          throw new Error(`Erro: ${response.status}`);
        }
      })
      .catch((error) => {
        console.error("Erro ao criar a máquina:", error);
        Alert.alert("Erro", "Não foi possível criar a máquina.");
      });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text>Carregando lugares...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Máquina</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome da Máquina"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Tipo"
        value={type}
        onChangeText={setType}
      />
      <TextInput
        style={styles.input}
        placeholder="Número de Série"
        value={serialNumber}
        onChangeText={setSerialNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Modelo"
        value={model}
        onChangeText={setModel}
      />
      <TextInput
        style={styles.input}
        placeholder="Data de Fabricação (YYYY-MM-DD)"
        value={manufactureDate}
        onChangeText={setManufactureDate}
      />
      <Text style={styles.label}>Status:</Text>
      <Picker
        selectedValue={status}
        onValueChange={(itemValue: number | null) => setStatus(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Selecione um status" value={null} />
        {statuses.map((statusItem) => (
          <Picker.Item key={statusItem.id} label={statusItem.name} value={statusItem.id} />
        ))}
      </Picker>
      <Text style={styles.label}>Localização:</Text>
      <Picker
        selectedValue={placeId}
        onValueChange={(itemValue: any) => setPlaceId(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Selecione uma localização" value={null} />
        {places.map((place) => (
          <Picker.Item
            key={place.id}
            label={`${place.name} - ${place.description} (${place.observation})`}
            value={place.id}
          />
        ))}
      </Picker>
      <Button title="Salvar" onPress={handleSubmit} />
    </View>
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CreateMachine;
