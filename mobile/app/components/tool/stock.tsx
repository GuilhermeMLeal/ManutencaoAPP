import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Modal,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Button,
} from "react-native";
import Card from "../card";
import FloatingButton from "../floatingButton";
import { apiTool, endpointTool } from "../../services/api";

const StockScreen: React.FC = () => {
  const [stockItems, setStockItems] = useState<any[]>([]);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [editedField, setEditedField] = useState<any>({});
  const [loading, setLoading] = useState(true);

  // Fetch stock items from the API
  useEffect(() => {
    apiTool
      .get(endpointTool.tool)
      .then((response: any) => {
        if (response.status === 200) {
          const data = response.data;
          if (data.length === 0) {
            Alert.alert("Aviso", "Nenhum item de estoque encontrado.");
          } else {
            setStockItems(data);
          }
        } else {
          //Alert.alert("Erro", "Não foi possível carregar os itens de estoque.");
        }
      })
      .catch((error: any) => {
        console.error("Erro ao buscar itens de estoque:", error);
        //Alert.alert("Erro", "Ocorreu um erro ao buscar os itens de estoque.");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleIconPress = (icon: string, item: any) => {
    if (icon === "pencil") {
      setSelectedItem(item);
      setEditedField(item);
      setModalVisible(true);
    }
  };

  const handleFieldChange = (key: string, value: string | number) => {
    setEditedField({ ...editedField, [key]: value });
  };

  const handleSave = () => {
    const updatedStockItems = stockItems.map((item) =>
      item.id === selectedItem.id ? { ...item, ...editedField } : item
    );
    setStockItems(updatedStockItems);
    setModalVisible(false);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text>Carregando itens de estoque...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {stockItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Nenhum item de estoque disponível.</Text>
        </View>
      ) : (
        <ScrollView>
          {stockItems.map((item) => (
            <View key={item.id} style={styles.cardContainer}>
              <Card
                title={item.name}
                field={{
                  Quantidade: item.quantity,
                  Descrição: item.description,
                }}
                icons={["pencil"]}
                onIconPress={(icon) => handleIconPress(icon, item)}
              />
            </View>
          ))}
        </ScrollView>
      )}

      {selectedItem && (
        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedItem.name}</Text>
              {Object.entries(editedField).map(([key, value]) => (
                <View key={key} style={styles.inputContainer}>
                  <Text>{`${key.charAt(0).toUpperCase() + key.slice(1)}:`}</Text>
                  <TextInput
                    style={styles.input}
                    value={String(value)}
                    onChangeText={(text) => handleFieldChange(key, text)}
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

      <FloatingButton type="tool" />
    </View>
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
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "#555",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default StockScreen;
