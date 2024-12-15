import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Text,
} from "react-native";
import { useNavigation } from "expo-router";
import Card from "../card";
import FloatingButton from "../floatingButton";
import MachineService from "../../services/MachineService"; // Importa o serviço
import { apiMachine, endpointPlace } from "@/app/services/api";
import { useReloadContext } from "@/app/context/reloadContext";

interface Place {
  id: number;
  name: string;
}

interface Machine {
  Id: number;
  Name: string;
  Type: string;
  Model: string;
  ManufactureDate: Date;
  SerialNumber: string;
  Status: string;
  PlaceId?: number | null;
  PlaceName?: string; // Inclui o nome do lugar
}

const MachineScreen: React.FC = () => {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation<any>();
  const { reloadKey } = useReloadContext();

  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const fetchedMachines = await MachineService.getAllMachines();

        const machinesWithPlaces = await Promise.all(
          fetchedMachines.map(async (machine: any): Promise<Machine> => {
            let placeName = "Desconhecido";

            // Faz um GET no backend para buscar o nome do lugar se `PlaceId` existir
            if (machine.placeId) {
              try {
                const placeResponse = await apiMachine.get(
                  `${endpointPlace.place}/${machine.placeId}`
                );
                placeName = placeResponse.data?.name || "Desconhecido";
              } catch (err) {
                console.warn(`Erro ao buscar PlaceId ${machine.placeId}:`, err);
              }
            }

            return {
              Id: machine.id,
              Name: machine.name,
              Type: machine.type,
              Model: machine.model,
              ManufactureDate: new Date(machine.manufactureDate),
              SerialNumber: machine.serialNumber,
              Status: machine.status,
              PlaceId: machine.placeId ?? null,
              PlaceName: placeName,
            };
          })
        );

        setMachines(machinesWithPlaces);
        setLoading(false);
      } catch (err) {
        console.error("Erro ao buscar máquinas:", err);
        setError("Não foi possível carregar as máquinas.");
        setLoading(false);
      }
    };

    const unsubscribe = navigation.addListener("focus", () => {
      fetchMachines(); 
    });
    fetchMachines();
    return unsubscribe;
    
  }, [reloadKey, navigation]);

  const handlePress = (itemId: number) => {
    navigation.navigate("MachineDetails", {
      itemId: itemId,
    });
  };

  const renderItem = ({ item }: { item: Machine }) => (
    <TouchableOpacity onPress={() => handlePress(item.Id)}>
      <Card
        title={item.Name}
        field={{
          Tipo: item.Type,
          Modelo: item.Model,
          Localização: item.PlaceName || "Desconhecido",
        }}
        icons={[]} // Ícones desativados para o exemplo
        onIconPress={() => {}} // Nenhuma ação definida para ícones
      />
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={styles.loadingText}>Carregando máquinas...</Text>
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

  return (
    <View style={styles.container}>
      <FlatList
        data={machines}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.Id)} // Converte Id para string
      />
      <FloatingButton type="machine" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
    paddingTop: 24,
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
});

export default MachineScreen;
