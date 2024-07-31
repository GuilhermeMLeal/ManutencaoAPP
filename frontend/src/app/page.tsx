import Image from "next/image";
import { BsTools } from "react-icons/bs";
import { FaBuilding, FaSearchLocation, FaUserCog } from "react-icons/fa";
import Footer from "./components/footer";
import Aside from "./components/aside";
import Main from "./components/main";

export default function Home() {
  return (
    <div className="h-screen flex flex-col" >
        <div className="flex-1 flex ">
          <Aside />
          <Main />
        </div>
        <Footer />
    </div>
  );
}
