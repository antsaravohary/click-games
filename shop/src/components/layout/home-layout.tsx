import NavbarWithSearch from "@components/layout/navbar/navbar-with-search";
import Footer from "./footer/footer";
import MobileNavigation from "./mobile-navigation";
import Navbar from "./navbar/navbar";

const HomeLayout: React.FC = ({ children }) => (
  <div className="flex flex-col min-h-screen transition-colors duration-150 bg-gray-100">
    <Navbar />
    {children}
    <Footer />
    <MobileNavigation />
  </div>
);

export default HomeLayout;
