import { Button, Container, Box, Typography } from "@mui/material";
import Title from "../title";
import CardBox from "../cardBox";

const machineData = [
  {
    title: "Máquina A",
    description: "Parte Superior - Aço Inoxidável",
    image: "/image/roboto.png",
  },
  {
    title: "Máquina B",
    description: "Parte Inferior - Plástico ABS",
    image: "/image/roboto.png",
  },
  {
    title: "Máquina C",
    description: "Motor - Alumínio",
    image: "/image/roboto.png",
  },
];

export default function MainMachine() {
  return (
    <main className="flex-1 flex flex-col p-6 pt-24 bg-white/90">
      <Title title={"Sistema de Gestão de Máquinas"} />
      <Box sx={{ textAlign: "center", mb: 4, paddingTop: 4 }}>
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 2,
            mt: 4,
          }}
        >
          {machineData.map((machine, index) => (
            <CardBox
              key={index}
              title={machine.title}
              description={machine.description}
              image={machine.image}
            />
          ))}
        </Box>
      </Container>
    </main>
  );
}
