import Aside from "../components/aside/asideBar";
import Footer from "../components/footer/footer";

export default function Equipments() {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 flex ">
        <Aside />
      </div>
      <Footer />
    </div>
  );
}
