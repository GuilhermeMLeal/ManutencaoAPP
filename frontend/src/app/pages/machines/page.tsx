import Title from "@/app/components/title";

import Footer from "../../components/footer";
import Aside from "@/app/components/asideBar";
import MainMaintenance from "@/app/machines/mainMachine";

export default function Machines() {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 flex ">
        <Aside />
        <MainMaintenance />
      </div>
      <Footer />
    </div>
  );
}
