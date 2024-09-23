import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet } from 'react-native';

interface AddStockModalProps {
  visible: boolean;
  onClose: () => void;
  onAddItem: (item: StockItem) => void;
}

const AddStockModal: React.FC<AddStockModalProps> = ({ visible, onClose, onAddItem }) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  const handleAdd = () => {
    if (name && quantity && price) {
      const newItem: StockItem = {
        id: Math.random().toString(),
        name,
        quantity: parseInt(quantity),
        price,
      };
      onAddItem(newItem);
      resetForm();
    }
  };

  const resetForm = () => {
    setName('');
    setQuantity('');
    setPrice('');
    onClose();
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Adicionar Peça</Text>
        <TextInput
          placeholder="Nome da Peça"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <TextInput
          placeholder="Quantidade"
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="numeric"
          style={styles.input}
        />
        <TextInput
          placeholder="Preço"
          value={price}
          onChangeText={setPrice}
          style={styles.input}
        />
        <View style={styles.buttonContainer}>
          <Button title="Adicionar" onPress={handleAdd} color="green" />
          <Button title="Cancelar" onPress={resetForm} color="red" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default AddStockModal;