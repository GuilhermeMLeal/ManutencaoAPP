import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon, Text } from 'react-native-elements';

const ActionButtons = ({ onEdit, onDelete, onChangeStatus, onShowMaintenance }: any) => (
  <View style={styles.iconsRow}>
    <TouchableOpacity onPress={onEdit}>
      <Icon name="edit" type="font-awesome" color="black" size={24} />
    </TouchableOpacity>
    <TouchableOpacity onPress={onDelete}>
      <Icon name="trash" type="font-awesome" color="black" size={24} />
    </TouchableOpacity>
    <TouchableOpacity onPress={onChangeStatus}>
      <View style={styles.buttonWrapper}>
        <Icon name="exchange" type="font-awesome" color="black" size={24} />
        <Text style={styles.buttonText}>Alterar Status</Text>
      </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={onShowMaintenance}>
      <View style={styles.buttonWrapper}>
        <Icon name="history" type="font-awesome" color="black" size={24} />
        <Text style={styles.buttonText}>Ver Histórico</Text>
      </View>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  iconsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  buttonWrapper: {
    alignItems: 'center',
    paddingBottom: 30,
  },
  buttonText: {
    color: 'black',
    marginTop: 5,
    fontWeight: 'bold',
  },
});

export default ActionButtons;