import Image from "next/image";
import NavLink from "./aside/navLink";

export default function Aside() {
  return (
    <aside className="w-64 bg-white/80 flex flex-col items-center">
      <Image
        src={"/image/logo.png"}
        alt={"Logo"}
        className="w-full"
        width={240}
        height={240}
      />
      <NavLink />
    </aside>
  );
}
