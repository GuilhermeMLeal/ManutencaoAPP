import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Button,
  Modal,
  StyleSheet,
} from "react-native";

const RegisterPartsScreen = () => {
  const mockData = [
    { id: "1", name: "Peça A", quantity: "10", price: "$15.00" },
    { id: "2", name: "Material B", quantity: "5", price: "$7.00" },
    { id: "3", name: "Peça C", quantity: "8", price: "$20.00" },
  ];

  const [maintenanceData, setMaintenanceData] = useState({
    machineId: "123",
    status: "1",
    maintenanceDate: "2024-09-22",
  });

  const [editedField, setEditedField] = useState<any>({});
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const handleMaintenanceChange = (key: string, value: string | number) => {
    setMaintenanceData({ ...maintenanceData, [key]: value });
  };

  const handleSave = () => {
    console.log("Dados da manutenção salvos:", maintenanceData);
  };

  const handleIconPress = (icon: string, item: any) => {
    if (icon === "pencil") {
      setSelectedItem(item);
      setEditedField(item);
      setModalVisible(true);
    } else if (icon === "trash") {
      console.log("Excluir item", item);
    }
  };

  const handleEditSave = () => {
    console.log("Item editado:", editedField);
    setModalVisible(false);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Dados de Manutenção */}
      <View style={styles.card}>
        <Text style={styles.title}>Manutenção da Máquina</Text>
        <View style={styles.inputContainer}>
          <Text>ID da Máquina:</Text>
          <TextInput
            style={styles.input}
            value={maintenanceData.machineId}
            onChangeText={(text) => handleMaintenanceChange("machineId", text)}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text>Status da Manutenção:</Text>
          <TextInput
            style={styles.input}
            value={maintenanceData.status}
            onChangeText={(text) => handleMaintenanceChange("status", text)}
            keyboardType="numeric"
            placeholder="1: Pendente, 2: Em Andamento, 3: Concluída"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text>Data da Manutenção:</Text>
          <TextInput
            style={styles.input}
            value={maintenanceData.maintenanceDate}
            onChangeText={(text) =>
              handleMaintenanceChange("maintenanceDate", text)
            }
            placeholder="YYYY-MM-DD"
          />
        </View>
        <Button title="Salvar" onPress={handleSave} />
      </View>

      {/* Registro de Peças */}
      <Text style={styles.sectionTitle}>Registrar Peças e Materiais</Text>
      <View style={styles.inputContainer}>
        <Text>Nome da Peça ou Material:</Text>
        <TextInput style={styles.input} placeholder="Digite o nome" />
      </View>
      <View style={styles.inputContainer}>
        <Text>Quantidade:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite a quantidade"
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputContainer}>
        <Text>Preço:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o preço"
          keyboardType="numeric"
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => alert("Registro enviado!")}
      >
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>

      {/* Lista de Itens Registrados */}
      <Text style={styles.sectionTitle}>Itens Registrados</Text>
      {mockData.map((item) => (
        <View key={item.id} style={styles.itemCard}>
          <Text style={styles.itemTitle}>{item.name}</Text>
          <Text>Quantidade: {item.quantity}</Text>
          <Text>Preço: {item.price}</Text>
          <View style={styles.iconRow}>
            <TouchableOpacity onPress={() => handleIconPress("pencil", item)}>
              <Text style={styles.editText}>✏️ Editar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleIconPress("trash", item)}>
              <Text style={styles.deleteText}>🗑️ Excluir</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      {/* Modal de Edição */}
      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar Item</Text>
            {selectedItem && (
              <>
                <Text>Nome:</Text>
                <TextInput
                  style={styles.input}
                  value={editedField.name}
                  onChangeText={(text) =>
                    setEditedField({ ...editedField, name: text })
                  }
                />
                <Text>Quantidade:</Text>
                <TextInput
                  style={styles.input}
                  value={editedField.quantity}
                  onChangeText={(text) =>
                    setEditedField({ ...editedField, quantity: text })
                  }
                  keyboardType="numeric"
                />
                <Text>Preço:</Text>
                <TextInput
                  style={styles.input}
                  value={editedField.price}
                  onChangeText={(text) =>
                    setEditedField({ ...editedField, price: text })
                  }
                  keyboardType="numeric"
                />
              </>
            )}
            <View style={styles.modalButtons}>
              <Button title="Salvar" onPress={handleEditSave} />
              <Button title="Cancelar" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  itemCard: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  iconRow: {
    flexDirection: "row",
    marginTop: 8,
  },
  editText: {
    color: "#007bff",
    marginRight: 16,
  },
  deleteText: {
    color: "#ff4d4d",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
});

export default RegisterPartsScreen;
