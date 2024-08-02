
import Title from "@/app/components/header/title";
import Aside from "../../components/aside/asideBar";
import Footer from "../../components/footer/footer";

export default function Maintenance() {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 flex ">
        <Aside />
        <Title title={"Sistema de Gestão de Manutenções"} />
      </div>
      <Footer />
    </div>
  );
}
