import Aside from "@/app/components/asideBar";
import MainMachine from "@/app/components/machines/mainMachine";

export default function Machines() {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 flex ">
        <Aside />
        <MainMachine />
      </div>
    </div>
  );
}
