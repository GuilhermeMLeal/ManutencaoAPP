import Aside from "@/app/components/asideBar";
import MainTools from "@/app/components/tools/mainTools";

export default function Tools() {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 flex ">
        <Aside />
        <MainTools />
      </div>
    </div>
  );
}
