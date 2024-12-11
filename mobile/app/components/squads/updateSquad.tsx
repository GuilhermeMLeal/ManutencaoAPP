import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useNavigation, useRoute } from "expo-router";
import { apiMachine, endpointSquad } from "@/app/services/api";

const UpdateSquadScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const { squadId } = route.params;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Busca os detalhes do Squad para preencher os campos
    const fetchSquadDetails = async () => {
      try {
        const response = await apiMachine.get(`${endpointSquad.squads}/${squadId}`);
        const { name, description } = response.data;

        setName(name);
        setDescription(description);
      } catch (error: any) {
        console.error("Erro ao buscar os detalhes do Squad:", error);
        Alert.alert("Erro", "Não foi possível carregar os detalhes do Squad.");
      } finally {
        setLoading(false);
      }
    };

    fetchSquadDetails();
  }, [squadId]);

  const handleUpdate = async () => {
    if (!name || !description) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    const updatedSquad = { name, description };

    setSaving(true);
    try {
      const response = await apiMachine.put(
        `${endpointSquad.squad}/${squadId}`,
        updatedSquad
      );

      if (response.status === 204) {
        Alert.alert("Sucesso", "Squad atualizado com sucesso!");
        navigation.goBack(); // Voltar para a tela anterior
      } else {
        throw new Error("Erro ao atualizar o Squad.");
      }
    } catch (error: any) {
      console.error("Erro ao atualizar o Squad:", error);
      Alert.alert("Erro", "Não foi possível atualizar o Squad.");
    } finally {
      setSaving(false);
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Squad</Text>

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
        title={saving ? "Salvando..." : "Salvar"}
        onPress={handleUpdate}
        disabled={saving}
      />

      {saving && <ActivityIndicator size="large" color="#007bff" />}
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 8,
    fontSize: 16,
    color: "#555",
  },
});

export default UpdateSquadScreen;
