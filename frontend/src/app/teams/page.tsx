import Aside from "@/app/components/asideBar";
import MainTeam from "@/app/components/teams/mainTeams";
import PrivateRoute from "@/PrivateRoute";

export default function Teams() {
  return (
    <PrivateRoute>
    <div className="h-screen flex flex-col">
      <div className="flex-1 flex ">
        <Aside />
        <MainTeam />
      </div>
    </div>
    </PrivateRoute>
  );
}
