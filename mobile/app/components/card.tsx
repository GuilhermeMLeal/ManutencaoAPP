import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";

type FieldItem = {
  [key: string]: string | number;
};

type CardProps = {
  title: string;
  field: FieldItem;
  icons: string[]; // Lista de ícones a serem exibidos
  onIconPress: (icon: string) => void; // Callback para ações nos ícones
};

const Card: React.FC<CardProps> = ({ title, field, icons, onIconPress }) => {
  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        {Object.entries(field).map(([key, value]) => (
          <Text style={styles.fieldText} key={key}>
            {key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()}: {value}
          </Text>
        ))}
      </View>
      <View style={styles.iconsContainer}>
        {icons.map((icon, index) => (
          <TouchableOpacity key={index} onPress={() => onIconPress(icon)}>
            {icon === "add-circle" ? (
              <Icon name="add-circle" size={24} color="black" />
            ) : (
              <FontAwesome name={icon} size={24} color="black" />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  content: {
    flex: 1,
    paddingRight: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  fieldText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 4,
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Card;
