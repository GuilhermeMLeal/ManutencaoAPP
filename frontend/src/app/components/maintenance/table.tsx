"use client";

import { BiSolidEraser } from "react-icons/bi";
import { FaRegEdit } from "react-icons/fa";
import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
  Chip,
  TextField,
  TablePagination,
} from "@mui/material";
import { FindItemTextBox } from "../findItemTextBox";

interface Item {
  ambiente: string;
  equipamento: string;
  solicitacao: string;
  atendimento: string;
  status: string;
  comentarios: string;
  arquivos: string[];
  equipes: string[];
  pecas: { part: string; quantity: number }[];
  gastosTotais: number;
}

export function Table() {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [currentItem, setCurrentItem] = useState<Item | null>(null);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  const itemsList: Item[] = [
    {
      ambiente: "Sala 1",
      equipamento: "Computador",
      solicitacao: "Reparar",
      atendimento: "Em andamento",
      status: "Pendente",
      comentarios: "",
      arquivos: [],
      equipes: [],
      pecas: [],
      gastosTotais: 100,
    },
    {
      ambiente: "Sala 1",
      equipamento: "Computador",
      solicitacao: "Reparar",
      atendimento: "Em andamento",
      status: "Pendente",
      comentarios: "",
      arquivos: [],
      equipes: [],
      pecas: [],
      gastosTotais: 100,
    },
    {
      ambiente: "Sala 1",
      equipamento: "Computador",
      solicitacao: "Reparar",
      atendimento: "Em andamento",
      status: "Pendente",
      comentarios: "",
      arquivos: [],
      equipes: [],
      pecas: [],
      gastosTotais: 100,
    },
    {
      ambiente: "Sala 1",
      equipamento: "Computador",
      solicitacao: "Reparar",
      atendimento: "Em andamento",
      status: "Pendente",
      comentarios: "",
      arquivos: [],
      equipes: [],
      pecas: [],
      gastosTotais: 100,
    },
  ];

  const teams = [
    { value: "team1", label: "Equipe 1" },
    { value: "team2", label: "Equipe 2" },
    { value: "team3", label: "Equipe 3" },
  ];

  const parts = [
    { value: "part1", label: "Peça 1" },
    { value: "part2", label: "Peça 2" },
    { value: "part3", label: "Peça 3" },
  ];

  const handleOpenDialog = (item: Item): void => {
    setCurrentItem(item);
    setOpenDialog(true);
  };

  const handleCloseDialog = (): void => {
    setOpenDialog(false);
    setCurrentItem(null);
  };

  const handleSave = (): void => {
    handleCloseDialog();
  };

  const handleAddPart = (): void => {
    if (currentItem) {
      setCurrentItem({
        ...currentItem,
        pecas: [...currentItem.pecas, { part: "", quantity: 0 }],
      });
    }
  };

  const handlePartChange = (index: number, field: string, value: string | number): void => {
    if (currentItem) {
      const updatedParts = [...currentItem.pecas];
      updatedParts[index] = { ...updatedParts[index], [field]: value };
      setCurrentItem({ ...currentItem, pecas: updatedParts });
    }
  };

  const handleRemovePart = (index: number): void => {
    if (currentItem) {
      setCurrentItem({
        ...currentItem,
        pecas: currentItem.pecas.filter((_, i) => i !== index),
      });
    }
  };


  const handleChangePage = (event: unknown, newPage: number): void => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <FindItemTextBox
        textReport="Criar Relatório de Manutenções"
        textButton="Cadastrar uma Manutenção"
        pageText="/pages/index/createMaintenance"
        nameTextSearch="Manutenção"
      />
      <div className="overflow-x-auto rounded-xl">
        <div className="max-h-64 overflow-y-auto">
        <table className="min-w-full divide-y divide-gray-200 text-center">
        <thead className="bg-gray-50 sticky top-0">
          <tr>
            <th className="p-3 text-xs text-gray-600 uppercase tracking-wider">Ambiente</th>
            <th className="p-3 text-xs text-gray-600 uppercase tracking-wider">Equipamento</th>
            <th className="p-3 text-xs text-gray-600 uppercase tracking-wider">Solicitação</th>
            <th className="p-3 text-xs text-gray-600 uppercase tracking-wider">Atendimento</th>
            <th className="p-3 text-xs text-gray-600 uppercase tracking-wider">Status</th>
            <th className="p-3 text-xs text-gray-600 uppercase tracking-wider">Comentários</th>
            <th className="p-3 text-xs text-gray-600 uppercase tracking-wider">Arquivos</th>
            <th className="p-3 text-xs text-gray-600 uppercase tracking-wider">Gastos Totais</th> {/* Nova coluna */}
            <th className="p-3 text-xs text-gray-600 uppercase tracking-wider">Ações</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {itemsList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
            <tr key={index}>
              <td className="p-3 whitespace-nowrap text-black">{item.ambiente}</td>
              <td className="p-3 whitespace-nowrap text-black">{item.equipamento}</td>
              <td className="p-3 whitespace-nowrap text-black">{item.solicitacao}</td>
              <td className="p-3 whitespace-nowrap text-black">{item.atendimento}</td>
              <td className="p-3 whitespace-nowrap text-black">{item.status}</td>
              <td className="p-3 whitespace-nowrap text-black">{item.comentarios}</td>
              <td className="p-3 whitespace-nowrap text-black">
                {item.arquivos.length > 0 ? item.arquivos.join(", ") : "Nenhum arquivo"}
              </td>
              <td className="p-3 whitespace-nowrap text-black">{item.gastosTotais.toFixed(2)}</td> {/* Novo campo */}
              <td className="p-3 whitespace-nowrap text-black">
                <div className="flex justify-center items-center gap-x-2">
                  <FaRegEdit onClick={() => handleOpenDialog(item)} className="cursor-pointer" />
                  <BiSolidEraser className="cursor-pointer" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={itemsList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle className="text-center mb-4">Editar Manutenção</DialogTitle>
        <DialogContent>
          {currentItem && (
            <Grid container spacing={3} justifyContent="center">
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined" className="mt-4">
                  <InputLabel>Status</InputLabel>
                  <Select
                    value={currentItem.status}
                    onChange={(e) => setCurrentItem({ ...currentItem, status: e.target.value })}
                    label="Status"
                  >
                    <MenuItem value="Pendente">Pendente</MenuItem>
                    <MenuItem value="Em andamento">Em andamento</MenuItem>
                    <MenuItem value="Concluído">Concluído</MenuItem>
                    <MenuItem value="Cancelado">Cancelado</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="comentarios"
                  label="Comentários"
                  multiline
                  rows={4}
                  fullWidth
                  variant="outlined"
                  value={currentItem.comentarios}
                  onChange={(e) => setCurrentItem({ ...currentItem, comentarios: e.target.value })}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Equipes</InputLabel>
                  <Select
                    multiple
                    value={currentItem.equipes}
                    onChange={(e) => setCurrentItem({ ...currentItem, equipes: e.target.value as string[] })}
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {(selected as string[]).map((value) => (
                          <Chip key={value} label={teams.find((team) => team.value === value)?.label} />
                        ))}
                      </Box>
                    )}
                  >
                    {teams.map((team) => (
                      <MenuItem key={team.value} value={team.value}>
                        {team.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
                  <Button variant="contained" onClick={handleAddPart}>
                    Adicionar Peça
                  </Button>
                </Box>
                {currentItem.pecas.map((peca, index) => (
                  <Box key={index} display="flex" alignItems="center" mb={2}>
                    <FormControl fullWidth variant="outlined" className="mr-2">
                      <InputLabel>Peça</InputLabel>
                      <Select
                        value={peca.part}
                        onChange={(e) => handlePartChange(index, "part", e.target.value as string)}
                        label="Peça"
                      >
                        {parts.map((part) => (
                          <MenuItem key={part.value} value={part.value}>
                            {part.label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <TextField
                      id="quantity"
                      label="Quantidade"
                      type="number"
                      value={peca.quantity}
                      onChange={(e) => handlePartChange(index, "quantity", parseInt(e.target.value))}
                      className="mr-2"
                      variant="outlined"
                    />
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: 'red', '&:hover': { backgroundColor: 'darkred' } }}
                      onClick={() => handleRemovePart(index)}
                    >
                      Remover
                    </Button>
                  </Box>
                ))}
              </Grid>
              <Grid item xs={12} className="text-center">
                <Button onClick={handleSave} variant="contained" color="primary">
                  Salvar
                </Button>
                <Button onClick={handleSave} variant="contained" color="primary" sx={{ marginLeft: '10px'}}>
                  Cancelar
                </Button>
              </Grid>
            </Grid>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
