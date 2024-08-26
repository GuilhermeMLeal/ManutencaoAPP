
import { Table } from "./table";
import TitleMain from "../titleMain";

export default function MainMaintenance() {

  return (
    <main className="flex-1 p-6 pt-24 flex flex-col bg-white/90">
      <TitleMain
        title={"Sistema de Gestão de Manutenção"}
        subtitle="Gestão de Manutenção"
      />
      <Table />
    </main>
  );
}
