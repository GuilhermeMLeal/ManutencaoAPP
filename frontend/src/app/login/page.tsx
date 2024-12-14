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
import { storeAccessToken, storeTokens } from "@/utils/storage";
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
            Login
          </Typography>

          <Grid container spacing={2} direction="column" alignItems="center">
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
              {/* Botão Criar Usuário */}
              <Button
                variant="outlined"
                onClick={() => alert("Criar Usuário")}
                fullWidth
              >
                Criar Usuário
              </Button>
            </Grid>

            <Grid item xs={12} width="100%">
              {/* Botão de Login */}
              <ButtonComponent
                className="button"
                onClick={handleLogin}
                name="Logar"
              />
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
