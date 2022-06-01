import Navbar from "@components/layout/navbar/navbar";
import Footer from "./footer/footer";
import MobileNavigation from "./mobile-navigation";

const Layout: React.FC = ({ children }) => (
  <div className="flex flex-col min-h-screen transition-colors duration-150 bg-gray-100">
    <Navbar />
    {children}
    <Footer />
    <MobileNavigation />
  </div>
);

export default Layout;
