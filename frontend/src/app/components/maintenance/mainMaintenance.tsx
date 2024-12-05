import { Table } from "./table";
import TitleMain from "../titles/titleMain";

export default function MainMaintenance() {
  return (
    <main className="flex-1 flex-col bg-white/90">
      <TitleMain
        title={"Sistema de Gestão de Manutenção"}
        subtitle="Gestão de Manutenção"
      />
      <Table />
    </main>
  );
}
