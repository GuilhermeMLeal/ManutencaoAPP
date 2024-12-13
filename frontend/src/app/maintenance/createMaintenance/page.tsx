import Aside from "@/app/components/asideBar";
import CreateMaintenance from "@/app/components/maintenance/createMaintenance";

export default function CreateMaintenancePage() {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 flex ">
        <Aside />
        <CreateMaintenance />
      </div>
    </div>
  );
}
