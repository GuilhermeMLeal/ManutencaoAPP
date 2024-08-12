import { Button, Container, Box, Typography } from "@mui/material";
import Title from "../title";
import CollapsibleTable from "./tableMachine";

export default function MainMachine() {
  return (
    <main className="flex-1 flex flex-col p-6 pt-24 bg-white/90">
        <Title title={"Sistema de Gestão de Máquinas"} />
      <Box sx={{ textAlign: 'center', mb: 4, paddingTop:4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Visualização Detalhada de Máquinas
        </Typography>
        <a href="/pages/machines/createMachine">
          <Button variant="contained" color="primary" size="large">
            Cadastrar uma Máquina
          </Button>
        </a>
      </Box>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CollapsibleTable />
        </Box>
      </Container>
    </main>
  );
}
