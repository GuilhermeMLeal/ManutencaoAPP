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
import ButtonComponent from "@/app/components/ButtonComponent";
import { useRouter } from "next/navigation";
import { storeAccessToken } from "@/utils/storage";
import UnifiedService from "@/service/UserService";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const userLoginDTO = { username, password };
      const token = await UnifiedService.login(userLoginDTO);
      storeAccessToken(token);
      setSuccess(true);
      setTimeout(() => {
        router.push("/maintenance");
      });
    } catch (err) {
      console.error("Login failed:", err);
      setError(true);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleLogin();
    }
  };

  const handleCreateUserRedirect = () => {
    router.push("/createUsers");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        bgcolor: "white",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: "100%",
          maxWidth: 400,
          padding: 4,
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {/* Avatar */}
        <Box display="flex" justifyContent="center" mb={2}>
          <Avatar
            alt="Logo"
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

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextFieldComponent
              value={username}
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </Grid>

          <Grid item xs={12}>
            <TextFieldComponent
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </Grid>

          <Grid item xs={12} textAlign="center">
            <Button
              variant="outlined"
              onClick={handleCreateUserRedirect}
            >
              Criar Usuário
            </Button>
          </Grid>

          <Grid item xs={12} textAlign="center">
            <ButtonComponent
              className="button"
              onClick={handleLogin}
              name="Logar"
            />
          </Grid>
        </Grid>
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
