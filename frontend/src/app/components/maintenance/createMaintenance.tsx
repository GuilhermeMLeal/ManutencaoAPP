import React from "react";
import { TextField, Button, Grid, Box, MenuItem } from "@mui/material";
import Title from "../title";

export default function CreateMaintenance() {
  return (
    <main className="flex-1 p-6 pt-24 flex flex-col bg-white/90">
      <Title title={"Cadastro de Solicitações de Manutenção"} />
      <Box component="form" noValidate>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              id="description"
              name="description"
              label="Descrição do Problema"
              fullWidth
              multiline
              rows={4}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="requestDate"
              name="requestDate"
              label="Data da Solicitação"
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
              id="priority"
              name="priority"
              label="Prioridade"
              fullWidth
              select
              variant="outlined"
            >
              <MenuItem value="Baixa">Baixa</MenuItem>
              <MenuItem value="Média">Média</MenuItem>
              <MenuItem value="Alta">Alta</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="responsible"
              name="responsible"
              label="Responsável"
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="status"
              name="status"
              label="Status da Manutenção"
              fullWidth
              select
              variant="outlined"
            >
              <MenuItem value="Pendente">Pendente</MenuItem>
              <MenuItem value="Em Andamento">Em Andamento</MenuItem>
              <MenuItem value="Concluída">Concluída</MenuItem>
            </TextField>
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
            <TextField
              id="comments"
              name="comments"
              label="Comentários"
              fullWidth
              multiline
              rows={4}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <a href="/pages/index">
              <Button variant="contained" color="primary" fullWidth>
                Cadastrar Solicitação
              </Button>
            </a>
          </Grid>
        </Grid>
      </Box>
    </main>
  );
}
