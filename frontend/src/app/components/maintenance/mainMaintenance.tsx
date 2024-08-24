
import { Table } from "./table";
import Title from "../title";

export default function MainMaintenance() {

  return (
    <main className="flex-1 p-6 pt-24 flex flex-col bg-white/90">
      <Title
        title={"Sistema de Gestão de Manutenção"}
        subtitle="Gestão de Manutenção"
      />
      <Table />
    </main>
  );
}
