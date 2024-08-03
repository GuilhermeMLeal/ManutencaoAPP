import Title from "@/app/components/title";

import Footer from "../../components/footer";
import Aside from "@/app/components/asideBar";

export default function Teams() {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 flex ">
        <Aside />
        <Title title={"Sistema de Gestão de Equipes"} />
      </div>
      <Footer />
    </div>
  );
}
