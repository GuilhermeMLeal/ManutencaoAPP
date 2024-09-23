import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const MachineInfo = ({ machine }: { machine: any }) => (
  <View>
    <Text>Modelo: {machine.model}</Text>
    <Text>Data de Fabricação: {machine.fabricationDate}</Text>
    <Text>Número de Série: {machine.serialNumber}</Text>
    <Text>Status: {machine.status}</Text>
    {machine.image ? (
      <Image source={{ uri: machine.image }} style={styles.image} />
    ) : (
      <Image source={require('../../imgs/machine.png')} style={styles.image} />
    )}
  </View>
);

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginTop: 20,
  },
});

export default MachineInfo;
