import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from "react-native";
import { apiAuth, apiMachine, endpointSquad } from "@/app/services/api";
import FloatingButton from "@/app/components/floatingButton";
import { useNavigation } from "@react-navigation/native";

interface Squad {
  id: number;
  name: string;
  description: string;
}

const ManageSquadsScreen: React.FC = () => {
  const [squads, setSquads] = useState<Squad[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation();
  useEffect(() => {
    const fetchSquads = async () => {
      try {
        const response = await apiAuth.get(endpointSquad.squad);
        setSquads(response.data);
      } catch (err) {
        console.error("Erro ao buscar squads:", err);
        setError("Não foi possível carregar os squads.");
      } finally {
        setLoading(false);
      }
    };

    fetchSquads();
    const unsubscribe = navigation.addListener("focus", () => {
      fetchSquads(); 
    });
  
    return unsubscribe; 
  }, [navigation]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text>Carregando squads...</Text>
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
  const handlePress = (squadId: number) => {
    navigation.navigate("SquadDetails", { squadId });
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gerenciar Squads</Text>

      <FlatList
        data={squads}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity key={item.id} onPress={() => handlePress(item.id)}>
            <View style={styles.squadItem}>
              <Text style={styles.squadName}>{item.name}</Text>
              <Text style={styles.squadDescription}>{item.description}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum squad encontrado.</Text>
        }
      />

      {/* Botão flutuante para criar novo squad */}
      <FloatingButton type="squad" />
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
  squadItem: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },
  squadName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  squadDescription: {
    fontSize: 16,
    color: "#777",
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#999",
    marginVertical: 16,
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
  errorText: {
    color: "#ff0000",
    fontSize: 16,
  },
});

export default ManageSquadsScreen;
