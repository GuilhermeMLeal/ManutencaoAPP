"use client";

import React, { useEffect, useState } from "react";
import TitleCreate from "../titles/titleCreate";
import { Box, Button, Grid, TextField } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import ToolService from "@/service/ToolService";

export default function CreateOrEditTool() {
  const [toolData, setToolData] = useState({
    Id: undefined,
    Name: "",
    Quantity: 0,
    Description: "",
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const toolId = searchParams.get("id");

  useEffect(() => {
    if (toolId) {
      ToolService.getToolById(Number(toolId))
        .then((tool) => {
          setToolData(tool);
        })
        .catch((error) => {
          console.error("Error fetching tool:", error);
        });
    }
  }, [toolId]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setToolData((prevData) => ({
      ...prevData,
      [name]: name === "Quantity" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      if (toolId) {
        await ToolService.updateTool(toolData);
      } else {
        await ToolService.addTool(toolData);
      }
      router.push("/tools");
    } catch (error) {
      console.error("Error saving tool:", error);
    }
  };

  return (
    <main className="flex-1 flex flex-col bg-white/90 overflow-y-auto max-h-svh">
      <TitleCreate title={toolId ? "Editar Ferramenta" : "Registrar Ferramenta"} />
      <Box
        component="form"
        noValidate
        sx={{
          width: "100%",
          maxWidth: 1000,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
        }}
        onSubmit={handleSubmit}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="name"
              name="Name"
              label="Nome"
              fullWidth
              variant="outlined"
              value={toolData.Name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="quantity"
              name="Quantity"
              label="Quantidade"
              type="number"
              fullWidth
              variant="outlined"
              value={toolData.Quantity}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="description"
              name="Description"
              label="Descrição"
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              value={toolData.Description}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} className="flex justify-center items-center">
            <Button variant="contained" color="primary" type="submit">
              {toolId ? "Salvar Alterações" : "Registrar Ferramenta"}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </main>
  );
}