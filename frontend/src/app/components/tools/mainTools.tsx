import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import CardBox from "../cardBox";
import Title from "../title";

function createData(
  name: string,
  code: string,
  supplier: string,
  quantity: number,
  unitPrice: number,
  imageUrl: string,
  description: string,
) {
  return {
    name,
    code,
    supplier,
    quantity,
    unitPrice,
    imageUrl,
    description,
  };
}

const rows = [
  createData(
    "Peça A",
    "P001",
    "Fornecedor X",
    100,
    15.0,
    "/image/parafuso.avif",
    "Descrição da Peça A.",
  ),
  createData(
    "Peça B",
    "P002",
    "Fornecedor Y",
    200,
    22.0,
    "/image/parafuso.avif",
    "Descrição da Peça B.",
  ),
  createData(
    "Peça C",
    "P003",
    "Fornecedor Z",
    150,
    18.0,
    "/image/parafuso.avif",
    "Descrição da Peça C.",
  ),
];

export default function MainTools() {
  return (
    <main className="flex-1 flex flex-col p-6 pt-24 bg-white/90">
      <Title title={"Sistema de Gestão de Peças"} />
      <Box sx={{ textAlign: "center", mb: 4, paddingTop: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Visualização Detalhada de Peças
        </Typography>
        <a href="/pages/tools/createTool">
          <Button variant="contained" color="primary" size="large">
            Cadastrar uma Peça
          </Button>
        </a>
      </Box>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            justifyContent: "center",
            mt: 4,
          }}
        >
          {rows.map((row, index) => (
            <CardBox
              key={index}
              image={row.imageUrl}
              title={`${row.name} (Código: ${row.code})`}
              description={`Fornecedor: ${row.supplier} - Quantidade: ${row.quantity} - Valor Unitário: R$${row.unitPrice.toFixed(2)}`}
              text={row.name}
            />
          ))}
        </Box>
      </Container>
    </main>
  );
}
