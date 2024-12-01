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
  Snackbar,
  Alert,
} from "@mui/material";
import { Navigate } from "react-router-dom";
import { Home } from "@mui/icons-material";// Certifique-se de que este hook existe
import TextFieldComponent from "@/app/components/TextFieldComponent";
import ButtonComponent from "@/app/components/ButtonComponent";
import { useAuth } from "@/AuthContext";

export default function Login() {
  //#region Definition
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const { login } = useAuth(); // Certifique-se de que `useAuth` fornece a função `login`
  const [redirect, setRedirect] = useState(false);
  const [remember, setRemember] = useState(false); // Estado para o checkbox "Manter logado"
  const [error, setError] = useState(false); // Para exibir erro no login

  const handleLogin = async () => {
    try {
      await login(username, password);
      setSuccess(true);
      setTimeout(() => {
        setRedirect(true);
      }, 2000);
    } catch (err) {
      setSuccess(false);
      setError(true);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleLogin();
    }
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRemember(event.target.checked);
  };

  //#region Redirect
  if (redirect) {
    return (
      <>
        <Navigate to="/home" />
        <Home />
      </>
    );
  }

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
        {/* Avatar */}
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

        {/* Campos de Entrada */}
        <TextFieldComponent
          value={username}
          placeholder="Username"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUsername(e.target.value)
          }
          onKeyPress={handleKeyPress}
        />

        <TextFieldComponent
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          onKeyPress={handleKeyPress}
        />

        {/* CheckBox */}
        <FormControlLabel
          control={
            <Checkbox
              name="remember"
              checked={remember}
              onChange={handleCheckboxChange}
              color="primary"
            />
          }
          label="Manter logado"
          sx={{ marginTop: 1, marginBottom: 3 }}
        />

        {/* Botão de Login */}
        <ButtonComponent
          className="button"
          onClick={handleLogin}
          name="Login"
        />
      </Paper>

      {/* Snackbars */}
      <Snackbar
        open={success}
        autoHideDuration={2000}
        onClose={() => setSuccess(false)}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Login realizado com sucesso!
        </Alert>
      </Snackbar>

      <Snackbar
        open={error}
        autoHideDuration={2000}
        onClose={() => setError(false)}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          Erro ao realizar login. Verifique suas credenciais.
        </Alert>
      </Snackbar>
    </Box>
  );
}