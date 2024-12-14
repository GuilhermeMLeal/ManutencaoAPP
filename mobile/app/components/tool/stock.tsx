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
import { useNavigation } from "@react-navigation/native";

const StockScreen: React.FC = () => {
  const [stockItems, setStockItems] = useState<any[]>([]);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [editedField, setEditedField] = useState<any>({});
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  // Função para buscar itens de estoque
  const getStock = () => {
    setLoading(true);
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
          Alert.alert("Erro", "Não foi possível carregar os itens de estoque.");
        }
      })
      .catch((error: any) => {
        console.error("Erro ao buscar itens de estoque:", error);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getStock();

    const unsubscribe = navigation.addListener("focus", () => {
      getStock();
    });

    return unsubscribe;
  }, [navigation]);

  const handleIconPress = (icon: string, item: any) => {
    if (icon === "pencil") {
      setSelectedItem(item);
      setEditedField({ ...item });
      setModalVisible(true);
    } else if (icon === "trash") {
      handleDelete(item);
    }
  };

  const handleFieldChange = (key: string, value: string | number) => {
    setEditedField({ ...editedField, [key]: value });
  };

  const handleSave = async () => {
    if (!selectedItem || !selectedItem.id) {
      Alert.alert("Erro", "O item selecionado está inválido.");
      console.error("Erro: selectedItem ou seu id está ausente:", selectedItem);
      return;
    }

    try {
      setLoading(true);

      const response = await apiTool.put(
        `${endpointTool.tool}`, // Inclui o ID no endpoint
        {
          id: selectedItem.id,
          name: editedField.name,
          quantity: editedField.quantity,
          description: editedField.description,
        }
      );

      if (response.status === 204) {
        const updatedStockItems = stockItems.map((item) =>
          item.id === selectedItem.id ? { ...item, ...editedField } : item
        );
        setStockItems(updatedStockItems);
        Alert.alert("Sucesso", "Item atualizado com sucesso!");
      } else {
        Alert.alert("Erro", "Não foi possível atualizar o item.");
      }
    } catch (error) {
      console.error("Erro ao salvar alterações:", error);
      Alert.alert("Erro", "Ocorreu um erro ao salvar as alterações.");
    } finally {
      setLoading(false);
      setModalVisible(false);
    }
  };
  const handleDelete = async (item: any) => {
    Alert.alert(
      "Confirmação",
      `Tem certeza que deseja deletar o item "${item.name}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Deletar",
          style: "destructive",
          onPress: async () => {
            try {
              setLoading(true);

              const response = await apiTool.delete(
                `${endpointTool.tool}/${item.id}`
              );

              if (response.status === 200 || response.status === 204) {
                const updatedStockItems = stockItems.filter(
                  (stockItem) => stockItem.id !== item.id
                );
                setStockItems(updatedStockItems);
                Alert.alert("Sucesso", "Item deletado com sucesso!");
              } else {
                Alert.alert("Erro", "Não foi possível deletar o item.");
              }
            } catch (error) {
              console.error("Erro ao deletar item:", error);
              Alert.alert("Erro", "Ocorreu um erro ao deletar o item.");
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
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
          {stockItems.map((item, index) => (
            <View key={index} style={styles.cardContainer}>
              <Card
                title={item.name}
                field={{
                  Quantidade: item.quantity,
                  Descrição: item.description,
                }}
                icons={["pencil", "trash"]} // Adicionado ícone de lixeira
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
