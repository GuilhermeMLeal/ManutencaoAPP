"use client";

import React from "react";
import { Container, Box, Typography, Paper, Grid } from "@mui/material";
import TitleMain from "../titles/titleMain";
import { Line, Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  PointElement
);

const maintenanceData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Manutenções",
      data: [5, 10, 15, 20, 25, 30],
      borderColor: "#3f51b5",
      backgroundColor: "rgba(63, 81, 181, 0.2)",
      fill: true,
    },
  ],
};

const machineData = {
  labels: ["Máquina A", "Máquina B", "Máquina C"],
  datasets: [
    {
      label: "Número de Falhas",
      data: [10, 15, 7],
      backgroundColor: ["#ff6384", "#36a2eb", "#cc65fe"],
    },
  ],
};

const partsData = {
  labels: ["Peça X", "Peça Y", "Peça Z"],
  datasets: [
    {
      label: "Quantidade",
      data: [100, 200, 150],
      backgroundColor: ["#ff6384", "#36a2eb", "#cc65fe"],
    },
  ],
};

const teamPerformanceData = {
  labels: ["Time A", "Time B", "Time C"],
  datasets: [
    {
      label: "Desempenho",
      data: [80, 70, 90],
      backgroundColor: ["#ff6384", "#36a2eb", "#cc65fe"],
    },
  ],
};

const avgResolutionTimeData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Tempo Médio de Resolução (Horas)",
      data: [2, 4, 3, 5, 4, 3],
      borderColor: "#ff5733",
      backgroundColor: "rgba(255, 87, 51, 0.2)",
      fill: true,
    },
  ],
};

const maintenanceVolumeData = {
  labels: [
    "Manutenção Preventiva",
    "Manutenção Corretiva",
    "Manutenção Predial",
  ],
  datasets: [
    {
      label: "Quantidade de Manutenções",
      data: [25, 15, 10],
      backgroundColor: ["#ff6384", "#36a2eb", "#cc65fe"],
    },
  ],
};

export default function DashboardPage() {
  return (
    <main className="flex-1 flex flex-col bg-white/90 overflow-y-auto max-h-svh">
      <TitleMain
        title={"Sistema de Gestão de Manutenção"}
        subtitle="Dashboard de Manutenção e Recursos"
      />
      <Container
        maxWidth="lg"
        className="pt-2">
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 2, height: "100%" }}>
              <Typography variant="h6">
                Manutenções ao Longo do Tempo
              </Typography>
              <Box sx={{ height: 300 }}>
                <Line data={maintenanceData} />
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 2, height: "100%" }}>
              <Typography variant="h6">
                Distribuição das Falhas por Máquina
              </Typography>
              <Box sx={{ height: 300 }}>
                <Bar data={machineData} />
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} display="flex" justifyContent="center">
            <Paper elevation={3} sx={{ p: 2, height: 400 }}>
              <Typography variant="h6" align="center">
                Quantidade de Peças em Estoque
              </Typography>
              <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Pie data={partsData} />
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} display="flex" justifyContent="center">
            <Paper elevation={3} sx={{ p: 2, height: 400 }}>
              <Typography variant="h6" align="center">
                Tempo Médio de Resolução de Solicitações
              </Typography>
              <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Line data={avgResolutionTimeData} />
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} display="flex" justifyContent="center">
            <Paper elevation={3} sx={{ p: 2, height: 400 }}>
              <Typography variant="h6" align="center">
                Desempenho dos Times
              </Typography>
              <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Bar data={teamPerformanceData} />
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} display="flex" justifyContent="center">
            <Paper elevation={3} sx={{ p: 2, height: 400 }}>
              <Typography variant="h6">Volume de Manutenções</Typography>
              <Box sx={{ height: "100%" }}>
                <Pie data={maintenanceVolumeData} />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </main>
  );
}
