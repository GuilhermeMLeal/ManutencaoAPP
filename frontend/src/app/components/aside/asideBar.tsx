import Image from "next/image";
import NavLink from "./navLink";

export default function Aside() {
  return (
    <aside className="w-64 p-6 bg-white/80 flex flex-col">
      <Image src={"/image/logo.png"} alt={"Logo"} className="w-full" width={240} height={240} />
      <NavLink />
    </aside>
  );
}
