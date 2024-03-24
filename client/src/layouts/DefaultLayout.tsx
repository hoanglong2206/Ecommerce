import { Footer, Navbar } from "@/components";
import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
  return (
    <div className="h-full flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
