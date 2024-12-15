"use client";

import React, { useState, useEffect } from "react";
import { TextField, Button, Grid, Box, MenuItem, CircularProgress } from "@mui/material";
import TitleCreate from "../titles/titleCreate";
import UnifiedService from "@/service/UserService";
import { useRouter } from "next/navigation";

export default function CreateSquad() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    userIds: [] as number[], // IDs dos usuários selecionados
  });

  const [users, setUsers] = useState<User[]>([]); // Lista de usuários
  const [loading, setLoading] = useState(false); // Indicador de carregamento
  const [isSubmitting, setIsSubmitting] = useState(false); // Indicador de envio do formulário
  const router = useRouter();

  // Buscar a lista de usuários ao montar o componente
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const data = await UnifiedService.getUsers();
        setUsers(data); // Armazena os usuários no estado
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Atualiza os campos do formulário
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Atualiza os IDs dos usuários selecionados
  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedIds = e.target.value as unknown as number[];
    setFormData((prev) => ({ ...prev, userIds: selectedIds }));
  };

  // Envia os dados do formulário
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const squadDTO = {
        name: formData.name,
        description: formData.description,
        users: formData.userIds.map((id) => ({ id })), // Formata os usuários para o backend
      };

      await UnifiedService.createSquad(squadDTO);
      router.push("/teams"); // Redireciona após o sucesso
    } catch (error) {
      console.error("Erro ao criar o Squad:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex-1 flex flex-col bg-white/90 overflow-y-auto max-h-svh">
      <TitleCreate title="Cadastro de Time" />
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit}
        sx={{
          width: "100%",
          maxWidth: 600,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              id="name"
              name="name"
              label="Nome do Time"
              fullWidth
              variant="outlined"
              value={formData.name}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="description"
              name="description"
              label="Descrição"
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              value={formData.description}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            {loading ? (
              <CircularProgress />
            ) : (
              <TextField
                select
                id="userIds"
                name="userIds"
                label="Selecionar Usuários"
                fullWidth
                SelectProps={{
                  multiple: true,
                }}
                value={formData.userIds}
                onChange={handleUserChange}
              >
                {users.map((user) => (
                  <MenuItem key={user.id} value={user.id}>
                    {user.name} ({user.email})
                  </MenuItem>
                ))}
              </TextField>
            )}
          </Grid>
          <Grid item xs={12} className="flex justify-center items-center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting || loading}
            >
              {isSubmitting ? "Cadastrando..." : "Cadastrar Time"}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </main>
  );
}
