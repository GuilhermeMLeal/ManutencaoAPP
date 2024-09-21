import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, Image, Modal, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { Picker } from '@react-native-picker/picker';

export function MachineDetailsScreen({ route, navigation }: { route: any, navigation: any }) {
  const { machine } = route.params;
  const [isInMaintenance, setIsInMaintenance] = useState(false);
  const [comment, setComment] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [statusModalVisible, setStatusModalVisible] = useState(false);
  const [status, setStatus] = useState(machine.status);

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
            console.log('Máquina deletada:', machine.name);
            navigation.goBack();
          },
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Icon name="cogs" type="font-awesome" color="blue" />
        <Text style={styles.title}>{machine.name}</Text>
      </View>

      <Text>Modelo: {machine.model}</Text>
      <Text>Data de Fabricação: {machine.fabricationDate}</Text>
      <Text>Número de Série: {machine.serialNumber}</Text>
      <Text>Status: {status}</Text>

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

      <View style={styles.iconsRow}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Icon name="edit" type="font-awesome" color="black" size={24} />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleDeleteMachine}>
          <Icon name="trash" type="font-awesome" color="black" size={24} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setStatusModalVisible(true)}>
          <View style={styles.buttonWrapper}>
            <Icon name="exchange" type="font-awesome" color="black" size={24} />
            <Text style={styles.buttonText}>Alterar Status</Text>
          </View>
        </TouchableOpacity>
      </View>

      {machine.image ? (
        <Image
          source={{ uri: machine.image }}
          style={styles.image}
        />
      ) : (
        <Image
          source={require('../imgs/machine.png')}
          style={styles.image}
        />
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Editar Máquina</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome da Máquina"
              value={machine.name}
            />
            <TextInput
              style={styles.input}
              placeholder="Modelo da Máquina"
              value={machine.model}
            />
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Salvar e Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={statusModalVisible}
        onRequestClose={() => setStatusModalVisible(!statusModalVisible)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Alterar Status da Máquina</Text>
            <Picker
              selectedValue={status}
              style={styles.picker}
              onValueChange={(itemValue) => setStatus(itemValue)}
            >
              <Picker.Item label="Operável" value="Operável" />
              <Picker.Item label="Em Manutenção" value="Em Manutenção" />
              <Picker.Item label="Quebrada" value="Quebrada" />
            </Picker>
            <Text style={styles.commentTitle}>Comentário para Alteração de Status:</Text>
            <TextInput
              style={styles.input}
              placeholder="Comentário"
              value={comment}
              onChangeText={setComment}
            />
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setStatusModalVisible(!statusModalVisible);
              }}
            >
              <Text style={styles.textStyle}>Salvar Status</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  iconsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  buttonWrapper: {
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    marginTop: 5,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 200,
    marginTop: 20,
    resizeMode: 'contain',
  },
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  commentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    marginTop: 15,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  picker: {
    height: 50,
    width: 150,
  },
});
