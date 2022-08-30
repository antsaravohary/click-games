import { FacebookIcon } from "@components/icons/facebook";
import { InstagramIcon } from "@components/icons/instagram";
import { TwitterIcon } from "@components/icons/twitter";
import { YouTubeIcon } from "@components/icons/youtube";
import { ROUTES } from "@utils/routes";
export const siteSettings = {
  name: "Click-Games",
  description: "",
  logo: {
    url: "/logo.png",
    alt: "Click Games",
    href: "/",
    width: 128,
    height: 40,
  },
  defaultLanguage: "fr",
  currencyCode: "Eur",
  product: {
    placeholderImage: "/product-placeholder.svg",
    cardMaps: {
      grocery: "Krypton",
      furniture: "Radon",
      bag: "Oganesson",
      makeup: "Neon",
      book: "Xenon",
      medicine: "Helium",
      default: "Argon",
    },
  },
  author: {
    name: "Click Games",
    websiteUrl: "https://www.click-games.fr",
    address: "support@click-games.fr",
    phone: "",
    social: [
      {
        link: "https://www.facebook.com/ClickGamesFr",
        icon: <FacebookIcon width="16px" height="16px" />,
        hoverClass: "text-social-facebook",
      },
      {
        link: "https://www.instagram.com/ClickGamesFr",
        icon: <InstagramIcon width="16px" height="16px" />,
        hoverClass: "text-social-instagram",
      },
      {
        link: "https://www.twitter.com/ClickGamesFr",
        icon: <TwitterIcon width="16px" height="16px" />,
        hoverClass: "text-social-twitter",
      },
     /* {
        link: "https://www.youtube.com",
        icon: <YouTubeIcon width="16px" height="16px" />,
        hoverClass: "text-social-youtube",
      },*/
    ],
  },
  headerLinks: [
  /*  { href: ROUTES.SHOPS, icon: null, label: "nav-menu-shops" },*/
    /*{ href: ROUTES.OFFERS, icon: null, label: "nav-menu-offer" },
    { href: ROUTES.HELP, label: "nav-menu-faq" },
    { href: ROUTES.CONTACT, label: "nav-menu-contact" },*/
  ],
  authorizedLinks: [
    { href: ROUTES.DASHBOARD, label: "auth-menu-dashboard" },
   /* { href: ROUTES.CHECKOUT, label: "auth-menu-checkout" },*/
  /*  { href: ROUTES.ORDERS, label: "auth-menu-my-orders" },*/
   /* { href: ROUTES.SUPPORTS, label: "auth-menu-support" },*/
    { href: ROUTES.LOGOUT, label: "auth-menu-logout" },

  ],
  dashboardSidebarMenu: [
    {
      href: ROUTES.DASHBOARD,
      menulabel: "profile-sidebar-dashboard",
      icon:"DashboardIcon",
    },
    {
      href: ROUTES.PROFILE,
      menulabel: "profile-sidebar-profile",
      icon:"SettingsIcon",
    },
    {
      href: ROUTES.CHANGE_PASSWORD,
      menulabel: "profile-sidebar-password",
      icon:"PasswordIcon"
    },
    {
      href: ROUTES.ORDERS,
      menulabel: "profile-sidebar-orders",
      icon:"OrdersIcon"
    },
    {
      href: ROUTES.REFUND,
      menulabel: "profile-sidebar-refund",
      icon:"RefundIcon"
    },
    {
      href: ROUTES.EXCHANGE,
      menulabel: "profile-sidebar-exchange",
      icon:"DataTransferIcon"
    },
    {
      href: ROUTES.REPAIR,
      menulabel: "profile-sidebar-repair",
      icon:"RepairIcon"
    },
    {
      href: ROUTES.SALE,
      menulabel: "profile-sidebar-rachat",
      icon:"SubscriptionIcon"
    },

    {
      href: ROUTES.HELP,
      menulabel: "profile-sidebar-help",
      icon:"TagIcon"
    },
    {
      href: ROUTES.SUPPORTS,
      menulabel: "auth-menu-support",
      icon:"SupportIcon"
    },
    {
      href: ROUTES.LOGOUT,
      menulabel: "profile-sidebar-logout",
      icon:"LogoutIcon"
    },
  ],
  deliverySchedule: [
    {
      id: "1",
      title: "Livraison standard",
      description: "2 à 5 jours",
    },
    {
      id: "2",
      title: "Livraison Express",
      description: "1 à 3 jours",
    },
    {
      id: "3",
      title: "Livraison Express",
      description: "1 à 3 jours",
    },
  ],
};
