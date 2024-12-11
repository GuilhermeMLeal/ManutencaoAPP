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
import { FaEdit, FaTrashAlt } from "react-icons/fa"; // Ícones de lápis e borracha
import Title from "../titles/titleMain";
import { FindItemTextBox } from "../create/findItemTextBox";
import MachineService from "@/app/service/MachineService";
import { useRouter } from "next/navigation";

export default function MainMachines() {
  const [machines, setMachines] = useState<Machine[]>([]);
  const [filteredMachines, setFilteredMachines] = useState<Machine[]>([]);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(3);
  const router = useRouter();

  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const data = await MachineService.getAllMachines();
        setMachines(data);
        setFilteredMachines(data);
      } catch (error) {
        console.error("Error fetching machines:", error);
      }
    };

    fetchMachines();
  }, []);

  const handleSearch = (query: string) => {
    const filtered = machines.filter((machine) =>
      machine.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredMachines(filtered);
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

  const handleEditMachine = (id: number) => {
    router.push(`/pages/machines/createMachine?id=${id}`);
  };

  const handleDeleteMachine = async (id: number) => {
    try {
      await MachineService.deleteMachine(id);
      setMachines((prev) => prev.filter((machine) => machine.id !== id));
      setFilteredMachines((prev) => prev.filter((machine) => machine.id !== id));
    } catch (error) {
      console.error(`Error deleting machine with ID ${id}:`, error);
    }
  };

  return (
    <main className="flex-1 flex flex-col bg-white/90 overflow-y-auto max-h-svh">
      <Title
        title="Sistema de Gestão de Máquinas"
        subtitle="Visualização Detalhada de Máquinas"
      />
      <FindItemTextBox
        textButton="Cadastrar uma Máquina"
        pageText="/pages/machines/createMachine"
        nameTextSearch="Máquina"
        onSearch={handleSearch}
      />
      <Container maxWidth="lg" className="mb-4">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nome</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Modelo</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Localização</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredMachines.length > 0 ? (
                filteredMachines
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((machine) => (
                    <TableRow key={machine.id}>
                      <TableCell>{machine.id}</TableCell>
                      <TableCell>{machine.name}</TableCell>
                      <TableCell>{machine.type}</TableCell>
                      <TableCell>{machine.model}</TableCell>
                      <TableCell>{machine.status?.name || "N/A"}</TableCell>
                      <TableCell>{machine.place?.name || "N/A"}</TableCell>
                      <TableCell>
                        <IconButton
                          color="primary"
                          onClick={() => handleEditMachine(machine.id!)}
                        >
                          <FaEdit />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => handleDeleteMachine(machine.id!)}
                          sx={{ ml: 1 }}
                        >
                          <FaTrashAlt />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    <Typography variant="body1" color="textSecondary">
                      Nenhuma máquina foi encontrada
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={filteredMachines.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </Container>
    </main>
  );
}
