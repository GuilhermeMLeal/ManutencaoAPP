import { Button, Container, Box, Typography } from "@mui/material";
import Title from "../title";
import CardBox from "../cardBox";
import { FindItemTextBox } from "../findItemTextBox";

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
      <Title
        title="Sistema de Gestão de Equipes"
        subtitle="Visualização Detalhada de Equipe"
      />
      <FindItemTextBox textButton="Cadastrar uma Equipe" pageText="/pages/teams/createTeam" nameTextSearch="Equipe" />
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
