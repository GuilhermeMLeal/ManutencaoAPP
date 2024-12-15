"use client";

import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Avatar,
  Paper,
  Snackbar,
  Alert,
  Grid,
} from "@mui/material";
import TextFieldComponent from "@/app/components/TextFieldComponent";
import { useRouter } from "next/navigation";
import UnifiedService from "@/service/UserService";

export default function Register() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    try {
      setLoading(true);
      console.log("Password value:", password);
      if (!password) {
        setError(true);
        console.error("Password is required but not provided.");
        return;
      }
  
      const userRegisterDTO = { 
        name, 
        username, 
        email, 
        password: password
      };
  
      await UnifiedService.createUser(userRegisterDTO);
  
      setSuccess(true);
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (err) {
      console.error("Registration failed:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleRegister();
    }
  };

  const handleGoBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "white",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          maxWidth: 400,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            width: "100%",
            borderRadius: 2,
            border: "1px solid #e0e0e0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
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
            Cadastro
          </Typography>

          <Grid container spacing={2} direction="column" alignItems="center">
            <Grid item xs={12} width="100%">
              {/* Campo de Nome */}
              <TextFieldComponent
                value={name}
                placeholder="Name"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setName(e.target.value)
                }
                onKeyPress={handleKeyPress}
              />
            </Grid>

            <Grid item xs={12} width="100%">
              {/* Campo de Username */}
              <TextFieldComponent
                value={username}
                placeholder="Username"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setUsername(e.target.value)
                }
                onKeyPress={handleKeyPress}
              />
            </Grid>

            <Grid item xs={12} width="100%">
              {/* Campo de Email */}
              <TextFieldComponent
                value={email}
                placeholder="Email"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                onKeyPress={handleKeyPress}
              />
            </Grid>

            <Grid item xs={12} width="100%">
              {/* Campo de Senha */}
              <TextFieldComponent
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
                onKeyPress={handleKeyPress}
              />
            </Grid>

            <Grid item xs={12} width="100%">
              {/* Botão de Cadastro */}
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleRegister}
                disabled={loading}
                sx={{
                  textTransform: "none",
                  padding: "10px 20px",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                {loading ? "Registrando..." : "Cadastrar"}
              </Button>
            </Grid>

            <Grid item xs={12} width="100%">
              {/* Botão Voltar */}
              <Button
                variant="outlined"
                onClick={handleGoBack}
                fullWidth
              >
                Voltar
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>

      {/* Snackbars */}
      <Snackbar
        open={success}
        autoHideDuration={2000}
        onClose={() => setSuccess(false)}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Cadastro realizado com sucesso!
        </Alert>
      </Snackbar>

      <Snackbar
        open={error}
        autoHideDuration={2000}
        onClose={() => setError(false)}
      >
        <Alert severity="error" sx={{ width: "100%" }}>
          Erro ao realizar cadastro. Verifique os dados informados.
        </Alert>
      </Snackbar>
    </Box>
  );
}
