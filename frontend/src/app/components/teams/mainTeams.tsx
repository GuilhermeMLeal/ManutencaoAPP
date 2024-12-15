"use client";

import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import Title from "../titles/titleMain";
import CardBox from "../table/cardBox";
import { FindItemTextBox } from "../create/findItemTextBox";
import PaginationComponent from "../table/PaginationComponent";
import UnifiedService from "@/service/UserService";

const MainTeam: React.FC = () => {
  const [squads, setSquads] = useState<Squad[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Squad | null>(null);

  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(3);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [filteredSquads, setFilteredSquads] = useState<Squad[]>([]);

  // Fetch squads from the API
  useEffect(() => {
    fetchSquads();
  }, []);

  const fetchSquads = async () => {
    try {
      setLoading(true);
      const squadsData = await UnifiedService.getAllSquads();
      setSquads(squadsData);
    } catch (error) {
      setError("Não foi possível carregar as equipes.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (item: Squad) => {
    setSelectedItem(item);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedItem(null);
  };

  const handleConfirmDelete = async () => {
    if (selectedItem) {
      try {
        await UnifiedService.deleteSquad(selectedItem.id);
        setOpenDialog(false);
        setSelectedItem(null);
        fetchSquads();
      } catch (error) {
        console.error("Error deleting squad:", error);
      }
    }
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

  const handleSearch = (query: string) => {
    const filtered = squads.filter((squad) =>
      squad.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredSquads(filtered);
    setPage(0);
  };

  if (loading) {
    return (
      <main className="flex-1 flex flex-col bg-white/90 overflow-y-auto max-h-svh">
        <Title
          title="Sistema de Gestão de Equipes"
          subtitle="Carregando equipes..."
        />
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex-1 flex flex-col bg-white/90 overflow-y-auto max-h-svh">
        <Title title="Sistema de Gestão de Equipes" subtitle="Erro" />
        <p>{error}</p>
      </main>
    );
  }

  return (
    <main className="flex-1 flex flex-col bg-white/90 overflow-y-auto max-h-svh">
      <Title
        title="Sistema de Gestão de Equipes"
        subtitle="Visualização Detalhada de Equipe"
      />
      <FindItemTextBox
        textButton="Cadastrar uma Equipe"
        pageText="/teams/createTeam"
        nameTextSearch="Equipe"
        onSearch={handleSearch}
      />
      <Container maxWidth="lg" className="mb-4">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 2,
            mt: 4,
          }}
        >
          {squads
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((squad) => (
              <CardBox
                key={squad.id}
                item={{
                  title: squad.name,
                  description: squad.description,
                  image: "/image/equipe.png",
                }}
                updatePath={`/teams/createTeam?id=${squad.id}`}
                onDelete={() => handleOpenDialog(squad)} // Abre o modal de confirmação
              />
            ))}
        </Box>
        <PaginationComponent
          count={squads.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </Container>

      {/* Modal de Exclusão */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Confirmar Exclusão
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Tem certeza de que deseja excluir a equipe{" "}
            <strong>{selectedItem?.name}</strong>? Esta ação não pode ser
            desfeita.
          </DialogContentText>

          {selectedItem && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1" color="textPrimary">
                <strong>Nome:</strong> {selectedItem.name}
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
                <strong>Descrição:</strong>{" "}
                {selectedItem.description || "Sem descrição"}
              </Typography>
            </Box>
          )}
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
};

export default MainTeam;
