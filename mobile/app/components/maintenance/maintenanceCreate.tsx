import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useNavigation } from "expo-router";

const CreateMaintenance: React.FC = () => {
  const navigation = useNavigation(); // Hook para navegação
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [machineId, setMachineId] = useState("");

  const handleSubmit = () => {
    // Lógica para salvar a nova manutenção
    console.log("Manutenção criada:", { description, date, machineId });

    // Retornar à página anterior
    navigation.goBack(); // Navegar de volta
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Manutenção</Text>
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Data (YYYY-MM-DD)"
        value={date}
        onChangeText={setDate}
      />
      <TextInput
        style={styles.input}
        placeholder="ID da Máquina"
        value={machineId}
        onChangeText={setMachineId}
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
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#fff",
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
});

export default CreateMaintenance;
