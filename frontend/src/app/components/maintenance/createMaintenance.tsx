"use client";

import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Grid,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
} from "@mui/material";
import TitleCreate from "../titles/titleCreate";
import MachineService from "@/service/MachineService";
import ToolService from "@/service/ToolService";
import MaintenanceService from "@/service/MaintenanceService";
import { useRouter, useSearchParams } from "next/navigation";

interface Maintenance {
  id?: number;
  machineId: number;
  observations: string;
  startDate: string;
  endDate: string;
  maintenanceParts: MaintenancePart[];
}

interface MaintenancePart {
  partId: number;
  quantity: number;
}

interface Part {
  Id: number;
  Name: string;
  Quantity: number;
  Description: string;
}

export default function CreateOrEditMaintenance() {
  const [formData, setFormData] = useState<Omit<Maintenance, "id">>({
    machineId: 0,
    observations: "",
    startDate: "",
    endDate: "",
    maintenanceParts: [],
  });
  const [machines, setMachines] = useState<{ id: number; name: string }[]>([]);
  const [parts, setParts] = useState<Part[]>([]);
  const [dateError, setDateError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const maintenanceId = searchParams.get("id");

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);

        // Fetch machines and parts
        const [machineData, partData] = await Promise.all([
          MachineService.getAllMachines(),
          ToolService.getAllTools(),
        ]);
        setMachines(machineData.map((m) => ({ id: m.id, name: m.name })));
        setParts(partData);

        // If editing, fetch the maintenance details
        if (maintenanceId) {
          const maintenance = await MaintenanceService.getMaintenanceById(
            Number(maintenanceId)
          );
          setFormData({
            machineId: maintenance.machineId,
            observations: maintenance.observations,
            startDate: maintenance.startDate.split("T")[0],
            endDate: maintenance.endDate.split("T")[0],
            maintenanceParts: maintenance.maintenanceParts.map((part) => ({
              partId: part.partId,
              quantity: part.quantity,
            })),
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, [maintenanceId]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "startDate" || name === "endDate") {
      validateDates(name, value);
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateDates = (field: string, value: string) => {
    const startDate = field === "startDate" ? value : formData.startDate;
    const endDate = field === "endDate" ? value : formData.endDate;

    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      setDateError("A data de início não pode ser maior que a data de fim.");
    } else {
      setDateError("");
    }
  };

  const handlePartChange = (
    index: number,
    field: keyof MaintenancePart,
    value: string | number
  ) => {
    const newParts = [...formData.maintenanceParts];
    newParts[index] = { ...newParts[index], [field]: value };
    setFormData({ ...formData, maintenanceParts: newParts });
  };

  const addPart = () => {
    setFormData({
      ...formData,
      maintenanceParts: [
        ...formData.maintenanceParts,
        { partId: 0, quantity: 0 },
      ],
    });
  };

  const removePart = (index: number) => {
    setFormData({
      ...formData,
      maintenanceParts: formData.maintenanceParts.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);

      const maintenancePayload = {
        machineId: formData.machineId,
        observations: formData.observations,
        startDate: `${formData.startDate}T00:00:00Z`,
        endDate: `${formData.endDate}T00:00:00Z`,
        lastUpdate: new Date().toISOString(),
        maintenanceParts: formData.maintenanceParts.map(({ partId, quantity }) => ({
          partId,
          quantity,
        })),
      };

      if (maintenanceId) {
        // Update existing maintenance
        await MaintenanceService.updateMaintenance({
          ...maintenancePayload,
          id: Number(maintenanceId),
        });
      } else {
        await MaintenanceService.createMaintenance(maintenancePayload);
      }

      router.push("/maintenance");
    } catch (error) {
      console.error("Error saving maintenance:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-1 flex flex-col bg-white/90 overflow-y-auto max-h-svh">
      <TitleCreate
        title={maintenanceId ? "Editar Manutenção" : "Registrar Manutenção"}
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
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="machine-label">Máquina</InputLabel>
              <Select
                required
                id="machineId"
                name="machineId"
                label="Máquina"
                value={formData.machineId}
                onChange={(e) =>
                  setFormData({ ...formData, machineId: Number(e.target.value) })
                }
                labelId="machine-label"
              >
                <MenuItem value={0}>
                  <em>Selecione uma Máquina</em>
                </MenuItem>
                {machines.map((machine) => (
                  <MenuItem key={machine.id} value={machine.id}>
                    {machine.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="observations"
              name="observations"
              label="Observações"
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              value={formData.observations}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="startDate"
              name="startDate"
              label="Data de Início"
              type="date"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              value={formData.startDate}
              onChange={handleInputChange}
              error={!!dateError}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="endDate"
              name="endDate"
              label="Data de Fim"
              type="date"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              value={formData.endDate}
              onChange={handleInputChange}
              error={!!dateError}
            />
          </Grid>
          {dateError && (
            <Grid item xs={12}>
              <Typography color="error">{dateError}</Typography>
            </Grid>
          )}
          <Grid container item xs={12} spacing={2} justifyContent="center">
            <Grid item>
              <Button variant="contained" onClick={addPart}>
                Adicionar Peça
              </Button>
            </Grid>
          </Grid>
          {formData.maintenanceParts.map((part, index) => (
            <Grid item xs={12} key={index}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  marginBottom: 2,
                }}
              >
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={4}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel id={`part-label-${index}`}>Peça</InputLabel>
                      <Select
                        id={`part-${index}`}
                        name={`part-${index}`}
                        label="Peça"
                        value={part.partId}
                        onChange={(e) =>
                          handlePartChange(
                            index,
                            "partId",
                            Number(e.target.value)
                          )
                        }
                        labelId={`part-label-${index}`}
                      >
                        <MenuItem value={0}>
                          <em>Selecione uma Peça</em>
                        </MenuItem>
                        {parts.map((partOption) => (
                          <MenuItem key={partOption.Id} value={partOption.Id}>
                            {partOption.Name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      type="number"
                      id={`quantity-${index}`}
                      name={`quantity-${index}`}
                      label="Quantidade"
                      fullWidth
                      variant="outlined"
                      value={part.quantity}
                      onChange={(e) =>
                        handlePartChange(
                          index,
                          "quantity",
                          Number(e.target.value)
                        )
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => removePart(index)}
                    >
                      Remover Peça
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          ))}
          <Grid container item xs={12} justifyContent="center">
            <Grid item xs={12} className="flex justify-center items-center">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
              >
                {loading
                  ? maintenanceId
                    ? "Atualizando..."
                    : "Registrando..."
                  : maintenanceId
                  ? "Atualizar Manutenção"
                  : "Registrar Manutenção"}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </main>
  );
}
