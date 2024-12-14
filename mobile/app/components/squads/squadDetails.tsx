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
import { apiAuth, endpointSquad } from "@/app/services/api";

interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

interface SquadDetails {
  id: number;
  name: string;
  description: string;
  users: User[];
}

const SquadDetailsScreen: React.FC = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { squadId } = route.params;

  const [squad, setSquad] = useState<SquadDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSquadDetails = async () => {
      try {
        setLoading(true);
        const response = await apiAuth.get(`${endpointSquad.squad}/${squadId}`);
        setSquad(response.data);
      } catch (error: any) {
        console.error("Erro ao buscar detalhes do squad:", error);
        setError("Não foi possível carregar os detalhes do squad.");
      } finally {
        setLoading(false);
      }
    };

    fetchSquadDetails();
  }, [squadId]);

  const handleEdit = () => {
    navigation.navigate("UpdateSquad", { squadId });
  };

  const handleDelete = async () => {
    Alert.alert(
      "Confirmação",
      "Tem certeza que deseja deletar este squad?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Deletar",
          style: "destructive",
          onPress: async () => {
            try {
              await apiAuth.delete(`${endpointSquad.squad}/${squadId}`);
              Alert.alert("Sucesso", "Squad deletado com sucesso.");
              navigation.goBack();
            } catch (error: any) {
              console.error("Erro ao deletar o squad:", error);
              Alert.alert("Erro", "Não foi possível deletar o squad.");
            }
          },
        },
      ]
    );
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

  if (!squad) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Detalhes do squad não disponíveis.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Detalhes do Squad</Text>
      <View style={styles.card}>
        <Text style={styles.label}>ID:</Text>
        <Text style={styles.value}>{squad.id}</Text>

        <Text style={styles.label}>Nome:</Text>
        <Text style={styles.value}>{squad.name}</Text>

        <Text style={styles.label}>Descrição:</Text>
        <Text style={styles.value}>{squad.description}</Text>

        <Text style={styles.label}>Usuários:</Text>
        {squad.users.length > 0 ? (
          squad.users.map((user) => (
            <View key={user.id} style={styles.userContainer}>
              <Text style={styles.userValue}>
                {user.name} ({user.email})
              </Text>
            </View>
          ))
        ) : (
          <Text style={styles.value}>Nenhum usuário associado.</Text>
        )}
      </View>

      <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
        <Text style={styles.buttonText}>Editar Squad</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.buttonText}>Deletar Squad</Text>
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
  userContainer: {
    marginBottom: 8,
    marginLeft: 8,
  },
  userValue: {
    fontSize: 16,
    color: "#555",
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
  editButton: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  deleteButton: {
    backgroundColor: "#ff0000",
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

export default SquadDetailsScreen;
