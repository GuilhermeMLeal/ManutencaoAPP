"use client";

import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Chip,
} from "@mui/material";
import TitleCreate from "../titles/titleCreate";

const teams = [
  { value: "team1", label: "Equipe 1" },
  { value: "team2", label: "Equipe 2" },
  { value: "team3", label: "Equipe 3" },
];

const parts = [
  { value: "part1", label: "Peça 1" },
  { value: "part2", label: "Peça 2" },
  { value: "part3", label: "Peça 3" },
];

export default function CreateMaintenance() {
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  const [selectedParts, setSelectedParts] = useState<
    { part: string; quantity: number; supplier: string }[]
  >([]);

  const handleTeamChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedTeams(event.target.value as string[]);
  };

  const handlePartChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    const newParts = [...selectedParts];
    newParts[index] = { ...newParts[index], [field]: value };
    setSelectedParts(newParts);
  };

  const addPart = () => {
    setSelectedParts([
      ...selectedParts,
      { part: "", quantity: 0, supplier: "" },
    ]);
  };

  const removePart = (index: number) => {
    setSelectedParts(selectedParts.filter((_, i) => i !== index));
  };

  return (
    <main className="flex-1 flex flex-col bg-white/90 overflow-y-auto max-h-svh">
      <TitleCreate title={"Registro de Solicitações de Manutenção"} />
      <Box component="form" noValidate sx={{ maxWidth: 800, margin: "0 auto" }} className="pt-4">
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
            <FormControl fullWidth variant="outlined">
              <InputLabel id="priority-label">Prioridade</InputLabel>
              <Select
                required
                id="priority"
                name="priority"
                label="Prioridade"
                labelId="priority-label"
              >
                <MenuItem value="Baixa">Baixa</MenuItem>
                <MenuItem value="Média">Média</MenuItem>
                <MenuItem value="Alta">Alta</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="teams-label">Equipes</InputLabel>
              <Select
                multiple
                id="teams"
                name="teams"
                label="Equipes"
                value={selectedTeams}
                onChange={(e) =>
                  handleTeamChange(e as React.ChangeEvent<{ value: unknown }>)
                }
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {(selected as string[]).map((value) => (
                      <Chip
                        key={value}
                        label={
                          teams.find((team) => team.value === value)?.label
                        }
                      />
                    ))}
                  </Box>
                )}
              >
                {teams.map((team) => (
                  <MenuItem key={team.value} value={team.value}>
                    {team.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
            <FormControl fullWidth variant="outlined">
              <InputLabel id="status-label">Status da Manutenção</InputLabel>
              <Select
                required
                id="status"
                name="status"
                label="Status da Manutenção"
                labelId="status-label"
              >
                <MenuItem value="Pendente">Pendente</MenuItem>
                <MenuItem value="Em Andamento">Em Andamento</MenuItem>
                <MenuItem value="Concluída">Concluída</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid container item xs={12} spacing={2} justifyContent="center">
            <Grid item>
              <Button variant="contained" onClick={addPart}>
                Adicionar Peça
              </Button>
            </Grid>
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
          {selectedParts.map((part, index) => (
            <Grid item xs={12} key={index}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  marginBottom: 2,
                }}
              >
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={4}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel id={`part-label-${index}`}>Peça</InputLabel>
                      <Select
                        id={`part-${index}`}
                        name={`part-${index}`}
                        label="Peça"
                        value={part.part}
                        onChange={(e) =>
                          handlePartChange(
                            index,
                            "part",
                            e.target.value as string
                          )
                        }
                        labelId={`part-label-${index}`}
                      >
                        {parts.map((partOption) => (
                          <MenuItem
                            key={partOption.value}
                            value={partOption.value}
                          >
                            {partOption.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      type="number"
                      id={`quantity-${index}`}
                      name={`quantity-${index}`}
                      label="Quantidade"
                      fullWidth
                      variant="outlined"
                      value={part.quantity}
                      onChange={(e) =>
                        handlePartChange(
                          index,
                          "quantity",
                          Number(e.target.value)
                        )
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Grid container alignItems="center">
                      <Grid item xs={9}>
                        <TextField
                          id={`supplier-${index}`}
                          name={`supplier-${index}`}
                          label="Fornecedor"
                          fullWidth
                          variant="outlined"
                          value={part.supplier}
                          onChange={(e) =>
                            handlePartChange(
                              index,
                              "supplier",
                              e.target.value as string
                            )
                          }
                        />
                      </Grid>
                      <Grid
                        item
                        xs={3}
                        sx={{ textAlign: "right", paddingLeft: "5%" }}
                      >
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => removePart(index)}
                        >
                          Remover Peça
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          ))}
          <Grid container item xs={12} justifyContent="center">
            <Grid item xs={12} className="flex justify-center items-center">
              <a href="/pages/index">
                <Button variant="contained" color="primary">
                  Registrar Manutenção
                </Button>
              </a>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </main>
  );
}
