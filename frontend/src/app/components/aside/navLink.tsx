import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ConstructionIcon from "@mui/icons-material/Construction";
import { GrVmMaintenance } from "react-icons/gr";
import GroupsIcon from "@mui/icons-material/Groups";
import ChecklistIcon from "@mui/icons-material/Checklist";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";

export default function NavLink() {
  const links = [
    { target: "/pages/index", text: "Manutenção", icon: <GrVmMaintenance className="text-3xl" /> },
    {
      target: "/pages/machines",
      text: "Máquinas",
      icon: <PrecisionManufacturingIcon fontSize="large" />,
    },
    { target: "/pages/tools", text: "Peças", icon: <ConstructionIcon fontSize="large" /> },
    { target: "/pages/teams", text: "Times", icon: <GroupsIcon fontSize="large" /> },
    {
      target: "/pages/controlStock",
      text: "Controle de Estoque de Peças",
      icon: <ChecklistIcon fontSize="large" />,
    },
    { target: "#", text: "Usuário", icon: <ManageAccountsIcon fontSize="large" /> },
  ];

  return (
    <nav className="flex-col flex p-6 space-y-2">
      {links.map((item, index) => (
        <a
          href={item.target}
          key={index}
          className="flex items-center gap-2 text-black hover:text-blue-500 text-xl"
        >
          {item.icon}
          {item.text}
        </a>
      ))}
    </nav>
  );
}
