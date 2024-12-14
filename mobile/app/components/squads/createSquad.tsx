import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "expo-router";
import { apiAuth, endpointSquad, endpointUser } from "@/app/services/api";

interface User {
  id: number;
  name: string;
}

const CreateSquadScreen: React.FC = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await apiAuth.get(endpointUser.user);
        setUsers(response.data);
      } catch (error: any) {
        console.error("Erro ao buscar usuários:", error);
        Alert.alert("Erro", "Não foi possível carregar os usuários.");
      }
    };

    fetchUsers();
  }, []);

  const toggleUserSelection = (userId: number) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const handleCreateSquad = async () => {
    if (!name || !description) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    const squadData = {
      name,
      description,
      users: selectedUsers.map((id) => ({ id })),
    };

    setLoading(true);
    try {
      const response = await apiAuth.post(endpointSquad.squad, squadData);

      if (response.status === 200 || response.status === 201) {
        Alert.alert("Sucesso", "Squad criado com sucesso!");
        navigation.goBack();
      } else {
        throw new Error("Erro ao criar o squad.");
      }
    } catch (error: any) {
      console.error("Erro ao criar o squad:", error);
      Alert.alert("Erro", "Não foi possível criar o squad.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Criar Squad</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome do Squad"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Descrição do Squad"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text style={styles.subTitle}>Adicionar Usuários:</Text>
      {users.map((user) => (
        <TouchableOpacity
          key={user.id}
          style={[
            styles.userItem,
            selectedUsers.includes(user.id) && styles.userItemSelected,
          ]}
          onPress={() => toggleUserSelection(user.id)}
        >
          <Text style={styles.userName}>{user.name}</Text>
        </TouchableOpacity>
      ))}

      <Button
        title={loading ? "Criando..." : "Salvar"}
        onPress={handleCreateSquad}
        disabled={loading}
      />

      {loading && <ActivityIndicator size="large" color="#007bff" />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
    textAlign: "center",
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#555",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  userItem: {
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: "#eee",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  userItemSelected: {
    backgroundColor: "#007bff",
    borderColor: "#0056b3",
  },
  userName: {
    color: "#333",
    fontSize: 16,
  },
});

export default CreateSquadScreen;
