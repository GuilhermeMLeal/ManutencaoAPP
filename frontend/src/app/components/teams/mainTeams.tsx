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
import Title from "../title";
import CardBox from "../cardBox";
import { FindItemTextBox } from "../findItemTextBox";

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

  const handleOpenDialog = (item: any) => {
    setSelectedItem(item);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedItem(null);
  };

  return (
    <main className="flex-1 flex flex-col p-6 pt-24 bg-white/90">
      <Title
        title="Sistema de Gestão de Equipes"
        subtitle="Visualização Detalhada de Equipe"
      />
      <FindItemTextBox
        textReport = "Criar Relatório de Equipe"
        textButton="Cadastrar uma Equipe"
        pageText="/pages/teams/createTeam"
        nameTextSearch="Equipe"
      />
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 2,
            mt: 4,
          }}
        >
          {teamData.map((team, index) => (
            <CardBox
              key={index}
              item={team}
              updatePath = "/pages/teams/createTeam"
              onSeeMore={() => handleOpenDialog(team)}
            />
          ))}
        </Box>
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
