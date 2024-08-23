import { FaBuilding } from "react-icons/fa";
import { IoMdCheckbox } from "react-icons/io";
import { Card } from "./card";
import { Table } from "./table";
import Title from "../title";
import { Button } from "@mui/material";

export default function MainMaintenance() {

  return (
    <main className="flex-1 p-6 pt-24 flex flex-col bg-white/90">
      <Title
        title={"Sistema de Gestão de Manutenção"}
        subtitle="Gestão de Manutenção"
        textButton="Cadastrar uma Manutenção"
        pageText="/pages/index/createMaintenance"
      />
      <Table />
    </main>
  );
}
