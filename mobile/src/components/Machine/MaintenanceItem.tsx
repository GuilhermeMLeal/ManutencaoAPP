import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MaintenanceItem = ({ item }: { item: any }) => (
  <View style={styles.itemContainer}>
    <Text>Data: {item.date}</Text>
    <Text>Descrição: {item.description}</Text>
    <Text>Status: {item.status}</Text>
  </View>
);

const styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
});

export default MaintenanceItem;
