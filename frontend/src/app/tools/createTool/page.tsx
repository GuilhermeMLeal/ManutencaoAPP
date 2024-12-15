import Aside from "@/app/components/asideBar";
import CreateTool from "@/app/components/tools/createTool";
import PrivateRoute from "@/PrivateRoute";

export default function CreateToolPage() {
  return (
    <PrivateRoute>
    <div className="h-screen flex flex-col">
      <div className="flex-1 flex ">
        <Aside />
        <CreateTool />
      </div>
    </div>
    </PrivateRoute>
  );
}
