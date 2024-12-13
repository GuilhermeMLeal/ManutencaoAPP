import Aside from "@/app/components/asideBar";
import DashboardPage from "@/app/components/controlStock/mainControlStock";

export default function ControlStock() {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 flex ">
        <Aside />
        <DashboardPage/>
      </div>
    </div>
  );
}
