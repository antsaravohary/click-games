import { useUI } from "@contexts/ui.context";
import { siteSettings } from "@settings/site.settings";
import SidebarWrapper from "@components/common/sidebar/sidebar-wrapper";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import NavLink from "@components/ui/link/nav-link";
import * as sidebarIcons from "@components/icons/sidebar";
import { getIcon } from "@utils/get-icon";
import { useCustomerQuery } from "@data/customer/use-customer.query";

export default function MobileAuthorizedMenu() {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { closeSidebar } = useUI();
  const { data } = useCustomerQuery();
  function handleClick(path: string) {
    router.push(path);
    return closeSidebar();
  }
  return (
    <SidebarWrapper>
      <div className="flex flex-col flex-grow bg-white  pb-4 overflow-y-auto">
        <nav
          className=" flex-1 flex flex-col overflow-y-auto pl-4"
          aria-label="Sidebar"
        >
          {siteSettings.dashboardSidebarMenu
            ?.slice(0, -3)
            .map((item: any, idx) => (
              <NavLink
                key={idx}
                activeClassName="bg-accent text-white"
                href={item.href}
              >
                <a
                onClick={()=>{
                  closeSidebar();
                }}
                  className="text-cyan-100 hover:text-white hover:bg-accent-hover group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md"
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.icon &&
                    getIcon({
                      iconList: sidebarIcons,
                      iconName: item.icon,
                      className: "w-5 h-5 me-4",
                    })}
                  <span> {t(item.menulabel)}</span>
                </a>
              </NavLink>
            ))}
               {data?.me?.subscription && (
              <>
                <NavLink href={"/games"} activeClassName="bg-accent text-white">
                  <a
                    href={"/games"}
                    onClick={()=>{
                      closeSidebar();
                    }}
                    className="text-cyan-100 hover:text-white hover:bg-accent-hover group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md"
                  >
                    {getIcon({
                      iconList: sidebarIcons,
                      iconName: "SubscriptionIcon",
                      className: "w-5 h-5 me-4",
                    })}
                    Vente de jeux
                  </a>
                </NavLink>
                <NavLink
                  href={"/subscription"}
                  activeClassName="bg-accent text-white"
                >
                  <a
                    href={"/subscription"}
                    onClick={()=>{
                      closeSidebar();
                    }}
                    className="text-cyan-100 hover:text-white hover:bg-accent-hover group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md"
                  >
                    {getIcon({
                      iconList: sidebarIcons,
                      iconName: "StartIcon",
                      className: "w-5 h-5 me-4",
                    })}
                    Abonnement
                  </a>
                </NavLink>
              </>
            )}
          <div className="mt-2 border-t pt-2">
            <div className="px-2 space-y-1"></div>
            {siteSettings.dashboardSidebarMenu?.slice(-3).map((item, idx) => (
              <NavLink
                href={item.href}
                key={idx}
                activeClassName="bg-accent text-white"
              >
                <a
                  href={item.href}
                  onClick={()=>{
                    closeSidebar();
                  }}
                  className="text-cyan-100 hover:text-white hover:bg-accent-hover group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md"
                >
                  {item.icon &&
                    getIcon({
                      iconList: sidebarIcons,
                      iconName: item.icon,
                      className: "w-5 h-5 me-4",
                    })}
                  {t(item.menulabel)}
                </a>
              </NavLink>
            ))}
          </div>
        </nav>
      </div>
    </SidebarWrapper>
  );
}
