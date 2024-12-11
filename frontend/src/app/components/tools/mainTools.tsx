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
  Button,
} from "@mui/material";
import Title from "../titles/titleMain";
import { FindItemTextBox } from "../create/findItemTextBox";
import ToolService from "@/app/service/ToolService";
import { useRouter } from "next/navigation";

export default function MainTools() {
  const [tools, setTools] = useState<ToolDTO[]>([]);
  const [filteredTools, setFilteredTools] = useState<ToolDTO[]>([]);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(3);
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
    setPage(0); // Reinicia a paginação após a busca
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
    router.push(`/pages/tools/createTool?id=${id}`);
  };

  return (
    <main className="flex-1 flex flex-col bg-white/90 overflow-y-auto max-h-svh">
      <Title
        title="Sistema de Gestão de Peças"
        subtitle="Visualização Detalhada de Peças"
      />
      <FindItemTextBox
        textReport="Criar Relatório de Peças"
        textButton="Cadastrar uma Peça"
        pageText="/pages/tools/createTool"
        nameTextSearch="Peça"
        typeTextField="Fornecedor"
        onSearch={handleSearch} // Passa a lógica de busca
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
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleEditTool(tool.Id!)}
                        >
                          Editar
                        </Button>
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
    </main>
  );
}
