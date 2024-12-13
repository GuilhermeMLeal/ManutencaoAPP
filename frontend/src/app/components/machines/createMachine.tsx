"use client";

import React, { useState, useEffect } from "react";
import { TextField, Button, Grid, Box, MenuItem } from "@mui/material";
import TitleCreate from "../titles/titleCreate";
import MachineService from "@/service/MachineService";
import { useRouter, useSearchParams } from "next/navigation";

export default function CreateOrEditMachine() {
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    type: "",
    model: "",
    manufactureDate: "",
    serialNumber: "",
    placeId: "",
    statusId: "",
  });

  const [loading, setLoading] = useState(false);
  const [places, setPlaces] = useState<Place[]>([]);
  const [statuses, setStatuses] = useState<Status[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const machineId = searchParams.get("id"); // Obtém o ID da URL para edição

  useEffect(() => {
    // Fetch data for places, statuses, and machine if editing
    const fetchData = async () => {
      try {
        const placesData = await MachineService.getAllPlaces();
        setPlaces(placesData);

        const statusesData = await MachineService.getAllStatuses();
        setStatuses(statusesData);

        if (machineId) {
          const machineData = await MachineService.getMachineById(
            Number(machineId)
          );
          setFormData({
            id: machineData.id,
            name: machineData.name,
            type: machineData.type,
            model: machineData.model,
            manufactureDate: machineData.manufactureDate.split("T")[0],
            serialNumber: machineData.serialNumber,
            placeId: machineData.placeId ? String(machineData.placeId) : "",
            statusId: machineData.statusId ? String(machineData.statusId) : "",
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [machineId]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (machineId) {
        // Atualizar máquina existente
        await MachineService.updateMachine({
          Id: formData.id,
          Name: formData.name,
          Type: formData.type,
          Model: formData.model,
          ManufactureDate: new Date(formData.manufactureDate),
          SerialNumber: formData.serialNumber,
          PlaceId: formData.placeId ? parseInt(formData.placeId) : null,
          StatusId: formData.statusId ? parseInt(formData.statusId) : null,
        });
        console.log("Machine updated successfully.");
      } else {
        // Criar nova máquina
        await MachineService.addMachine({
          Name: formData.name,
          Type: formData.type,
          Model: formData.model,
          ManufactureDate: new Date(formData.manufactureDate),
          SerialNumber: formData.serialNumber,
          PlaceId: formData.placeId ? parseInt(formData.placeId) : null,
          StatusId: formData.statusId ? parseInt(formData.statusId) : null,
        });
        console.log("Machine created successfully.");
      }
      router.push("/machines");
    } catch (error) {
      console.error("Error saving machine:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-1 flex flex-col bg-white/90 overflow-y-auto max-h-svh">
      <TitleCreate
        title={machineId ? "Editar Máquina" : "Registrar Máquina"}
      />
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit}
        sx={{
          width: "100%",
          maxWidth: 1000,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
        }}
      >
        <Grid container spacing={3}>
          {/* Nome */}
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="name"
              name="name"
              label="Nome"
              fullWidth
              variant="outlined"
              value={formData.name}
              onChange={handleInputChange}
            />
          </Grid>

          {/* Tipo */}
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="type"
              name="type"
              label="Tipo"
              fullWidth
              variant="outlined"
              value={formData.type}
              onChange={handleInputChange}
            />
          </Grid>

          {/* Modelo */}
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="model"
              name="model"
              label="Modelo"
              fullWidth
              variant="outlined"
              value={formData.model}
              onChange={handleInputChange}
            />
          </Grid>

          {/* Data de Fabricação */}
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="manufactureDate"
              name="manufactureDate"
              label="Data de Fabricação"
              type="date"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              value={formData.manufactureDate}
              onChange={handleInputChange}
            />
          </Grid>

          {/* Número de Série */}
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="serialNumber"
              name="serialNumber"
              label="Número de Série"
              fullWidth
              variant="outlined"
              value={formData.serialNumber}
              onChange={handleInputChange}
            />
          </Grid>

          {/* Localização */}
          <Grid item xs={12} sm={6}>
            <TextField
              select
              id="placeId"
              name="placeId"
              label="Localização"
              fullWidth
              variant="outlined"
              value={formData.placeId}
              onChange={handleInputChange}
            >
              <MenuItem value="">
                <em>Selecione uma Localização</em>
              </MenuItem>
              {places.map((place) => (
                <MenuItem key={place.id} value={place.id}>
                  {place.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Status */}
          <Grid item xs={12} sm={6}>
            <TextField
              select
              id="statusId"
              name="statusId"
              label="Status"
              fullWidth
              variant="outlined"
              value={formData.statusId}
              onChange={handleInputChange}
            >
              <MenuItem value="">
                <em>Selecione um Status</em>
              </MenuItem>
              {statuses.map((status) => (
                <MenuItem key={status.id} value={status.id}>
                  {status.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Botão de Envio */}
          <Grid item xs={12} className="flex justify-center items-center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {loading
                ? machineId
                  ? "Atualizando..."
                  : "Registrando..."
                : machineId
                ? "Atualizar Máquina"
                : "Registrar Máquina"}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </main>
  );
}
