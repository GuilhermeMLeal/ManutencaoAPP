"use client";

import React, { useState } from "react";
import {
  Button,
  Container,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  CardMedia,
  DialogActions,
} from "@mui/material";
import Title from "../title";
import CardBox from "../cardBox";
import { FindItemTextBox } from "../findItemTextBox";

const machineData = [
  {
    title: "Máquina A",
    description: "Parte Superior - Aço Inoxidável",
    image: "/image/roboto.png",
  },
  {
    title: "Máquina B",
    description: "Parte Inferior - Plástico ABS",
    image: "/image/roboto.png",
  },
  {
    title: "Máquina C",
    description: "Motor - Alumínio",
    image: "/image/roboto.png",
  },
];

export default function MainMachine() {
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
        title="Sistema de Gestão de Máquinas"
        subtitle="Visualização Detalhada de Máquinas"
      />
      <FindItemTextBox
        textReport = "Criar Relatório de Máquinas"
        textButton="Cadastrar uma Máquina"
        pageText="/pages/machines/createMachine"
        nameTextSearch="Máquina"
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
          {machineData.map((machine, index) => (
            <CardBox
              key={index}
              item={machine}
              onSeeMore={() => handleOpenDialog(machine)}
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
