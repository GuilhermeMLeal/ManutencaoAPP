import Aside from "../../components/aside/asideBar";
import Footer from "../../components/footer/footer";
import Main from "../../components/main";

export default function Index() {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 flex ">
        <Aside />
        <Main />
      </div>
      <Footer />
    </div>
  );
}
