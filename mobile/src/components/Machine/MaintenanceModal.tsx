import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, FlatList } from 'react-native';

const MaintenanceModal = ({ visible, onClose, maintenanceData }: any) => (
  <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
    <View style={styles.modalContainer}>
      <View style={styles.modalView}>
        <Text style={styles.modalTitle}>Relatórios de Manutenção</Text>
        <FlatList
          data={maintenanceData}
          keyExtractor={(item) => item.id.toString()} 
          renderItem={({ item }) => (
            <View style={styles.maintenanceItem}>
              <Text>Data: {item.date}</Text>
              <Text>Descrição: {item.description}</Text>
              <Text>Status: {item.status}</Text>
            </View>
          )}
        />
        <TouchableOpacity style={[styles.button, styles.buttonClose]} onPress={onClose}>
          <Text style={styles.textStyle}>Fechar</Text>
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
  maintenanceItem: {
    padding: 10,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
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
});

export default MaintenanceModal;