
import MainMaintenance from "@/app/components/maintenance/mainMaintenance";
import Footer from "../../components/footer";
import Aside from "@/app/components/asideBar";


export default function Index() {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 flex">
        <Aside />
        <MainMaintenance />
      </div>
      <Footer />
    </div>
  );
}