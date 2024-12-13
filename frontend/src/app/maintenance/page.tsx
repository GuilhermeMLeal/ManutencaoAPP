import MainMaintenance from "@/app/components/maintenance/mainMaintenance";
import Aside from "@/app/components/asideBar";

export default function Maintenance() {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 flex">
        <Aside />
        <MainMaintenance />
      </div>
    </div>
  );
}
