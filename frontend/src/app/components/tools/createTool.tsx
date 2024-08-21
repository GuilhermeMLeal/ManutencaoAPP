import React from "react";
import { TextField, Button, Grid, Box, InputAdornment } from "@mui/material";
import TitleCreate from "../titleCreate";

export default function CreateTool() {
  return (
    <main className="flex-1 p-6 pt-24 flex flex-col bg-white/90">
      <TitleCreate title={"Cadastro de Peças"} />
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
      >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="name"
              name="name"
              label="Nome"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="code"
              name="code"
              label="Código"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="supplier"
              name="supplier"
              label="Fornecedor"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="quantity"
              name="quantity"
              label="Quantidade em Estoque"
              type="number"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="unitPrice"
              name="unitPrice"
              label="Valor Unitário"
              type="number"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">R$</InputAdornment>
                ),
              }}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid container item xs={12} justifyContent="center">
            <Grid item>
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="upload-button-file"
                type="file"
              />
              <label htmlFor="upload-button-file">
                <Button variant="contained" component="span">
                  Upload de Imagem
                </Button>
              </label>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <a href="/pages/tools">
              <Button variant="contained" color="primary" fullWidth>
                Cadastrar Peça
              </Button>
            </a>
          </Grid>
        </Grid>
      </Box>
    </main>
  );
}
