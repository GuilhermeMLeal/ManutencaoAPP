import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { apiAuth, endpointSquad, endpointUser } from "@/app/services/api";

const UpdateSquadScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const { squadId } = route.params;

  const [squadDetails, setSquadDetails] = useState<any>(null);
  const [allUsers, setAllUsers] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSquadDetails = async () => {
      try {
        const [squadResponse, usersResponse] = await Promise.all([
          apiAuth.get(`${endpointSquad.squad}/${squadId}`),
          apiAuth.get(endpointUser.user),
        ]);

        const squadData = squadResponse.data;
        const allUsersData = usersResponse.data;

        setSquadDetails({
          ...squadData,
          users: squadData.users || [],
        });

        const availableUsers = allUsersData.filter(
          (user: any) => !squadData.users.some((squadUser: any) => squadUser.id === user.id)
        );

        setAllUsers(availableUsers);
      } catch (error) {
        console.error("Erro ao buscar os detalhes do Squad:", error);
        Alert.alert("Erro", "Não foi possível carregar os detalhes do Squad.");
      } finally {
        setLoading(false);
      }
    };

    fetchSquadDetails();
  }, [squadId]);

  const handleAddUser = (user: { id: number; name: string }) => {
    setSquadDetails({
      ...squadDetails,
      users: [...squadDetails.users, user],
    });
    setAllUsers(allUsers.filter((u) => u.id !== user.id));
  };

  const handleRemoveUser = (user: { id: number; name: string }) => {
    setSquadDetails({
      ...squadDetails,
      users: squadDetails.users.filter((u: any) => u.id !== user.id),
    });
    setAllUsers([...allUsers, user]);
  };

  const handleSave = async () => {
    const updatedSquad = {
      name: squadDetails.name,
      description: squadDetails.description,
      users: squadDetails.users.map((user: any) => ({ id: user.id })),
    };

    try {
      await apiAuth.put(`${endpointSquad.squad}/${squadId}`, updatedSquad);
      Alert.alert("Sucesso", "Squad atualizado com sucesso!");
      navigation.goBack();
    } catch (error) {
      console.error("Erro ao salvar o Squad:", error);
      Alert.alert("Erro", "Não foi possível salvar o Squad.");
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Carregando...</Text>
      </View>
    );
  }

  if (!squadDetails) {
    return (
      <View style={styles.errorContainer}>
        <Text>Detalhes do Squad não encontrados.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Editar Squad</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do Squad"
        value={squadDetails.name}
        onChangeText={(text) => setSquadDetails({ ...squadDetails, name: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição do Squad"
        value={squadDetails.description}
        onChangeText={(text) =>
          setSquadDetails({ ...squadDetails, description: text })
        }
        multiline
      />
      <Text style={styles.subTitle}>Usuários no Squad:</Text>
      {squadDetails.users.length > 0 ? (
        squadDetails.users.map((user: any) => (
          <View key={user.id} style={styles.userContainer}>
            <Text style={styles.userName}>{user.name}</Text>
            <Button title="Remover" onPress={() => handleRemoveUser(user)} />
          </View>
        ))
      ) : (
        <Text style={styles.noUsersText}>Nenhum usuário no Squad</Text>
      )}
      <Text style={styles.subTitle}>Adicionar Usuários:</Text>
      {allUsers.length > 0 ? (
        allUsers.map((user) => (
          <View key={user.id} style={styles.userContainer}>
            <Text style={styles.userName}>{user.name}</Text>
            <Button title="Adicionar" onPress={() => handleAddUser(user)} />
          </View>
        ))
      ) : (
        <Text style={styles.noUsersText}>Nenhum usuário disponível</Text>
      )}
      <Button title="Salvar Alterações" onPress={handleSave} />
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
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#555",
  },
  userContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  userName: {
    fontSize: 16,
    color: "#333",
  },
  noUsersText: {
    fontSize: 14,
    color: "#777",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default UpdateSquadScreen;
