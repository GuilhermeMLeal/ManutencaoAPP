// FloatingButton.tsx
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import { useNavigation } from 'expo-router';
 /* Como utilizar esse componente:
 - Para a tela de máquinas:
 <FloatingButton type="machine" />  

 - Para a tela de manutenções:
<FloatingButton type="maintenance" /> 
 */



type FloatingButtonProps = {
  type: 'machine' | 'maintenance'; // Define o tipo para o botão
};

const FloatingButton: React.FC<FloatingButtonProps> = ({ type }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (type === 'machine') {
      navigation.navigate('CreateMachine'); // Navegar para a tela de criação de máquina
    } else if (type === 'maintenance') {
      navigation.navigate('CreateMaintenance'); // Navegar para a tela de criação de manutenção
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      className="absolute bottom-8 right-8 bg-orange-500 rounded-full p-4 shadow-lg"
    >
      <FontAwesome name="plus" size={24} color="white" />
    </TouchableOpacity>
  );
};

export default FloatingButton;
