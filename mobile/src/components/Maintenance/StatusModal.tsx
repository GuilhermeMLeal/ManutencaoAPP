import React from 'react';
import { View, Text, TextInput, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const StatusModal = ({ visible, onClose, status, setStatus, comment, setComment }: any) => (
  <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
    <View style={styles.modalContainer}>
      <View style={styles.modalView}>
        <Text style={styles.modalTitle}>Alterar Status da Máquina</Text>
        <Picker style={styles.picker} selectedValue={status} onValueChange={(itemValue) => setStatus(itemValue)}>
          <Picker.Item label="Operável" value="Operável" />
          <Picker.Item label="Em Manutenção" value="Em Manutenção" />
          <Picker.Item label="Quebrada" value="Quebrada" />
        </Picker>
        <Text>Comentário para Alteração de Status:</Text>
        <TextInput style={styles.input} placeholder="Comentário" value={comment} onChangeText={setComment} />
        <TouchableOpacity style={[styles.button, styles.buttonClose]} onPress={onClose}>
          <Text style={styles.textStyle}>Salvar Status</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    elevation: 2,
    backgroundColor: '#2196F3',
    marginTop: 10,
  },
  buttonClose: {
    backgroundColor: '#0099cc',
  },
  textStyle: {
    color: 'white',
    textAlign: 'center',
  },
  picker: {
    height: 50,
    width: '100%',
    marginVertical: 10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default StatusModal;
