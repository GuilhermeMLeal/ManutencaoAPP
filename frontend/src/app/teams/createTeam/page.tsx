import Aside from "@/app/components/asideBar";
import CreateSquad from "@/app/components/teams/createTeam";

export default function CreateTeamPage() {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 flex ">
        <Aside />
        <CreateSquad />
      </div>
    </div>
  );
}
