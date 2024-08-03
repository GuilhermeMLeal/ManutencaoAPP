
import Aside from "@/app/components/asideBar";
import Footer from "@/app/components/footer";
import CreateMaintenance from "@/app/components/maintenance/createMaintenance/createMaintenance";

export default function CreateMaintenancePage() {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 flex ">
        <Aside />
        <CreateMaintenance />
      </div>
      <Footer />
    </div>
  );
}
