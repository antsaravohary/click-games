import Navbar from "@components/layout/navbar/navbar";
import AccountSideBar from "./account-sidebar";
import MobileNavigation from "./mobile-navigation";

const AccountLayout: React.FC = ({ children }) => (
  <div className="min-h-screen flex flex-col transition-colors duration-150 bg-gray-100">
    <Navbar />
    <div className="h-full">
      <AccountSideBar />
      <div className="lg:pl-64 flex flex-col flex-1">
        <main className="flex-1 pb-8">
          {children}
        </main>
      </div>
    </div>
    <MobileNavigation search={false} />
  </div>
);

export default AccountLayout;
