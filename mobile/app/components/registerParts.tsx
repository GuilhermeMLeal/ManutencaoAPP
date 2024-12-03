import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Button, Modal } from 'react-native';

const RegisterPartsScreen = () => {
  // Dados mockados para peças e materiais
  const mockData = [
    { id: '1', name: 'Peça A', quantity: '10', price: '$15.00' },
    { id: '2', name: 'Material B', quantity: '5', price: '$7.00' },
    { id: '3', name: 'Peça C', quantity: '8', price: '$20.00' },
  ];

  const [maintenanceData, setMaintenanceData] = useState({
    machineId: '123',
    status: '1', // Pode ser 1, 2 ou 3
    maintenanceDate: '2024-09-22',
  });

  const [editedField, setEditedField] = useState<any>({});
  const [selectedItem, setSelectedItem] = useState<any>(null); // Item selecionado para edição
  const [isModalVisible, setModalVisible] = useState(false); // Controle do modal

  const handleMaintenanceChange = (key: string, value: string | number) => {
    setMaintenanceData({ ...maintenanceData, [key]: value });
  };

  const handleSave = () => {
    console.log('Dados da manutenção salvos:', maintenanceData);
  };

  // Função para lidar com o ícone de edição
  const handleIconPress = (icon: string, item: any) => {
    if (icon === 'pencil') {
      // Ação de edição
      setSelectedItem(item); // Seleciona o item para edição
      setEditedField(item); // Popula o modal com os dados do item
      setModalVisible(true); // Abre o modal
    } else if (icon === 'trash') {
      // Ação de exclusão
      console.log('Excluir item', item);
    }
  };

  const handleEditSave = () => {
    console.log('Item editado:', editedField);
    setModalVisible(false); // Fecha o modal
  };

  return (
    <ScrollView className="flex-1 bg-gray-100 p-5">
      {/* Dados de Manutenção */}
      <View className="flex-1 justify-center items-center">
        <View className="bg-white p-4 rounded-lg w-full m-12">
          <Text className="text-lg font-bold mb-4">Manutenção da Máquina</Text>
          
          <View className="mb-4">
            <Text>ID da Máquina:</Text>
            <TextInput
              style={{ borderWidth: 1, padding: 8, borderColor: '#ccc', borderRadius: 4 }}
              value={maintenanceData.machineId}
              onChangeText={(text) => handleMaintenanceChange('machineId', text)}
              keyboardType="numeric"
            />
          </View>

          <View className="mb-4">
            <Text>Status da Manutenção:</Text>
            <TextInput
              style={{ borderWidth: 1, padding: 8, borderColor: '#ccc', borderRadius: 4 }}
              value={maintenanceData.status}
              onChangeText={(text) => handleMaintenanceChange('status', text)}
              keyboardType="numeric"
              placeholder="1: Pendente, 2: Em Andamento, 3: Concluída"
            />
          </View>

          <View className="mb-4">
            <Text>Data da Manutenção:</Text>
            <TextInput
              style={{ borderWidth: 1, padding: 8, borderColor: '#ccc', borderRadius: 4 }}
              value={maintenanceData.maintenanceDate}
              onChangeText={(text) => handleMaintenanceChange('maintenanceDate', text)}
              placeholder="YYYY-MM-DD"
            />
          </View>

          <View className="mt-4">
            <Button title="Salvar" onPress={handleSave} />
          </View>
        </View>
      </View>

      <Text className="text-2xl font-bold mb-4">Registrar Peças e Materiais</Text>

      {/* Formulário de Registro de Peças */}
      <View className="mb-6">
        <Text className="text-lg font-semibold mb-2">Nome da Peça ou Material:</Text>
        <TextInput
          className="border border-gray-300 p-3 rounded mb-4"
          placeholder="Digite o nome"
        />

        <Text className="text-lg font-semibold mb-2">Quantidade:</Text>
        <TextInput
          className="border border-gray-300 p-3 rounded mb-4"
          placeholder="Digite a quantidade"
          keyboardType="numeric"
        />

        <Text className="text-lg font-semibold mb-2">Preço:</Text>
        <TextInput
          className="border border-gray-300 p-3 rounded mb-4"
          placeholder="Digite o preço"
          keyboardType="numeric"
        />

        <TouchableOpacity
          className="bg-blue-500 py-3 px-5 rounded"
          onPress={() => alert('Registro enviado!')}
        >
          <Text className="text-white text-center text-lg">Registrar</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de Itens Registrados */}
      <View>
        <Text className="text-xl font-bold mb-4">Itens Registrados</Text>
        {mockData.map((item) => (
          <View key={item.id} className="bg-white border border-gray-300 p-4 rounded mb-4">
            <Text className="text-lg font-semibold">{item.name}</Text>
            <Text>Quantidade: {item.quantity}</Text>
            <Text>Preço: {item.price}</Text>
            <View className="flex-row mt-2">
              {/* Ícone de edição */}
              <TouchableOpacity onPress={() => handleIconPress('pencil', item)}>
                <Text className="text-blue-500 mr-4">✏️ Editar</Text>
              </TouchableOpacity>
              {/* Ícone de exclusão */}
              <TouchableOpacity onPress={() => handleIconPress('trash', item)}>
                <Text className="text-red-500">🗑️ Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      {/* Modal de edição */}
      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <View className="bg-white p-6 rounded-lg w-80">
            <Text className="text-lg font-bold mb-4">Editar Item</Text>
            {selectedItem && (
              <>
                <Text>Nome:</Text>
                <TextInput
                  style={{ borderWidth: 1, padding: 8, borderColor: '#ccc', borderRadius: 4 }}
                  value={editedField.name}
                  onChangeText={(text) => setEditedField({ ...editedField, name: text })}
                />
                <Text>Quantidade:</Text>
                <TextInput
                  style={{ borderWidth: 1, padding: 8, borderColor: '#ccc', borderRadius: 4 }}
                  value={editedField.quantity}
                  onChangeText={(text) => setEditedField({ ...editedField, quantity: text })}
                  keyboardType="numeric"
                />
                <Text>Preço:</Text>
                <TextInput
                  style={{ borderWidth: 1, padding: 8, borderColor: '#ccc', borderRadius: 4 }}
                  value={editedField.price}
                  onChangeText={(text) => setEditedField({ ...editedField, price: text })}
                  keyboardType="numeric"
                />
              </>
            )}
            <View className="mt-4 flex-row justify-between">
              <Button title="Salvar" onPress={handleEditSave} />
              <Button title="Cancelar" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default RegisterPartsScreen;
