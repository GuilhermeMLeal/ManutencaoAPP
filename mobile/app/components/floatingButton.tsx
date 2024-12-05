import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "expo-router";

/* Como utilizar esse componente:
 - Para a tela de máquinas:
 <FloatingButton type="machine" />  

 - Para a tela de manutenções:
<FloatingButton type="maintenance" /> 
 */

type FloatingButtonProps = {
  type: "machine" | "maintenance" | "tool"; // Define o tipo para o botão
};

const FloatingButton: React.FC<FloatingButtonProps> = ({ type }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (type === "machine") {
      navigation.navigate("CreateMachine"); // Navegar para a tela de criação de máquina
    } else if (type === "maintenance") {
      navigation.navigate("CreateMaintenance"); // Navegar para a tela de criação de manutenção
    }
    else if (type === "tool") {
      navigation.navigate("CreateTool"); // Navegar para a tela de criação de manutenção
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <FontAwesome name="plus" size={24} color="white" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 32,
    right: 32,
    backgroundColor: "#FFA500", // Cor laranja
    borderRadius: 50, // Torna o botão totalmente arredondado
    padding: 16,
    shadowColor: "#000", // Sombra
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Sombra no Android
  },
});

export default FloatingButton;
