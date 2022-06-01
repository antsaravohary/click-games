import cn from "classnames";
import NavLink from "@components/ui/link/nav-link";
import { siteSettings } from "@settings/site.settings";
import { useTranslation } from "next-i18next";
import * as sidebarIcons from "@components/icons/sidebar";
import { getIcon } from "@utils/get-icon";
import { useCustomerQuery } from "@data/subscription/use-customer.query";

type DashboardSidebarProps = {
  className?: string;
};

const AccountSideBar: React.FC<DashboardSidebarProps> = ({ className }) => {
  const { t } = useTranslation();
  const { data } = useCustomerQuery();
  return (
    <div className="hidden mt-14 md:mt-16 lg:mt-22 lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
      {/* Sidebar component, swap this element with another sidebar if you like */}
      <div className="flexflex-col flex-grow bg-white border pt-5 pb-4 overflow-y-auto">
        <nav
          className="mt-5 flex-1 flex flex-col divide-y divide-cyan-800 overflow-y-auto"
          aria-label="Sidebar"
        >
          <div className="px-2 space-y-1">
            {siteSettings.dashboardSidebarMenu
              ?.slice(0, -3)
              .map((item: any, idx) => (
                <NavLink
                  key={idx}
                  activeClassName="bg-accent text-white"
                  href={item.href}
                >
                  <a
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
             
                <NavLink
                  href={"/subscription"}
                  activeClassName="bg-accent text-white"
                >
                  <a
                    href={"/subscription"}
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
          </div>
          <div className="mt-6 pt-6">
            <div className="px-2 space-y-1">
              {siteSettings.dashboardSidebarMenu?.slice(-3).map((item, idx) => (
                <NavLink
                  href={item.href}
                  key={idx}
                  activeClassName="bg-accent text-white"
                >
                  <a
                    href={item.href}
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
          </div>
        </nav>
      </div>
    </div>
  );
  return (
    <aside
      className={cn(
        "bg-light rounded border border-border-200 overflow-hidden",
        className
      )}
    >
      <ul className="py-8">
        {siteSettings.dashboardSidebarMenu
          ?.slice(0, -1)
          .map((item: any, idx) => (
            <li className="py-2" key={idx}>
              <NavLink
                href={item.href}
                activeClassName="border-accent text-accent"
              >
                <a className="block py-2 px-10 font-semibold text-heading transition-colors border-l-4 border-transparent hover:text-accent focus:text-accent">
                  {t(item.menulabel)}
                </a>
              </NavLink>
            </li>
          ))}
      </ul>
      {/* End of top part menu */}

      <ul className="bg-light border-t border-border-200 py-4">
        {siteSettings.dashboardSidebarMenu?.slice(-1).map((item: any, idx) => (
          <li className="py-2" key={idx}>
            <NavLink
              href={item.href}
              activeClassName="border-l-4 border-accent text-accent"
            >
              <a className="block py-2 px-10 font-semibold text-heading transition-colors hover:text-accent focus:text-accent">
                {t(item.menulabel)}
              </a>
            </NavLink>
          </li>
        ))}
      </ul>
      {/* End of bottom part menu */}
    </aside>
  );
};

export default AccountSideBar;
