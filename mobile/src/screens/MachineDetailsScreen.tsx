import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Alert } from 'react-native';

export function MachineDetailsScreen({ route, navigation }: { route: any, navigation: any }) {
  const { machine } = route.params;
  const [isInMaintenance, setIsInMaintenance] = useState(false);
  const [comment, setComment] = useState('');

  // Função para editar os detalhes da máquina
  const handleEditMachine = () => {
    // Navegar para uma tela de edição (pode ser outra tela onde o usuário edita os detalhes da máquina)
    navigation.navigate('EditMachine', { machine });
  };

  // Função para deletar a máquina
  const handleDeleteMachine = () => {
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza que deseja deletar esta máquina?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Deletar',
          onPress: () => {
            // Lógica para deletar a máquina (pode ser uma chamada de API ou atualização de estado)
            console.log('Máquina deletada:', machine.name);
            navigation.goBack(); // Retorna para a tela anterior após deletar
          },
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{machine.name}</Text>
      <Text>Modelo: {machine.model}</Text>
      <Text>Data de Fabricação: {machine.fabricationDate}</Text>
      <Text>Número de Série: {machine.serialNumber}</Text>
      <Text>Status: {machine.status}</Text>

      <Button
        title={isInMaintenance ? 'Remover de Manutenção' : 'Marcar como "Em Manutenção"'}
        onPress={() => setIsInMaintenance(!isInMaintenance)}
      />

      {isInMaintenance && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Adicionar comentário"
            value={comment}
            onChangeText={setComment}
          />
          <Text>Comentário: {comment}</Text>
        </>
      )}

      {/* Botão para editar a máquina */}
      <View style={styles.buttonContainer}>
        <Button
          title="Editar Máquina"
          onPress={handleEditMachine}
        />
      </View>

      {/* Botão para deletar a máquina */}
      <View style={styles.buttonContainer}>
        <Button
          title="Deletar Máquina"
          color="red"
          onPress={handleDeleteMachine}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  buttonContainer: {
    marginVertical: 10,
  },
});
