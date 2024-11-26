import Aside from "@/app/components/asideBar";
import Footer from "@/app/components/footer";
import CreateTool from "@/app/components/tools/createTool";

export default function CreateToolPage() {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 flex ">
        <Aside />
        <CreateTool />
      </div>
      <Footer />
    </div>
  );
}
