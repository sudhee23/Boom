import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar"

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex pt-20">
        <Sidebar />
        <main className="flex-1 px-4 py-6 bg-gray-50 min-h-[calc(100vh-80px)]">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;


