import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

const MaintenanceRequestScreen: React.FC = () => {
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [responsible, setResponsible] = useState("");

  const [priorityOpen, setPriorityOpen] = useState(false);
  const [priorityOptions, setPriorityOptions] = useState([
    { label: "Baixa", value: "Low" },
    { label: "Média", value: "Medium" },
    { label: "Alta", value: "High" },
  ]);

  const handleSubmit = () => {
    // Lógica para envio dos dados
    console.log("Descrição:", description);
    console.log("Prioridade:", priority);
    console.log("Responsável:", responsible);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Id da máquina:</Text>
      <TextInput
        style={styles.input}
        placeholder="Id máquina"
        value="A"
        onChangeText={setDescription}
      />

      <Text style={styles.label}>Descrição do problema:</Text>
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={description}
        onChangeText={setDescription}
      />

      <Text style={styles.label}>Prioridade:</Text>
      <DropDownPicker
        open={priorityOpen}
        value={priority}
        items={priorityOptions}
        setOpen={setPriorityOpen}
        setValue={setPriority}
        setItems={setPriorityOptions}
        placeholder="Selecione a prioridade"
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
        placeholderStyle={styles.dropdownPlaceholder}
      />

      <Text style={styles.label}>Responsável:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome do responsável"
        value="André Catapau"
        onChangeText={setResponsible}
      />

      <Button title="Enviar Solicitação" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
    backgroundColor: "#f5f5f5",
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    fontWeight: "bold",
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
  dropdown: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
  },
  dropdownContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
  dropdownPlaceholder: {
    color: "#aaa",
  },
});

export default MaintenanceRequestScreen;
