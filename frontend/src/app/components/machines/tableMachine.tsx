"use client";

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Image from 'next/image'; // Para visualizar as imagens

function createData(
  name: string,
  lastMaintenance: string,
  part: string,
  material: string,
  imageUrl: string,
) {
  return {
    name,
    lastMaintenance,
    part,
    material,
    imageUrl,
    updates: [
      {
        date: '2024-07-20',
        updatedBy: 'John Doe',
        description: 'Troca de peças da parte inferior.',
      },
      {
        date: '2024-08-10',
        updatedBy: 'Jane Smith',
        description: 'Manutenção preventiva e lubrificação.',
      },
    ],
  };
}

function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.lastMaintenance}</TableCell>
        <TableCell align="right">{row.part}</TableCell>
        <TableCell align="right">{row.material}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Histórico de Atualizações
              </Typography>
              <Table size="small" aria-label="updates">
                <TableHead>
                  <TableRow>
                    <TableCell>Data</TableCell>
                    <TableCell>Responsável</TableCell>
                    <TableCell>Descrição</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.updates.map((update) => (
                    <TableRow key={update.date}>
                      <TableCell component="th" scope="row">
                        {update.date}
                      </TableCell>
                      <TableCell>{update.updatedBy}</TableCell>
                      <TableCell>{update.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <Typography variant="h6" gutterBottom component="div" sx={{ mt: 2 }}>
                Imagem da Máquina
              </Typography>
              <Image
                src={row.imageUrl}
                alt={`Imagem da máquina ${row.name}`}
                width={400}
                height={300}
              />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const rows = [
  createData('Máquina A', '2024-08-01', 'Parte Superior', 'Aço Inoxidável', '/image/roboto.png'),
  createData('Máquina B', '2024-07-15', 'Parte Inferior', 'Plástico ABS', '/image/roboto.png'),
  createData('Máquina C', '2024-06-20', 'Motor', 'Alumínio', '/image/roboto.png'),
];

export default function MachineTable() {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Nome da Máquina</TableCell>
            <TableCell align="right">Última Manutenção</TableCell>
            <TableCell align="right">Peça</TableCell>
            <TableCell align="right">Material</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
