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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Title from "../titles/titleMain";
import { FindItemTextBox } from "../create/findItemTextBox";
import ToolService from "@/service/ToolService";
import { useRouter } from "next/navigation";

interface Tool {
  Id: number;
  Name: string;
  Quantity: number;
  Description: string;
}

export default function MainTools() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [filteredTools, setFilteredTools] = useState<Tool[]>([]);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(3);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedToolId, setSelectedToolId] = useState<number | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const data = await ToolService.getAllTools();
        setTools(data);
        setFilteredTools(data);
      } catch (error) {
        console.error("Error fetching tools:", error);
      }
    };

    fetchTools();
  }, []);

  const handleSearch = (query: string) => {
    const filtered = tools.filter((tool) =>
      tool.Name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredTools(filtered);
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

  const handleEditTool = (id: number) => {
    router.push(`/tools/createTool?id=${id}`);
  };

  const handleOpenDialog = (id: number) => {
    setSelectedToolId(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedToolId(null);
  };

  const handleConfirmDelete = async () => {
    if (selectedToolId === null) return;
    try {
      await ToolService.deleteTool(selectedToolId);
      const updatedTools = tools.filter((tool) => tool.Id !== selectedToolId);
      setTools(updatedTools);
      setFilteredTools(updatedTools);
      handleCloseDialog();
    } catch (error) {
      console.error(`Error deleting tool with ID ${selectedToolId}:`, error);
    }
  };

  return (
    <main className="flex-1 flex flex-col bg-white/90 overflow-y-auto max-h-svh">
      <Title
        title="Sistema de Gestão de Peças"
        subtitle="Visualização Detalhada de Peças"
      />
      <FindItemTextBox
        textButton="Cadastrar uma Peça"
        pageText="/tools/createTool"
        nameTextSearch="Peça"
        onSearch={handleSearch}
      />
      <Container maxWidth="lg" className="mb-4">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nome</TableCell>
                <TableCell>Quantidade</TableCell>
                <TableCell>Descrição</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTools.length > 0 ? (
                filteredTools
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((tool) => (
                    <TableRow key={tool.Id}>
                      <TableCell>{tool.Id}</TableCell>
                      <TableCell>{tool.Name}</TableCell>
                      <TableCell>{tool.Quantity}</TableCell>
                      <TableCell>{tool.Description}</TableCell>
                      <TableCell>
                        <IconButton
                          color="primary"
                          onClick={() => handleEditTool(tool.Id)}
                        >
                          <FaEdit />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => handleOpenDialog(tool.Id)}
                          sx={{ ml: 1 }}
                        >
                          <FaTrashAlt />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <Typography variant="body1" color="textSecondary">
                      Nenhuma peça foi encontrada
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={filteredTools.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </Container>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Tem certeza de que deseja excluir esta peça? Esta ação não pode ser
            desfeita.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button onClick={handleCloseDialog} sx={{ color: "black" }}>
          Cancelar
        </Button>
          <Button onClick={handleConfirmDelete} color="error" autoFocus>
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </main>
  );
}
