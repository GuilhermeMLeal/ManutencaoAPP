import { Button, Container, Box, Typography } from "@mui/material";
import Title from "../title";
import CardBox from "../cardBox";

const teamData = [
  {
    title: "Time 1",
    description: "Elétrica",
    image: "/image/equipe.png",
  },
  {
    title: "Time 2",
    description: "Mecânica",
    image: "/image/equipe.png",
  },
  {
    title: "Time 3",
    description: "Logística",
    image: "/image/equipe.png",
  },
];

export default function MainTeam() {
  return (
    <main className="flex-1 flex flex-col p-6 pt-24 bg-white/90">
      <Title title={"Sistema de Gestão de Equipes"} />
      <Box sx={{ textAlign: "center", mb: 4, paddingTop: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Visualização Detalhada de Equipes
        </Typography>
        <a href="/pages/teams/createTeam">
          <Button variant="contained" color="primary" size="large">
            Cadastrar uma Equipe
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
          {teamData.map((team, index) => (
            <CardBox
              key={index}
              title={team.title}
              description={team.description}
              image={team.image}
            />
          ))}
        </Box>
      </Container>
    </main>
  );
}
