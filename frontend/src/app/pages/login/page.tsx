"use client";
import React, { useState } from "react";
import {
  TextField,
  Checkbox,
  Button,
  FormControlLabel,
  Typography,
  Box,
  Avatar,
  Paper,
} from "@mui/material";

export default function Login() {
  // Estado para os valores dos campos
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    remember: false,
  });

  // Função para lidar com as mudanças nos campos
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <Box
      className="flex items-center justify-center min-h-screen bg-white"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "white",
        minHeight: "100vh",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          width: 400,
          borderRadius: 2,
          border: "1px solid #e0e0e0",
        }}
      >
        {/* Foto do usuário */}
        <Box display="flex" justifyContent="center" mb={3}>
          <Avatar
            alt="User Avatar"
            src={"/image/Logo2.jpg"}
            sx={{
              width: 80,
              height: 80,
              border: "2px solid #1976D2",
            }}
          />
        </Box>

        {/* Título */}
        <Typography
          variant="h4"
          component="h1"
          color="primary"
          textAlign="center"
          gutterBottom
        >
          Login
        </Typography>

        {/* Formulário */}
        <form>
          {/* Username */}
          <TextField
            id="username"
            name="username"
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            placeholder="Digite seu username"
            value={formData.username} // Controlado pelo estado
            onChange={handleChange} // Atualiza o estado
            InputLabelProps={{
              shrink: true, // Garante que o rótulo esteja na posição correta
            }}
          />

          {/* Password */}
          <TextField
            id="password"
            name="password"
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            placeholder="Digite sua senha"
            value={formData.password} // Controlado pelo estado
            onChange={handleChange} // Atualiza o estado
            InputLabelProps={{
              shrink: true, // Garante que o rótulo esteja na posição correta
            }}
          />

          {/* CheckBox */}
          <FormControlLabel
            control={
              <Checkbox
                name="remember"
                checked={formData.remember} // Controla o estado do checkbox
                onChange={handleChange} // Atualiza o estado ao clicar
                color="primary"
              />
            }
            label="Manter logado"
            sx={{ marginTop: 1, marginBottom: 3 }}
          />

          {/* Botão de login */}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            href="/pages/machines"
          >
            Entrar
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
