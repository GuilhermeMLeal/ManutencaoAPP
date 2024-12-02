import React, { useState } from 'react';
import { View, ScrollView, Modal, Text, Button, TextInput } from 'react-native';
import Card from './card';

// Dados mockados para o estoque
const initialStockItems = [
  { 
    id: '1', 
    title: 'Parafuzo M8', 
    field: { status: 1, date: "2024-09-01", machine_id: 1, quant: 22 }, 
    icons: ['pencil'] 
  },
  { 
    id: '2', 
    title: 'Parafuzo M16', 
    field: { status: 1, date: "2024-09-01", machine_id: 2, quant: 22  }, 
    icons: ['pencil'] 
  },
  { 
    id: '3', 
    title: 'Parafuzo M12', 
    field: { status: 1, date: "2024-09-01", machine_id: 3, quant: 22  }, 
    icons: ['pencil'] 
  },
];

const StockScreen: React.FC = () => {
  const [stockItems, setStockItems] = useState(initialStockItems); // Armazena os itens de estoque
  const [selectedItem, setSelectedItem] = useState<any>(null); // Para o modal de edição
  const [isModalVisible, setModalVisible] = useState(false);
  const [isAddModalVisible, setAddModalVisible] = useState(false); // Para o modal "Item adicionado"
  const [editedField, setEditedField] = useState<any>({}); // Para armazenar as edições

  // Lida com a lógica de clicar nos ícones
  const handleIconPress = (icon: string, item: any) => {
    if (icon === 'pencil') {
      setSelectedItem(item);
      setEditedField(item.field); // Inicia o campo editável com os valores do item
      setModalVisible(true);
    } else if (icon === 'add-circle') {
      setAddModalVisible(true); // Exibe o modal "Item adicionado"
    }
  };

  // Lida com as mudanças nos campos editáveis
  const handleFieldChange = (key: string, value: string | number) => {
    setEditedField({ ...editedField, [key]: value });
  };

  // Salva as mudanças feitas no item
  const handleSave = () => {
    const updatedStockItems = stockItems.map(item => 
      item.id === selectedItem.id ? { ...item, field: editedField } : item
    );
    setStockItems(updatedStockItems);
    setModalVisible(false);
  };

  return (
    <ScrollView className="flex-1 bg-gray-100 p-4 mt-12">
      <View>
        {stockItems.map(item => (
          <View key={item.id}>
            <Card 
              title={item.title} 
              field={item.field} 
              icons={item.icons}
              onIconPress={(icon) => handleIconPress(icon, item)}
            />
          </View>
        ))}
      </View>

      {/* Modal para exibir e editar informações do item */}
      {selectedItem && (
        <Modal
          visible={isModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View className="flex-1 justify-center items-center bg-gray-900 bg-opacity-75">
            <View className="bg-white p-4 rounded-lg w-full m-12">
              <Text className="text-lg font-bold">{selectedItem.title}</Text>

              {/* Campos editáveis */}
              {Object.entries(editedField).map(([key, value]) => (
                <View key={key} style={{ marginVertical: 8 }} className='mb-2'>
                  <Text>{`${key.charAt(0).toUpperCase() + key.slice(1)}:`}</Text>
                  <TextInput
                    style={{ borderWidth: 1, padding: 8, borderColor: '#ccc', borderRadius: 4 }}
                    value={String(value)}
                    onChangeText={(text) => handleFieldChange(key, text)}
                    keyboardType={key === 'quant' ? 'numeric' : 'default'} 
                  />
                </View>
              ))}

              <View className='mt-4'>
                <Button title="Salvar" onPress={handleSave}/>
                <Button title="Fechar" onPress={() => setModalVisible(false)} />
              </View>
            </View>
          </View>
        </Modal>
      )}

      {/* Modal para o ícone "add-circle" */}
      <Modal
        visible={isAddModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setAddModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-gray-900 bg-opacity-75">
          <View className="bg-white p-4 rounded-lg">
            <Text className="text-lg font-bold">Item adicionado!</Text>
            <Button title="Fechar" onPress={() => setAddModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default StockScreen;
