"use client";

import React, { useState } from "react";
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

const teamData = [
  {
    title: "Time 1",
    description: "Elétrica",
    image: "/image/equipe.png",
  },
  {
    title: "Time 2",
    description: "Mecânica",
    image: "/image/equipe.png",
  },
  {
    title: "Time 3",
    description: "Logística",
    image: "/image/equipe.png",
  },
];

export default function MainTeam() {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(3);

  const handleOpenDialog = (item: any) => {
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
          {teamData
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((team, index) => (
              <CardBox
                key={index}
                item={team}
                updatePath="/pages/teams/createTeam"
                onSeeMore={() => handleOpenDialog(team)}
              />
            ))}
        </Box>
        {/* <PaginationComponent
          count={teamData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        /> */}
      </Container>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{selectedItem?.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{selectedItem?.description}</DialogContentText>
          <CardMedia sx={{ height: 140 }} image={selectedItem?.image} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </main>
  );
}
