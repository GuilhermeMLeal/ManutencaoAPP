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
  CardMedia,
} from "@mui/material";
import Title from "../titles/titleMain";
import CardBox from "../table/cardBox";
import { FindItemTextBox } from "../create/findItemTextBox";
import PaginationComponent from "../table/PaginationComponent";
import SquadService from "@/app/service/SquadService";

// Ensure you import the Squad type from the correct file
import { Squad } from "../../entities/model/User"; // Replace with the correct path to your Squad entity/type

const MainTeam: React.FC = () => {
  const [squads, setSquads] = useState<Squad[]>([]); // Correct Squad type used here
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Squad | null>(null);

  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(3);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [filteredSquads, setFilteredSquads] = useState<SquadCreateDTO[]>([]);
  // Fetch squads from the API
  useEffect(() => {
    const fetchSquads = async () => {
      try {
        setLoading(true);
        const squadsData = await SquadService.getAllSquads();

        setSquads(squadsData as Squad[]); // Explicitly cast the response to the correct Squad type
      } catch (error) {
        console.error("Error fetching squads:", error);
        setError("Não foi possível carregar as equipes.");
      } finally {
        setLoading(false);
      }
    };

    fetchSquads();
  }, []);

  const handleOpenDialog = (item: Squad) => {
    setSelectedItem(item);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedItem(null);
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
      squad.Name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredSquads(filtered);
    setPage(0); // Reinicia a paginação após a busca
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
        textReport="Criar Relatório de Equipe"
        textButton="Cadastrar uma Equipe"
        pageText="/pages/teams/createTeam"
        nameTextSearch="Equipe"
        typeTextField="Área do Time"
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
                  image: "/image/equipe.png", // Replace with dynamic image path if available
                }}
                updatePath={`/pages/teams/editTeam?id=${squad.id}`} // Example dynamic path
                onSeeMore={() => handleOpenDialog(squad)}
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
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{selectedItem?.name}</DialogTitle>
        <DialogContent>
          <DialogContentText>{selectedItem?.description}</DialogContentText>
          <CardMedia
            sx={{ height: 140 }}
            image="/image/equipe.png" // Replace with dynamic image if available
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </main>
  );
};

export default MainTeam;
