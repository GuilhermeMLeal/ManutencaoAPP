import Footer from "../../components/footer";
import Aside from "@/app/components/asideBar";
import MainTeam from "@/app/components/teams/mainTeams";

export default function Teams() {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 flex ">
        <Aside />
        <MainTeam />
      </div>
      <Footer />
    </div>
  );
}
