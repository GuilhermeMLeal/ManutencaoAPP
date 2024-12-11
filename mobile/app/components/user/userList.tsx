import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { apiAuth, apiMachine, endpointUser } from "@/app/services/api";
import FloatingButton from "@/app/components/floatingButton";

const UserListScreen: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await apiAuth.get(endpointUser.user);
        setUsers(response.data);
      } catch (error: any) {
        console.error("Erro ao buscar usuários:", error);
        Alert.alert("Erro", "Não foi possível carregar os usuários.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.loadingText}>Carregando usuários...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Usuários</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.userCard}>
            <Text style={styles.userName}>{item.name}</Text>
            <Text style={styles.userEmail}>{item.email}</Text>
            <Text style={styles.userSquads}>
              Squads: {item.squads.map((squad: any) => squad.name).join(", ")}
            </Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum usuário encontrado.</Text>}
      />
      <FloatingButton type="user" />
    </View>
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
  userCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  userEmail: {
    fontSize: 14,
    color: "#555",
  },
  userSquads: {
    fontSize: 12,
    color: "#777",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  loadingText: {
    marginTop: 8,
    fontSize: 16,
    color: "#555",
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#555",
  },
});

export default UserListScreen;
