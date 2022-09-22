import { adminAndOwnerOnly, adminOwnerAndStaffOnly } from "@utils/auth-utils";
import { ROUTES } from "@utils/routes";

export const siteSettings = {
  name: "Click Univers",
  description: "",
  logo: {
    url: "/logo.png",
    alt: "Click Univers",
    href: "/",
    width: 128,
    height: 40,
  },
  defaultLanguage: "fr",
  author: {
    name: "Click Univers",
    websiteUrl: "https://redq.io",
    address: "",
  },
  headerLinks: [],
  authorizedLinks: [
    {
      href: ROUTES.PROFILE_UPDATE,
      labelTransKey: "authorized-nav-item-profile",
    },
    {
      href: ROUTES.LOGOUT,
      labelTransKey: "authorized-nav-item-logout",
    },
  ],
  currencyCode: "EUR",
  sidebarLinks: {
    admin: [
      {
        href: ROUTES.DASHBOARD,
        label: "sidebar-nav-item-dashboard",
        icon: "DashboardIcon",
      },
      {
        href: ROUTES.SHOPS,
        label: "sidebar-nav-item-shops",
        icon: "ShopIcon",
      },
      {
        href: ROUTES.ADMIN_MY_SHOPS,
        label: "sidebar-nav-item-my-shops",
        icon: "MyShopIcon",
      },
      {
        href: ROUTES.PRODUCTS,
        label: "sidebar-nav-item-products",
        icon: "ProductsIcon",
      },
      {
        href: ROUTES.ATTRIBUTES,
        label: "sidebar-nav-item-attributes",
        icon: "AttributeIcon",
      },
     /* {
        href: ROUTES.GROUPS,
        label: "sidebar-nav-item-groups",
        icon: "TypesIcon",
      },*/
      {
        href: ROUTES.CATEGORIES,
        label: "sidebar-nav-item-categories",
        icon: "CategoriesIcon",
      },
      {
        href: ROUTES.BRAND,
        label: "sidebar-nav-item-brand",
        icon: "CategoriesIcon",
      },
      {
        href: ROUTES.TAGS,
        label: "sidebar-nav-item-tags",
        icon: "TagIcon",
      },
      {
        href: ROUTES.ORDERS,
        label: "sidebar-nav-item-orders",
        icon: "OrdersIcon",
      },
      {
        href: ROUTES.REPAIR,
        label: "sidebar-nav-item-repairs",
        icon: "RepairIcon",
      },
      {
        href: ROUTES.EXCHANGE,
        label: "sidebar-nav-item-exchanges",
        icon: "RepairIcon",
      },
      {
        href: ROUTES.PURCHASE,
        label: "sidebar-nav-item-purchase",
        icon: "BuyIcon",
      },
      {
        href:ROUTES.TRANSACTION,
        label: "sidebar-nav-item-transactions",
        icon: "TaxesIcon",
      
      },
      {
        href:ROUTES.SUBSCRIPTION,
        label: "sidebar-nav-item-subscription",
        icon: "OrdersStatusIcon",
      
      },
    /*  {
        href: ROUTES.ORDER_STATUS,
        label: "sidebar-nav-item-order-status",
        icon: "OrdersStatusIcon",
      },*/
      {
        href: ROUTES.MODEL_MESSAGE,
        label: "Model message",
        icon: "ArticleIcon",
      },
      {
        href: ROUTES.USERS,
        label: "sidebar-nav-item-users",
        icon: "UsersIcon",
      },
      {
        href: ROUTES.COUPONS,
        label: "sidebar-nav-item-coupons",
        icon: "CouponsIcon",
      },
      {
        href: ROUTES.TAXES,
        label: "sidebar-nav-item-taxes",
        icon: "TaxesIcon",
      },
      {
        href: ROUTES.SHIPPINGS,
        label: "sidebar-nav-item-shippings",
        icon: "ShippingsIcon",
      },
      {
        href: ROUTES.PROMOTION_TYPE,
        label: "sidebar-nav-item-promotion-type",
        icon: "TagIcon",
      },
      {
        href:ROUTES.PROMOTION,
        label: "sidebar-nav-item-promotion",
        icon: "PromotionIcon",
      },
      {
        href: ROUTES.WITHDRAWS,
        label: "sidebar-nav-item-withdraws",
        icon: "WithdrawIcon",
      },
      {
        href:ROUTES.REFUND,
        label: "sidebar-nav-item-refunds",
        icon: "DollarIcon",
        permissions: adminAndOwnerOnly,
      },
      {
        href: ROUTES.SUPPORT,
        label: "sidebar-nav-item-supports",
        icon: "SupportIcon",
        permissions: adminAndOwnerOnly,
      },
      {
        href:ROUTES.STRIPE_SESSION,
        label: "sidebar-nav-item-stripe-session",
        icon: "ArticleIcon",
        permissions: adminAndOwnerOnly,
      },
      {
        href:ROUTES.ERP_EMAIL,
        label: "sidebar-nav-item-erp-mailling",
        icon: "EmailIcon",
        permissions: adminAndOwnerOnly,
      },
      {
        href: ROUTES.FAQ,
        label: "sidebar-nav-item-faq",
        icon: "ArticleIcon",
      },
      {
        href: ROUTES.ARTICLE,
        label: "sidebar-nav-item-article",
        icon: "ArticleIcon",
      },
      
      {
        href: ROUTES.SETTINGS,
        label: "sidebar-nav-item-settings",
        icon: "SettingsIcon",
      },
    ],
    shop: [
      {
        href: (shop: string) => `${ROUTES.DASHBOARD}${shop}`,
        label: "sidebar-nav-item-dashboard",
        icon: "DashboardIcon",
        permissions: adminOwnerAndStaffOnly,
      },
      {
        href: (shop: string) => `/${shop}${ROUTES.ATTRIBUTES}`,
        label: "sidebar-nav-item-attributes",
        icon: "AttributeIcon",
        permissions: adminOwnerAndStaffOnly,
      },
      {
        href: (shop: string) => `/${shop}${ROUTES.PRODUCTS}`,
        label: "sidebar-nav-item-products",
        icon: "ProductsIcon",
        permissions: adminOwnerAndStaffOnly,
      },

      {
        href: (shop: string) => `/${shop}${ROUTES.ORDERS}`,
        label: "sidebar-nav-item-orders",
        icon: "OrdersIcon",
        permissions: adminOwnerAndStaffOnly,
      },
      {
        href: (shop: string) => `/${shop}${ROUTES.CLICK_COLLECT}`,
        label: "sidebar-nav-item-click-collect",
        icon: "ClickCollect",
        permissions: adminOwnerAndStaffOnly,
      },
      {
        href: (shop: string) => `/${shop}${ROUTES.STAFFS}`,
        label: "sidebar-nav-item-staffs",
        icon: "UsersIcon",
        permissions: adminAndOwnerOnly,
      },
      {
        href: (shop: string) => `/${shop}${ROUTES.WITHDRAWS}`,
        label: "sidebar-nav-item-withdraws",
        icon: "AttributeIcon",
        permissions: adminAndOwnerOnly,
      },
      {
        href: (shop: string) => `/${shop}${ROUTES.REFUND}`,
        label: "sidebar-nav-item-refunds",
        icon: "DollarIcon",
        permissions: adminAndOwnerOnly,
      },
      {
        href: (shop: string) => `/${shop}${ROUTES.SUPPORT}`,
        label: "sidebar-nav-item-supports",
        icon: "SupportIcon",
        permissions: adminOwnerAndStaffOnly,
      },
      {
        href: (shop: string) => `/${shop}${ROUTES.PROMOTION}`,
        label: "sidebar-nav-item-promotion",
        icon: "PromotionIcon",
        permissions: adminOwnerAndStaffOnly,
      },
      {
        href:(shop: string) =>  '/outil-magic', 
        label: "sidebar-nav-item-outil-magic",
        icon: "OutilMagic",
        permissions: adminOwnerAndStaffOnly,
      },
      {
        href: (shop: string) => `/${shop}/edit`,
        label: "sidebar-nav-item-settings",
        icon: "SettingsIcon",
        permissions: adminOwnerAndStaffOnly,
      },
    ],
  },
  product: {
    placeholder: "/product-placeholder.svg",
  },
  avatar: {
    placeholder: "/avatar-placeholder.svg",
  },
};
