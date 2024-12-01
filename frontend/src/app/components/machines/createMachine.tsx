import React from "react";
import { TextField, Button, Grid, Box } from "@mui/material";
import Title from "@/app/components/title";
import TitleCreate from "../titles/titleCreate";

export default function CreateMachine() {
  return (
    <main className="flex-1 p-6 pt-24 flex flex-col bg-white/90">
      <TitleCreate title={"Registro de Máquinas"} />
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
              id="type"
              name="type"
              label="Tipo"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="model"
              name="model"
              label="Modelo"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="manufacturingDate"
              name="manufacturingDate"
              label="Data de Fabricação"
              type="date"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="serialNumber"
              name="serialNumber"
              label="Número de Série"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="location"
              name="location"
              label="Localização"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid container item xs={12} justifyContent="center">
            <Grid item>
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="raised-button-file"
                multiple
                type="file"
              />
              <label htmlFor="raised-button-file">
                <Button variant="contained" component="span">
                  Upload de Arquivos
                </Button>
              </label>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <a href="/pages/machines">
              <Button variant="contained" color="primary" fullWidth>
                Registrar Máquina
              </Button>
            </a>
          </Grid>
        </Grid>
      </Box>
    </main>
  );
}
