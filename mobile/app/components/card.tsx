import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons"; 
import FontAwesome from '@expo/vector-icons/FontAwesome'; 

type FieldItem = {
  [key: string]: string | number;
};

type CardProps = {
  title: string;
  field: FieldItem;
  icons: string[]; 
  onIconPress: (icon: string) => void; 
};

const Card: React.FC<CardProps> = ({ title, field, icons, onIconPress }) => {
  return (
    <View className="bg-white rounded flex-row justify-between pr-24 flex-1 p-4 mb-2 rounded-lg shadow">
      <View>
        <Text className="text-lg font-bold mb-1">{title}</Text>
        {Object.entries(field).map(([key, value]) => (
          <Text key={key}>
            {key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()}: {value}
          </Text>
        ))}
      </View>
      <View className="flex-row space-x-2">
        {icons.map((icon, index) => (
          <TouchableOpacity key={index} onPress={() => onIconPress(icon)}>
            {icon === 'add-circle' ? (
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

export default Card;
