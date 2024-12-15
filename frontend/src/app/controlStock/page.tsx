import Aside from "@/app/components/asideBar";
import DashboardPage from "@/app/components/controlStock/mainControlStock";
import PrivateRoute from "@/PrivateRoute";

export default function ControlStock() {
  return (
    <PrivateRoute>
    <div className="h-screen flex flex-col">
      <div className="flex-1 flex ">
        <Aside />
        <DashboardPage/>
      </div>
    </div>
    </PrivateRoute>
  );
}
