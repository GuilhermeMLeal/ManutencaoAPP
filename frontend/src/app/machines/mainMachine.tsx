
import { FaBuilding } from "react-icons/fa";
import { IoMdCheckbox } from "react-icons/io";
import { Button } from "@mui/material";
import Title from "../components/title";

export default function MainMachine() {

  return (
    <main className="flex-1 p-6 pt-24 flex flex-col bg-white/90">
      <Title title={"Sistema de Gestão de Máquinas"} />
      <a href="/pages/machines/createMachine"><Button variant="contained">
        Cadastrar uma Máquina
      </Button></a>
    </main>
  );
}
