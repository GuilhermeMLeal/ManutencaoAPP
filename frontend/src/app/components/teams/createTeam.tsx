"use client";

import React, { useState, useEffect } from "react";
import { TextField, Button, Grid, Box, MenuItem, CircularProgress } from "@mui/material";
import TitleCreate from "../titles/titleCreate";
import { useRouter, useSearchParams } from "next/navigation";
import UnifiedService from "@/service/UserService";

export default function UpdateSquad() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    userIds: [] as number[],
  });

  const [users, setUsers] = useState<User[]>([]); // Lista de usuários
  const [loading, setLoading] = useState(false); // Indicador de carregamento
  const [isSubmitting, setIsSubmitting] = useState(false); // Indicador de envio do formulário
  const [squadId, setSquadId] = useState<number | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  // Buscar os dados do squad e dos usuários ao montar o componente
  useEffect(() => {
    const fetchSquadData = async () => {
      const id = searchParams.get("id");
      setLoading(true);

      try {
        if (id) {
          setSquadId(Number(id));
          const squadData = await UnifiedService.getSquadById(Number(id));
          setFormData({
            name: squadData.name,
            description: squadData.description,
            userIds: squadData.users.map((user) => user.id),
          });
        }

        // Carrega a lista de todos os usuários
        const userList = await UnifiedService.getUsers();
        setUsers(userList);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSquadData();
  }, [searchParams]);

  // Atualiza os campos do formulário
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Atualiza os IDs dos usuários selecionados
  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedIds = Array.isArray(e.target.value)
      ? e.target.value.map((val) => Number(val))
      : [];
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
        users: formData.userIds.map((id) => ({ id })), // Apenas os IDs dos usuários
      };

      if (squadId) {
        await UnifiedService.updateSquad(squadId, squadDTO);
      } else {
        await UnifiedService.createSquad(squadDTO);
      }

      router.push("/teams"); // Redireciona para a lista de times
    } catch (error) {
      console.error("Erro ao enviar dados do Squad:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="flex-1 flex flex-col bg-white/90 overflow-y-auto max-h-svh">
      <TitleCreate title={squadId ? "Atualizar Time" : "Criar Time"} />
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
              {isSubmitting ? "Salvando..." : squadId ? "Atualizar Time" : "Criar Time"}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </main>
  );
}
