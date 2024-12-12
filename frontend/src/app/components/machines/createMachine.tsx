"use client";

import React, { useState } from "react";
import { TextField, Button, Grid, Box, MenuItem } from "@mui/material";
import TitleCreate from "../titles/titleCreate";
import MachineService from "@/app/service/MachineService";
import { useRouter } from "next/navigation";

export default function CreateMachine() {
  const [formData, setFormData] = useState({
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

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const placesData = await MachineService.getAllPlaces();
        setPlaces(placesData);

        const statusesData = await MachineService.getAllStatuses();
        setStatuses(statusesData);
      } catch (error) {
        console.error("Error fetching places or statuses:", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, placeId: e.target.value }));
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, statusId: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await MachineService.addMachine({
        name: formData.name,
        type: formData.type,
        model: formData.model,
        manufactureDate: new Date(formData.manufactureDate),
        serialNumber: formData.serialNumber,
        placeId: formData.placeId ? parseInt(formData.placeId) : null,
        statusId: formData.statusId ? parseInt(formData.statusId) : null,
      });
      router.push("/pages/machines");
    } catch (error) {
      console.error("Error adding machine:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-1 flex flex-col bg-white/90 overflow-y-auto max-h-svh">
      <TitleCreate title="Registro de Máquinas" />
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
          <Grid item xs={12} sm={6}>
            <TextField
              select
              id="placeId"
              name="placeId"
              label="Localização"
              fullWidth
              variant="outlined"
              value={formData.placeId}
              onChange={handlePlaceChange}
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
          <Grid item xs={12} sm={6}>
            <TextField
              select
              id="statusId"
              name="statusId"
              label="Status"
              fullWidth
              variant="outlined"
              value={formData.statusId}
              onChange={handleStatusChange}
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
          <Grid item xs={12} className="flex justify-center items-center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {loading ? "Registrando..." : "Registrar Máquina"}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </main>
  );
}
