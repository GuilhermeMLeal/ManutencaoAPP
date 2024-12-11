import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "expo-router";
import { apiMachine, endpointSquad } from "@/app/services/api";

const CreateSquadScreen: React.FC = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateSquad = async () => {
    if (!name || !description) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    const squadData = {
      name,
      description,
    };

    setLoading(true);
    try {
      const response = await apiMachine.post(endpointSquad.squad, squadData);

      if (response.status === 201) {
        Alert.alert("Sucesso", "Squad criado com sucesso!");
        navigation.goBack(); // Voltar para a tela anterior
      } else {
        throw new Error("Erro ao criar o squad.");
      }
    } catch (error: any) {
      console.error("Erro ao criar o squad:", error);
      Alert.alert("Erro", "Não foi possível criar o squad.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Squad</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome do Squad"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Descrição do Squad"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Button
        title={loading ? "Criando..." : "Salvar"}
        onPress={handleCreateSquad}
        disabled={loading}
      />

      {loading && <ActivityIndicator size="large" color="#007bff" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
    textAlign: "center",
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
});

export default CreateSquadScreen;
