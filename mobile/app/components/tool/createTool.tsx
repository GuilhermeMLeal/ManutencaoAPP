import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useNavigation } from "expo-router";
import { apiTool, endpointTool } from "../../services/api";

const CreateTool: React.FC = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!name || !quantity || !description) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    const tool = {
      name,
      quantity: parseInt(quantity, 10), // Converte a quantidade para número
      description,
    };

    setLoading(true);

    apiTool
      .post(endpointTool.tool, tool)
      .then((response) => {
        console.log(tool)
        if (response.status === 201) {
          Alert.alert("Sucesso", "Peça criada com sucesso!");
          navigation.goBack();
        } else {
          throw new Error(`Erro ao criar a peça: ${response.status}`);
        }
      })
      .catch((error) => {
        console.error("Erro ao criar a peça:", error);
        Alert.alert("Erro", "Não foi possível criar a peça.");
      })
      .finally(() => setLoading(false));
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text>Salvando a peça...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Peça</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome da Peça"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Quantidade"
        value={quantity}
        onChangeText={setQuantity}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={description}
        onChangeText={setDescription}
        multiline
      />
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CreateTool;
