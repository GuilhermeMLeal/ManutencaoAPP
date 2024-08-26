import { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem, Box } from "@mui/material";
import { DatePicker, DatePickerProps } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import Link from "next/link";

interface CreateItem {
  textButton: string;
  typeTextField: string;
}

export default function CreateReport({ textButton, typeTextField }: CreateItem): JSX.Element {
  const [open, setOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);

  const handleClickOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" color="primary" sx={{ marginRight: 2 }} onClick={handleClickOpen}>
        {textButton}
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Gerar Relatório</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nome"
            type="text"
            fullWidth
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="dense"
            label={typeTextField}
            type="text"
            fullWidth
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, mt: 2 }}>
              <DatePicker
                label="Data de Início"
                value={startDate}
                onChange={(newValue: Dayjs | null) => setStartDate(newValue)}
                renderInput={(params:any) => <TextField {...params} fullWidth />}
              />
              <DatePicker
                label="Data de Término"
                value={endDate}
                onChange={(newValue: Dayjs | null) => setEndDate(newValue)}
                renderInput={(params:any) => <TextField {...params} fullWidth />}
              />
            </Box>
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ color: 'red' }}>
            Cancelar
          </Button>
          <Link href='/pages/controlStock' passHref>
            <Button onClick={handleClose} color="primary">
              Gerar
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </>
  );
}
 