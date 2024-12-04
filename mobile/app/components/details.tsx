import React from "react";
import { View, Text, StyleSheet } from "react-native";

export function DetailsScreen({ route }: { route: any }) {
  const { name, email } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome:</Text>
      <Text style={styles.value}>{name}</Text>

      <Text style={styles.label}>Email:</Text>
      <Text style={styles.value}>{email}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5", // Fundo claro
  },
  label: {
    fontSize: 20,
    marginBottom: 8,
    fontWeight: "bold",
    color: "#333",
  },
  value: {
    fontSize: 18,
    marginBottom: 16,
    color: "#555",
  },
});

export default DetailsScreen;
