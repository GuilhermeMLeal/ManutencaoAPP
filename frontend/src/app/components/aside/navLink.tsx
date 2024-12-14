"use client"

import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ConstructionIcon from "@mui/icons-material/Construction";
import { GrVmMaintenance } from "react-icons/gr";
import GroupsIcon from "@mui/icons-material/Groups";
import ChecklistIcon from "@mui/icons-material/Checklist";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import { FiLogOut } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { clearTokens } from "@/utils/storage";

export default function NavLink() {
  const router = useRouter();

  const handleLogout = () => {
    clearTokens();
    router.push("/login");
  };

  const links = [
    { target: "/maintenance", text: "Manutenção", icon: <GrVmMaintenance className="text-3xl" /> },
    {
      target: "/machines",
      text: "Máquinas",
      icon: <PrecisionManufacturingIcon fontSize="large" />,
    },
    { target: "/tools", text: "Peças", icon: <ConstructionIcon fontSize="large" /> },
    { target: "/teams", text: "Times", icon: <GroupsIcon fontSize="large" /> },
    {
      target: "/controlStock",
      text: "Relatórios",
      icon: <ChecklistIcon fontSize="large" />,
    },
    { target: "#", text: "Usuário", icon: <ManageAccountsIcon fontSize="large" /> },
  ];

  return (
    <nav className="flex-col flex p-6 space-y-4">
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

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 text-red-600 hover:text-red-800 text-xl"
      >
        <FiLogOut className="text-2xl" />
        Logout
      </button>
    </nav>
  );
}
