import { MdDashboard } from "react-icons/md";
import { BsTools } from "react-icons/bs";
import { FaSearchLocation, FaUserCog } from "react-icons/fa";
import { GrHostMaintenance } from "react-icons/gr";

export default function NavLink(){
 
    const links = [
        { target:"#", text:"Dashboard", icon:<MdDashboard /> },
        { target:"#", text:"Ambientes", icon:<FaSearchLocation /> },
        { target:"#", text:"Equipamentos", icon:<BsTools /> },
        { target:"#", text:"Manutenções", icon:<GrHostMaintenance /> },
        { target:"#", text:"Usuário", icon:<FaUserCog /> }
    ];

    return (
        <nav className="flex-col flex p-6 space-y-2">
            {links.map((item, index) => (
                <a href={item.target} key={index} className="flex items-center gap-2 text-black hover:text-blue-500">
                    {item.icon}
                    {item.text}
                </a>
            )
            )}  
        </nav>
    );
}