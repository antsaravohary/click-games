import { useEffect } from "react";
import { useRouter } from "next/router";
import { GetStaticPathsContext, GetStaticProps } from "next";
import { scroller, Element } from "react-scroll";
import { QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";
import dynamic from "next/dynamic";
import Banner from "@components/common/banner";
import HomeLayout from "@components/layout/home-layout";
import PromotionSlider from "@components/common/promotion-slider";
import ProductFeed from "@components/product/feed";
import CategoryDropdownSidebar from "@components/category/category-dropdown-sidebar";
import FilterBar from "@components/common/filter-bar";
import { useWindowSize } from "@utils/use-window-size";
import { sitePages, PageName } from "@settings/site-pages.settings";
import { getKeyValue } from "@utils/get-key-value";
import { fetchProducts } from "@data/product/use-products.query";
import { fetchCategories } from "@data/category/use-categories.query";
import { fetchTypes } from "@data/type/use-types.query";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { fetchSettings } from "@data/settings/use-settings.query";
import FooterOne from "@components/layout/footer-one";
import CookieConsent, { Cookies } from "react-cookie-consent";
import { NextSeo } from "next-seo";
import { SEO } from "@components/seo";
import Container from "@components/ui/container";
import BannerGridTwo from "@components/common/banner-grid-two";
import FeatureGrid from "@components/common/featured-grid";
import BannerShort from "@components/common/banner-short";
import BoxCategory from "@components/category/box-category";
import FilterBarLayoutTwo from "@components/common/filter-bar-layout-two";
import FeedLayoutTwo from "@components/product/feed-layout-two";
const banners = [
  {
    id: 1,
    title: 'Free delivery from your store',
    slug: '/search',
    image: {
      mobile: {
        url: '/banner/images/banner/banner-mobile-1.png',
        width: 450,
        height: 222,
      },
      desktop: {
        url: '/assets/images/banner/banner-1.png',
        width: 910,
        height: 450,
      },
    },
  },
  {
    id: 2,
    title: 'Fresh Healthy Breakfast food',
    slug: '/search',
    image: {
      mobile: {
        url: '/assets/images/banner/banner-mobile-2.png',
        width: 450,
        height: 222,
      },
      desktop: {
        url: '/assets/images/banner/banner-2.png',
        width: 910,
        height: 450,
      },
    },
  },
];


const CartCounterButton = dynamic(
  () => import("@components/cart/cart-counter-button"),
  { ssr: false }
);

// This function gets called at build time
/*export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  /*const { types } = await fetchTypes();*/

/* const paths = types
    ?.filter((t: any) => t.slug !== "bakery")
    .flatMap((type: any) =>
      locales?.map((locale) => ({ params: { type: type.slug }, locale }))
    );
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };*/
//}

export const getStaticProps: GetStaticProps = async ({ locale, params }) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("settings", fetchSettings);

  await queryClient.prefetchInfiniteQuery(
    ["products", { type: params?.type }],
    fetchProducts,
    {
      staleTime: 60 * 1000,
    }
  );
  await queryClient.prefetchQuery(
    ["fetch-parent-category", { type: params?.type }],
    fetchCategories,
    {
      staleTime: 60 * 1000,
    }
  );
  await queryClient.prefetchQuery("types", fetchTypes, {
    staleTime: 60 * 1000,
  });

  return {
    props: {
      ...(await serverSideTranslations(locale!, ["common"])),
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
    revalidate: 120,
  };
};

export default function HomePage() {
  const { query } = useRouter();
  useEffect(() => {
    if (query.text || query.category) {
      scroller.scrollTo("grid", {
        smooth: true,
        offset: -110,
      });
    }
  }, [query.text, query.category]);

  const { width } = useWindowSize();
  const getPageData = getKeyValue(sitePages, "grocery");

  return (
    <>

      <SEO
        title="Click sur ton Univers"
      />
      <div className="w-fulll overflow-hidden hidden lock lg:mt-6">
        <BannerShort banner={getPageData.banner} className="max-h-140" />
        <FeatureGrid className="hidden" />
      </div>
 
      <div className="flex flex-1 bg-gray-100">
        <div className="sticky top-22 h-full lg:w-[380px] hidden xl:block bg-gray-100">
          <BoxCategory />
        </div>

        <main className="w-full overflow-hidden block lg:mt-6">
          {width < 1280 && width > 684 && <FilterBarLayoutTwo />}
          <Element name="grid">
            <ProductFeed />
          </Element>
        </main>
      </div>
      {width > 1023 && <CartCounterButton />}

      {/**   <Banner banner={getPageData?.banner} className="miiiin-h-screen" />
  
      <FilterBar />
      <BannerShort banner={getPageData.banner} className="max-h-140" />
      <div className="min-h-screen">
    
        <div className="flex flex-1 bg-gray-100">
          <CategoryDropdownSidebar />
          <main className="block w-full lg:mt-6 xl:overflow-hidden ltr:xl:pl-0 ltr:xl:pr-5 rtl:xl:pr-0 rtl:xl:pl-5">

            <ProductFeed />

          </main>
        </div>
      </div>
      <Element
        name="grid"
        className="flex flex-1 border-t border-solid border-border-200 border-opacity-70"
      >
      </Element>
      {width > 1023 && <CartCounterButton />}*/}
      <CookieConsent buttonText="ok!" style={{ background: "white", color: "black", boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)", textAlign: "center" }}>Nous utilisons des cookies pour vous garantir la meilleure expérience sur notre site web. Si vous continuez à utiliser ce site, nous supposerons que vous en êtes satisfait.</CookieConsent>
    </>
  );
}

HomePage.Layout = HomeLayout;
