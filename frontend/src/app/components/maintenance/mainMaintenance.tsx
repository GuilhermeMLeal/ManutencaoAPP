import { FaBuilding } from "react-icons/fa";
import { IoMdCheckbox } from "react-icons/io";
import { Card } from "./card";
import { Table } from "./table";
import Title from "../title";
import { Button } from "@mui/material";

export default function MainMaintenance() {
  const cardList = [
    {
      color: "bg-orange-300",
      quantity: 200,
      text: "Ambientes",
      icon: <FaBuilding size={42} />,
    },
    {
      color: "bg-yellow-300",
      quantity: 200,
      text: "Equipamentos",
      icon: <FaBuilding size={42} />,
    },
    {
      color: "bg-red-600",
      quantity: 200,
      text: "OS Abertas",
      icon: <FaBuilding size={42} />,
    },
    {
      color: "bg-green-600",
      quantity: 200,
      text: "OS Concluídas",
      icon: <IoMdCheckbox size={42} />,
    },
  ];

  return (
    <main className="flex-1 p-6 pt-24 flex flex-col bg-white/90">
      <Title title={"Sistema de Gestão de Manutenção"} />
      <a href="/pages/index/createMaintenance">
        <Button variant="contained">Cadastrar uma Manutenção</Button>
      </a>
      <div>
        <div className="grid grid-cols-4 gap-4 p-6 flex-row">
          {cardList.map((props, index) => (
            <Card
              key={index}
              color={props.color}
              quantity={props.quantity}
              text={props.text}
              icon={props.icon}
            />
          ))}
        </div>
      </div>
      <Table />
    </main>
  );
}
