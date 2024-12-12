"use client";

import React, { useState } from "react";
import {
  Button,
  Container,
  TextField,
  Typography,
  Box,
  Alert,
  CircularProgress,
} from "@mui/material";
import SquadService from "@/app/service/SquadService";

const CreateTeam: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await SquadService.addSquad({
        Name: name,
        Description: description,
      });
      setSuccess(true);
      setName("");
      setDescription("");
    } catch (error) {
      console.error("Error creating squad:", error);
      setError("Não foi possível criar o time. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "2rem" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Criar Time
      </Typography>

      {success && (
        <Alert severity="success" style={{ marginBottom: "1rem" }}>
          Time criado com sucesso!
        </Alert>
      )}

      {error && (
        <Alert severity="error" style={{ marginBottom: "1rem" }}>
          {error}
        </Alert>
      )}

      <Box component="form" noValidate autoComplete="off" style={{ marginTop: "1rem" }}>
        <TextField
          label="Nome do Time"
          variant="outlined"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          label="Descrição"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Box display="flex" justifyContent="flex-end" marginTop="1rem">
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Salvar"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default CreateTeam;
