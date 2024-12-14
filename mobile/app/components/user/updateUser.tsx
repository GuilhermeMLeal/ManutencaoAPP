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
import { useRoute, useNavigation } from "@react-navigation/native";

interface Squad {
  id: number;
  name: string;
}

const UpdateUserScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const { userId } = route.params; // Recebe o ID do usuário
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [squads, setSquads] = useState<Squad[]>([]);
  const [selectedSquads, setSelectedSquads] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserAndSquads = async () => {
      try {
        // Busca os detalhes do usuário
        const userResponse = await apiAuth.get(`${endpointUser.user}/${userId}`);
        const user = userResponse.data;

        setName(user.name);
        setEmail(user.email);
        setUsername(user.username);
        setSelectedSquads(user.squads.map((squad: Squad) => squad.id));

        // Busca as squads disponíveis
        const squadsResponse = await apiAuth.get(endpointSquad.squad);
        setSquads(squadsResponse.data);
      } catch (error: any) {
        console.error("Erro ao buscar dados do usuário e squads:", error);
        Alert.alert("Erro", "Não foi possível carregar os dados do usuário.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndSquads();
  }, [userId]);

  const toggleSquadSelection = (squadId: number) => {
    if (selectedSquads.includes(squadId)) {
      setSelectedSquads(selectedSquads.filter((id) => id !== squadId));
    } else {
      setSelectedSquads([...selectedSquads, squadId]);
    }
  };

  const handleUpdateUser = async () => {
    if (!name || !email || !username) {
      Alert.alert("Erro", "Preencha todos os campos obrigatórios.");
      return;
    }

    const updatedUser = {
      name,
      email,
      username,
      password: password || undefined, // Se não alterar a senha, envia `undefined`
      squads: selectedSquads.map((id) => ({ id })), // Passa os IDs das Squads selecionadas
    };

    try {
      await apiAuth.put(`${endpointUser.user}/${userId}`, updatedUser);
      Alert.alert("Sucesso", "Usuário atualizado com sucesso!");
      navigation.goBack();
    } catch (error: any) {
      console.error("Erro ao atualizar usuário:", error);
      Alert.alert("Erro", "Não foi possível atualizar o usuário.");
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Atualizar Usuário</Text>
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
        placeholder="Senha (deixe em branco para não alterar)"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Text style={styles.subTitle}>Editar Squads:</Text>
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
      <Button title="Salvar Alterações" onPress={handleUpdateUser} />
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
});

export default UpdateUserScreen;
