import React, { useState } from "react";
import {
  View,
  ScrollView,
  Modal,
  Text,
  Button,
  TextInput,
  StyleSheet,
} from "react-native";
import Card from "./card";

const initialStockItems = [
  {
    id: "1",
    title: "Parafuzo M8",
    field: { status: 1, date: "2024-09-01", machine_id: 1, quant: 22 },
    icons: ["pencil"],
  },
  {
    id: "2",
    title: "Parafuzo M16",
    field: { status: 1, date: "2024-09-01", machine_id: 2, quant: 22 },
    icons: ["pencil"],
  },
  {
    id: "3",
    title: "Parafuzo M12",
    field: { status: 1, date: "2024-09-01", machine_id: 3, quant: 22 },
    icons: ["pencil"],
  },
];

const StockScreen: React.FC = () => {
  const [stockItems, setStockItems] = useState(initialStockItems);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isAddModalVisible, setAddModalVisible] = useState(false);
  const [editedField, setEditedField] = useState<any>({});

  const handleIconPress = (icon: string, item: any) => {
    if (icon === "pencil") {
      setSelectedItem(item);
      setEditedField(item.field);
      setModalVisible(true);
    } else if (icon === "add-circle") {
      setAddModalVisible(true);
    }
  };

  const handleFieldChange = (key: string, value: string | number) => {
    setEditedField({ ...editedField, [key]: value });
  };

  const handleSave = () => {
    const updatedStockItems = stockItems.map((item) =>
      item.id === selectedItem.id ? { ...item, field: editedField } : item
    );
    setStockItems(updatedStockItems);
    setModalVisible(false);
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        {stockItems.map((item) => (
          <View key={item.id} style={styles.cardContainer}>
            <Card
              title={item.title}
              field={item.field}
              icons={item.icons}
              onIconPress={(icon) => handleIconPress(icon, item)}
            />
          </View>
        ))}
      </View>

      {selectedItem && (
        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedItem.title}</Text>
              {Object.entries(editedField).map(([key, value]) => (
                <View key={key} style={styles.inputContainer}>
                  <Text>{`${key.charAt(0).toUpperCase() + key.slice(1)}:`}</Text>
                  <TextInput
                    style={styles.input}
                    value={String(value)}
                    onChangeText={(text) => handleFieldChange(key, text)}
                    keyboardType={key === "quant" ? "numeric" : "default"}
                  />
                </View>
              ))}
              <View style={styles.modalButtons}>
                <Button title="Salvar" onPress={handleSave} />
                <Button title="Fechar" onPress={() => setModalVisible(false)} />
              </View>
            </View>
          </View>
        </Modal>
      )}

      <Modal
        visible={isAddModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setAddModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.addModalContent}>
            <Text style={styles.addModalText}>Item adicionado!</Text>
            <Button
              title="Fechar"
              onPress={() => setAddModalVisible(false)}
            />
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
  cardContainer: {
    marginBottom: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.75)",
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
  inputContainer: {
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    backgroundColor: "#fff",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  addModalContent: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  addModalText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 16,
  },
});

export default StockScreen;
