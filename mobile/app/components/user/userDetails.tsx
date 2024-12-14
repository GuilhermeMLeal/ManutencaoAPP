import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { apiAuth, endpointUser } from "@/app/services/api";

interface Squad {
  id: number;
  name: string;
  description: string | null;
}

interface User {
  id: number;
  name: string;
  email: string;
  username: string;
  roles: { name: string }[];
  squads: Squad[];
}

const UserDetailsScreen: React.FC = () => {
  const route = useRoute<any>();
  const navigation = useNavigation();
  const { userId } = route.params;

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setLoading(true);
        const response = await apiAuth.get(`${endpointUser.user}/${userId}`);
        setUser(response.data);
      } catch (error: any) {
        console.error("Erro ao buscar detalhes do usuário:", error);
        setError("Não foi possível carregar os detalhes do usuário.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId]);

  const handleEdit = () => {
    navigation.navigate("EditUser", { userId }); // Certifique-se de que existe uma tela de edição configurada
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.loadingText}>Carregando detalhes...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Detalhes do usuário não disponíveis.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Detalhes do Usuário</Text>
      <View style={styles.card}>
        <Text style={styles.label}>ID:</Text>
        <Text style={styles.value}>{user.id}</Text>

        <Text style={styles.label}>Nome:</Text>
        <Text style={styles.value}>{user.name}</Text>

        <Text style={styles.label}>E-mail:</Text>
        <Text style={styles.value}>{user.email}</Text>

        <Text style={styles.label}>Nome de Usuário:</Text>
        <Text style={styles.value}>{user.username}</Text>

        <Text style={styles.label}>Funções:</Text>
        {user.roles.length > 0 ? (
          user.roles.map((role, index) => (
            <Text key={index} style={styles.value}>
              {role.name}
            </Text>
          ))
        ) : (
          <Text style={styles.value}>Nenhuma função associada</Text>
        )}

        <Text style={styles.label}>Squads:</Text>
        {user.squads.length > 0 ? (
          user.squads.map((squad) => (
            <View key={squad.id} style={styles.squadContainer}>
              <Text style={styles.value}>{squad.name}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.value}>Nenhuma squad associada</Text>
        )}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleEdit}>
        <Text style={styles.buttonText}>Editar Usuário</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
    paddingTop: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#555",
  },
  value: {
    fontSize: 16,
    marginBottom: 12,
    color: "#777",
  },
  squadContainer: {
    marginBottom: 8,
    marginLeft: 8,
  },
  squadDescription: {
    fontSize: 14,
    color: "#999",
    marginTop: 4,
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
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  errorText: {
    fontSize: 18,
    color: "#ff0000",
    textAlign: "center",
    paddingHorizontal: 16,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default UserDetailsScreen;
