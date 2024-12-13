"use client";

import React, { useState, useEffect } from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Typography,
  Paper,
  IconButton,
} from "@mui/material";
import { FaEdit } from "react-icons/fa";
import Title from "../titles/titleMain";
import { FindItemTextBox } from "../create/findItemTextBox";
import MaintenanceService from "@/service/MaintenanceService";
import MachineService from "@/service/MachineService";
import { useRouter } from "next/navigation";

interface Machine {
  id: number;
  name: string;
}

interface MaintenancePart {
  id: number;
  maintenanceId: number;
  partId: number;
  quantity: number;
}

interface Maintenance {
  id: number;
  machineId: number;
  observations: string;
  lastUpdate: string;
  startDate: string;
  endDate: string;
  maintenanceParts: MaintenancePart[];
}

export default function MainMaintenance() {
  const [maintenances, setMaintenances] = useState<Maintenance[]>([]);
  const [filteredMaintenances, setFilteredMaintenances] = useState<
    Maintenance[]
  >([]);
  const [machines, setMachines] = useState<Machine[]>([]);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch both maintenances and machines concurrently
        const [maintenanceData, machineData] = await Promise.all([
          MaintenanceService.getAllMaintenances(),
          MachineService.getAllMachines(),
        ]);
        setMaintenances(maintenanceData);
        setFilteredMaintenances(maintenanceData);
        setMachines(machineData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (query: string) => {
    const filtered = maintenances.filter((maintenance) =>
      maintenance.observations.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredMaintenances(filtered);
    setPage(0);
  };

  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEditMaintenance = (id: number) => {
    router.push(`/maintenance/createMaintenance?id=${id}`);
  };

  const getMachineName = (machineId: number) => {
    const machine = machines.find((m) => m.id === machineId);
    return machine ? machine.name : "Máquina não encontrada";
  };

  const getTotalParts = (maintenance: Maintenance) => {
    return maintenance.maintenanceParts.reduce(
      (total, part) => total + part.quantity,
      0
    );
  };

  return (
    <main className="flex-1 flex flex-col bg-white/90 overflow-y-auto max-h-svh">
      <Title
        title="Sistema de Gestão de Manutenções"
        subtitle="Visualização Detalhada de Manutenções"
      />
      <FindItemTextBox
        textButton="Cadastrar uma Manutenção"
        pageText="/maintenance/createMaintenance"
        nameTextSearch="Manutenção"
        onSearch={handleSearch}
      />
      <Container maxWidth="lg" className="mb-4">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Máquina</TableCell>
                <TableCell>Início</TableCell>
                <TableCell>Fim</TableCell>
                <TableCell>Última Atualização</TableCell>
                <TableCell>Total de Peças</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredMaintenances.length > 0 ? (
                filteredMaintenances
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((maintenance) => (
                    <TableRow key={maintenance.id}>
                      <TableCell>{maintenance.id}</TableCell>
                      <TableCell>{getMachineName(maintenance.machineId)}</TableCell>
                      <TableCell>{maintenance.startDate}</TableCell>
                      <TableCell>{maintenance.endDate}</TableCell>
                      <TableCell>{maintenance.lastUpdate}</TableCell>
                      <TableCell>{getTotalParts(maintenance)}</TableCell>
                      <TableCell>
                        <IconButton
                          color="primary"
                          onClick={() => handleEditMaintenance(maintenance.id)}
                        >
                          <FaEdit />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    <Typography variant="body1" color="textSecondary">
                      Nenhuma manutenção foi encontrada
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={filteredMaintenances.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          rowsPerPageOptions={[5, 10, 15, 20]}
        />
      </Container>
    </main>
  );
}
