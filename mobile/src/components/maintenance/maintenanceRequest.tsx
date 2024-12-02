import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const MaintenanceRequestScreen: React.FC = () => {
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [responsible, setResponsible] = useState('');

  const [priorityOpen, setPriorityOpen] = useState(false);
  const [priorityOptions, setPriorityOptions] = useState([
    { label: 'Baixa', value: 'Low' },
    { label: 'Média', value: 'Medium' },
    { label: 'Alta', value: 'High' },
  ]);

  const handleSubmit = () => {
    // Aqui você pode adicionar a lógica para lidar com o envio dos dados
    console.log('Descrição:', description);
    console.log('Prioridade:', priority);
    console.log('Responsável:', responsible);
  };

  return (
    <View className='pl-5 pr-5 justify-center'>
      <Text className="text-xl mb-2">Id da máquina:</Text>
      <TextInput
        className="border border-gray-300 p-3 mb-5 rounded"
        placeholder="Id máquina"
        value='A'
      />
      <Text className="text-xl mb-2">Descrição do problema:</Text>
      <TextInput
        className="border border-gray-300 p-3 mb-5 rounded"
        placeholder="Descrição"
        value='A'
      />

      <Text className="text-xl mb-2">Prioridade:</Text>
      <DropDownPicker
        open={priorityOpen}
        value={priority}
        items={priorityOptions}
        setOpen={setPriorityOpen}
        setValue={setPriority}
        setItems={setPriorityOptions}
        placeholder="Selecione a prioridade"
 
      />

      <Text className="text-xl mb-2">Responsável:</Text>
      <TextInput
        className="border border-gray-300 p-3 mb-5 rounded"
        placeholder="Digite o nome do responsável"
        value='André Catapau'
      />

      <Button title="Enviar Solicitação" onPress={handleSubmit} />
    </View>
  );
};
export default MaintenanceRequestScreen;