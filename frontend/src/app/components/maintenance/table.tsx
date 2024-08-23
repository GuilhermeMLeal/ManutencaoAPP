"use client"

import { BiSolidEraser } from "react-icons/bi";
import { FaRegEdit } from "react-icons/fa";
import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, TextField, Button, Grid, MenuItem, Select, InputLabel, FormControl } from "@mui/material";

export function Table() {
  const [openDialog, setOpenDialog] = useState(false);
  const [currentItem, setCurrentItem] = useState<any>(null);

  const itemsList = [
    {
      ambiente: "Sala 1",
      equipamento: "Computador",
      solicitacao: "Reparar",
      atendimento: "Em andamento",
      status: "Pendente",
      comentarios: "",
      arquivos: []
    },
    {
      ambiente: "Sala 1",
      equipamento: "Computador",
      solicitacao: "Reparar",
      atendimento: "Em andamento",
      status: "Pendente",
      comentarios: "",
      arquivos: []
    },
    {
      ambiente: "Sala 1",
      equipamento: "Computador",
      solicitacao: "Reparar",
      atendimento: "Em andamento",
      status: "Pendente",
      comentarios: "",
      arquivos: []
    },
  ];

  const handleOpenDialog = (item: any) => {
    setCurrentItem(item);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentItem(null);
  };

  const handleSave = () => {
    handleCloseDialog();
  };

  return (
    <>
      <div className="overflow-x-auto rounded-xl">
        <div className="max-h-64 overflow-y-auto">
          <table className="min-w-full divide-y divide-gray-200 text-center">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="p-3 text-xs text-gray-600 uppercase tracking-wider">
                  Ambiente
                </th>
                <th className="p-3 text-xs text-gray-600 uppercase tracking-wider">
                  Equipamento
                </th>
                <th className="p-3 text-xs text-gray-600 uppercase tracking-wider">
                  Solicitação
                </th>
                <th className="p-3 text-xs text-gray-600 uppercase tracking-wider">
                  Atendimento
                </th>
                <th className="p-3 text-xs text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="p-3 text-xs text-gray-600 uppercase tracking-wider">
                  Comentários
                </th>
                <th className="p-3 text-xs text-gray-600 uppercase tracking-wider">
                  Arquivos
                </th>
                <th className="p-3 text-xs text-gray-600 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {itemsList.map((item, index) => (
                <tr key={index}>
                  <td className="p-3 whitespace-nowrap text-black">
                    {item.ambiente}
                  </td>
                  <td className="p-3 whitespace-nowrap text-black">
                    {item.equipamento}
                  </td>
                  <td className="p-3 whitespace-nowrap text-black">
                    {item.solicitacao}
                  </td>
                  <td className="p-3 whitespace-nowrap text-black">
                    {item.atendimento}
                  </td>
                  <td className="p-3 whitespace-nowrap text-black">
                    {item.status}
                  </td>
                  <td className="p-3 whitespace-nowrap text-black">
                    {item.comentarios}
                  </td>
                  <td className="p-3 whitespace-nowrap text-black">
                    {item.arquivos.length > 0 ? item.arquivos.join(", ") : "Nenhum arquivo"}
                  </td>
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
      </div>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle className="text-center  mb-4">Editar Manutenção</DialogTitle>
        <DialogContent>
          {currentItem && (
            <Grid container spacing={3} justifyContent="center">
              <Grid item xs={12} sm={6}>
                <FormControl  fullWidth variant="outlined" className="mt-4">
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
              <Grid item xs={12} className="flex justify-center">
                <Button variant="contained" component="label">
                  Adicionar Arquivos
                  <input
                    type="file"
                    hidden
                    multiple
                    onChange={(e) => {
                      const files = Array.from(e.target.files || []);
                      setCurrentItem({ ...currentItem, arquivos: files.map(file => file.name) });
                    }}
                  />
                </Button>
              </Grid>
              <Grid item xs={12} className="flex justify-center">
                <Button variant="contained" color="primary" onClick={handleSave}>
                  Salvar
                </Button>
              </Grid>
            </Grid>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
