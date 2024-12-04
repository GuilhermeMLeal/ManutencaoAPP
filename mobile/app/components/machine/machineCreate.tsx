import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useNavigation } from "expo-router";

const CreateMachine: React.FC = () => {
  const navigation = useNavigation(); // Use o hook para navegação
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = () => {
    // Lógica para salvar a nova máquina
    console.log("Máquina criada:", { name, type, location });

    // Retornar à página anterior
    navigation.goBack(); // Navegar de volta
  };

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
        placeholder="Localização"
        value={location}
        onChangeText={setLocation}
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
});

export default CreateMachine;
