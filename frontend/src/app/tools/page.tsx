import Aside from "@/app/components/asideBar";
import MainTools from "@/app/components/tools/mainTools";
import PrivateRoute from "@/PrivateRoute";

export default function Tools() {
  return (
    <PrivateRoute>
    <div className="h-screen flex flex-col">
      <div className="flex-1 flex ">
        <Aside />
        <MainTools />
      </div>
    </div>
    </PrivateRoute>
  );
}
