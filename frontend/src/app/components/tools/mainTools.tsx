"use client";

import React, { useState } from "react";
import { Box, Container, TablePagination } from "@mui/material";
import CardBox from "../table/cardBox";
import Title from "../titles/titleMain";
import { FindItemTextBox } from "../create/findItemTextBox";
import PaginationComponent from "../table/PaginationComponent";

function createData(
  name: string,
  code: string,
  supplier: string,
  quantity: number,
  unitPrice: number,
  imageUrl: string,
  description: string
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
    "Descrição da Peça A."
  ),
  createData(
    "Peça B",
    "P002",
    "Fornecedor Y",
    200,
    22.0,
    "/image/parafuso.avif",
    "Descrição da Peça B."
  ),
  createData(
    "Peça C",
    "P003",
    "Fornecedor Z",
    150,
    18.0,
    "/image/parafuso.avif",
    "Descrição da Peça C."
  ),
];

export default function MainTools() {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(3);

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

  const handleSeeMore = (name: string) => {
    console.log(`Ver mais sobre ${name}`);
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
      />
      <Container maxWidth="lg" className="mb-4">
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            justifyContent: "center",
            mt: 4,
          }}
        >
          {rows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => (
              <CardBox
                key={index}
                item={{
                  title: `${row.name} (Código: ${row.code})`,
                  description: `Fornecedor: ${row.supplier} - Quantidade: ${row.quantity} - Valor Unitário: R$${row.unitPrice.toFixed(2)}`,
                  image: row.imageUrl,
                }}
                updatePath="/pages/tools/createTool"
                onSeeMore={() => handleSeeMore(row.name)}
              />
            ))}
        </Box>
        {/* <PaginationComponent
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        /> */}
      </Container>
    </main>
  );
}
