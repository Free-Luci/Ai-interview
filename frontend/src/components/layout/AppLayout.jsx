import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-base-200">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
