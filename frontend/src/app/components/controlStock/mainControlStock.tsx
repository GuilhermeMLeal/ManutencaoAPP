"use client";

import React, { useEffect, useState } from "react";
import { Container, Box, Typography, Paper, Grid, CircularProgress } from "@mui/material";
import { Bar, Pie } from "react-chartjs-2";
import TitleMain from "../titles/titleMain";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ToolService from "@/service/ToolService";
import MaintenanceService from "@/service/MaintenanceService";
import MachineService from "@/service/MachineService";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

// Tipos para os dados de API
interface Tool {
  Id: number;
  Name: string;
  Quantity: number;
}

interface Maintenance {
  id: number;
  machineId: number;
  maintenanceParts: { partId: number; quantity: number }[];
}

interface Machine {
  id: number;
  name: string;
  placeId: number;
}

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [charts, setCharts] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Fetch Ferramentas no Estoque
        const tools: Tool[] = await ToolService.getAllTools();
        const toolLabels = tools.map((tool) => tool.Name);
        const toolQuantities = tools.map((tool) => Math.max(tool.Quantity, 0)); // Evitar valores negativos

        // Fetch Peças Utilizadas em Manutenção por Máquina
        const maintenances: Maintenance[] = await MaintenanceService.getAllMaintenances();
        const machines: Machine[] = await MachineService.getAllMachines();

        const toolsUsedByMachine = maintenances.reduce((acc: Record<string, number>, curr) => {
          const machine = machines.find((m) => m.id === curr.machineId)?.name || "Desconhecida";
          const totalToolsUsed = curr.maintenanceParts.reduce((sum, part) => sum + part.quantity, 0);
          acc[machine] = (acc[machine] || 0) + totalToolsUsed;
          return acc;
        }, {});

        // Fetch Quantidade de Máquinas por Localização
        const locations = await MachineService.getAllPlaces(); // Assumindo que `getAllPlaces` retorna informações das localizações
        const machinesByLocation = machines.reduce((acc: Record<string, number>, curr) => {
          const locationName = locations.find((loc) => loc.id === curr.placeId)?.name || "Local Desconhecido";
          acc[locationName] = (acc[locationName] || 0) + 1;
          return acc;
        }, {});

        // Configurações dos gráficos
        const chartConfigs = [
          {
            type: "pie",
            title: "Peças no Estoque",
            data: {
              labels: toolLabels,
              datasets: [
                {
                  label: "Quantidade",
                  data: toolQuantities,
                  backgroundColor: toolLabels.map(
                    (_, index) => `hsl(${(index * 360) / toolLabels.length}, 70%, 50%)`
                  ),
                },
              ],
            },
          },
          {
            type: "bar",
            title: "Quantidade de Máquinas por Localização",
            data: {
              labels: Object.keys(machinesByLocation),
              datasets: [
                {
                  label: "Quantidade de Máquinas",
                  data: Object.values(machinesByLocation),
                  backgroundColor: ["#36a2eb", "#ff6384", "#cc65fe", "#ffce56", "#4bc0c0"],
                },
              ],
            },
          },
          {
            type: "horizontalBar",
            title: "Peças Utilizadas em Manutenção (Horizontal)",
            data: {
              labels: Object.keys(toolsUsedByMachine),
              datasets: [
                {
                  label: "Peças Utilizadas",
                  data: Object.values(toolsUsedByMachine),
                  backgroundColor: ["#36a2eb", "#ff6384", "#cc65fe", "#ffce56", "#4bc0c0"],
                },
              ],
            },
          },
        ];

        setCharts(chartConfigs);
        setError(null);
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
        setError("Erro ao carregar os dados. Por favor, tente novamente.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <main className="flex-1 flex justify-center items-center">
        <CircularProgress />
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex-1 flex justify-center items-center">
        <Typography color="error">{error}</Typography>
      </main>
    );
  }

  return (
    <main className="flex-1 flex flex-col bg-white/90 overflow-y-auto max-h-svh">
      <TitleMain title={"Relatórios de Manutenção e Recursos"} subtitle="Dashboard de Manutenção e Recursos" />
      <Container maxWidth="lg" className="pt-2">
        <Grid container spacing={4}>
          {charts.map((chart, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Paper elevation={3} sx={{ p: 2, height: "100%" }}>
                <Typography variant="h6">{chart.title}</Typography>
                <Box sx={{ height: 300 }}>
                  {chart.type === "bar" && <Bar data={chart.data} />}
                  {chart.type === "pie" && <Pie data={chart.data} />}
                  {chart.type === "horizontalBar" && (
                    <Bar
                      data={chart.data}
                      options={{
                        indexAxis: "y",
                      }}
                    />
                  )}
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </main>
  );
}
