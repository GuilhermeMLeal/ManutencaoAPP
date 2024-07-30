import Image from "next/image";
import { BsTools } from "react-icons/bs";
import { FaBuilding, FaSearchLocation, FaUserCog } from "react-icons/fa";
import { GrHostMaintenance } from "react-icons/gr";
import { MdDashboard } from "react-icons/md";

export default function Home() {
  return (
    <div className="h-screen flex flex-col" >
        <div className="flex-1 flex ">
          <aside className="w-64 p-6 bg-white/80">
              <Image src={"/image/logo.png"} alt={"Logo"} className="w-full" width={240} height={240}/>

              <nav className="flex-col flex p-6 space-y-2">
                <a href="" className="flex items-center gap-2 hover:text-blue-500	">
                  <MdDashboard />
                  Dashboard</a>
                <a href="" className="flex items-center gap-2 hover:text-blue-500	">
                  <FaSearchLocation />
                  Ambientes</a>
                <a href="" className="flex items-center gap-2 hover:text-blue-500	">
                  <BsTools />
                  Equipamentos</a>
                <a href="" className="flex items-center gap-2 hover:text-blue-500	">
                  <GrHostMaintenance />
                  Manutenções</a>
                <a href="" className="flex items-center gap-2 hover:text-blue-500">
                  <FaUserCog />
                  Usuário</a>  
              </nav>
            </aside> 
          <main className="flex-1 p-6 flex flex-col bg-white/90">
            <h1 className="text-4xl font-bold uppercase w-full  p-6 text-center text-black">Sistema de Gestão de Manutenção</h1>
            <div>
              <div className="grid grid-cols-4 gap-4 p-6 flex-row">
                <div className="bg-orange-300 flex flex-row p-6 rounded-xl">
                  <div className="flex flex-col flex-1">
                    <strong className="text-3xl font-bold">200</strong>
                    <span className="text-sm text-black">Ambientes</span>
                  </div>
                  <FaBuilding size={42} />
                </div>
                <div className="bg-yellow-400 flex flex-row p-6 rounded-xl">
                  <div className="flex flex-col flex-1">
                    <strong className="text-3xl font-bold">200</strong>
                    <span className="text-sm text-black">Ambientes</span>
                  </div>
                  <FaBuilding size={42} />
                </div>
                <div className="bg-red-600 flex flex-row p-6 rounded-xl">
                  <div className="flex flex-col flex-1">
                    <strong className="text-3xl font-bold">200</strong>
                    <span className="text-sm text-black">Ambientes</span>
                  </div>
                  <FaBuilding size={42} />
                </div>
                <div className="bg-blue-600 flex flex-row p-6 rounded-xl">
                  <div className="flex flex-col flex-1">
                    <strong className="text-3xl font-bold">200</strong>
                    <span className="text-sm text-black">Ambientes</span>
                  </div>
                  <FaBuilding size={42} />
                </div>
              </div>
            </div>
          </main>
        </div>
        <footer className="p-6 bg-white/80 text-center text-black text-xl">Todos os direitos reservados &copy; 2024</footer>
    </div>
  );
}
