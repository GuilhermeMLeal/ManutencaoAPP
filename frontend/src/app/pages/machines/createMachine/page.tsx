import Aside from "@/app/components/asideBar";
import Footer from "@/app/components/footer";
import CreateMachine from "@/app/components/machines/createMachine";

export default function CreateMachinePage() {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 flex ">
        <Aside />
        <CreateMachine />
      </div>
      <Footer />
    </div>
  );
}
