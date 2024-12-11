import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import { apiMachine, endpointUser, endpointSquad, apiAuth } from "@/app/services/api";
import { useNavigation } from "expo-router";

interface Squad {
  id: number;
  name: string;
}

const CreateUserScreen: React.FC = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [squads, setSquads] = useState<Squad[]>([]);
  const [selectedSquads, setSelectedSquads] = useState<number[]>([]);

  useEffect(() => {
    // Busca todas as Squads disponíveis
    const fetchSquads = async () => {
      try {
        const response = await apiAuth.get(endpointSquad.squad);
        setSquads(response.data);
      } catch (error: any) {
        console.error("Erro ao buscar squads:", error);
        Alert.alert("Erro", "Não foi possível carregar as squads.");
      }
    };

    fetchSquads();
  }, []);

  const toggleSquadSelection = (squadId: number) => {
    if (selectedSquads.includes(squadId)) {
      setSelectedSquads(selectedSquads.filter((id) => id !== squadId));
    } else {
      setSelectedSquads([...selectedSquads, squadId]);
    }
  };

  const handleCreateUser = async () => {
    if (!name || !email || !username || !password) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    const newUser = {
      name,
      email,
      username,
      password,
      squads: selectedSquads.map((id) => ({ id })), // Passa os IDs das Squads selecionadas
    };

    try {
      const response = await apiAuth.post(endpointUser.user, newUser);

      if (response.status === 201) {
        Alert.alert("Sucesso", "Usuário criado com sucesso!");
        navigation.goBack();
      } else {
        throw new Error("Erro ao criar usuário.");
      }
    } catch (error: any) {
      console.error("Erro ao criar usuário:", error);
      Alert.alert("Erro", "Não foi possível criar o usuário.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Criar Usuário</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Nome de Usuário"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Text style={styles.subTitle}>Adicionar às Squads:</Text>
      {squads.map((squad) => (
        <TouchableOpacity
          key={squad.id}
          style={[
            styles.squadItem,
            selectedSquads.includes(squad.id) && styles.squadItemSelected,
          ]}
          onPress={() => toggleSquadSelection(squad.id)}
        >
          <Text style={styles.squadName}>{squad.name}</Text>
        </TouchableOpacity>
      ))}
      <Button title="Salvar" onPress={handleCreateUser} />
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
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#555",
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#fff",
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  squadItem: {
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: "#eee",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  squadItemSelected: {
    backgroundColor: "#007bff",
    borderColor: "#0056b3",
  },
  squadName: {
    color: "#333",
    fontSize: 16,
  },
});

export default CreateUserScreen;
