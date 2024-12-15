import Aside from "@/app/components/asideBar";
import CreateSquad from "@/app/components/teams/createTeam";
import PrivateRoute from "@/PrivateRoute";

export default function CreateTeamPage() {
  return (
    <PrivateRoute>
    <div className="h-screen flex flex-col">
      <div className="flex-1 flex ">
        <Aside />
        <CreateSquad />
      </div>
    </div>
    </PrivateRoute>
  );
}
