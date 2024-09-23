import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const MaintenanceDetail = ({ maintenance, onEdit, onDelete }) => {
  return (
    <View style={styles.container}>
      <Text>Data: {maintenance.date}</Text>
      <Text>Descrição: {maintenance.description}</Text>
      <Text>Status: {maintenance.status}</Text>
      
      <View style={styles.buttonRow}>
        <TouchableOpacity onPress={onEdit}>
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete}>
          <Text style={styles.buttonText}>Deletar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonText: {
    color: 'blue',
  },
});

export default MaintenanceDetail;