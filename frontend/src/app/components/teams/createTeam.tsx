"use client";

import React, { useState, useEffect } from "react";
import { TextField, Button, Grid, Box, MenuItem } from "@mui/material";
import TitleCreate from "../titles/titleCreate";
import UnifiedService from "@/app/service/UserService";
import { useRouter } from "next/navigation";

export default function CreateSquad() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    userIds: [] as number[], // Array de IDs de usuários selecionados
  });

  const [users, setUsers] = useState<User[]>([]); // Lista de usuários disponíveis
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Buscar usuários ao carregar a página
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await UnifiedService.getUsers();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Atualizar o estado do formulário
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Atualizar os IDs de usuários selecionados
  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => parseInt(option.value, 10)
    );
    setFormData((prev) => ({ ...prev, userIds: value }));
  };

  // Submeter o formulário
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const squadDTO: Squad = {
        Id: 0, // Será gerado pelo backend
        Name: formData.name,
        Description: formData.description,
        UserSquads: formData.userIds.map((userId) => ({
          UserId: userId,
          SquadId: 0, // Será gerado pelo backend
          User: { Id: userId } as User, // Apenas referenciar o ID
        })),
      };

      await UnifiedService.createSquad(squadDTO);
      router.push("/pages/teams"); // Redireciona após o cadastro
    } catch (error) {
      console.error("Error creating squad:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-1 flex flex-col bg-white/90 overflow-y-auto max-h-svh">
      <TitleCreate title="Cadastro de Times" />
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
                <MenuItem key={user.Id} value={user.Id}>
                  {user.Name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} className="flex justify-center items-center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {loading ? "Cadastrando..." : "Cadastrar Time"}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </main>
  );
}
