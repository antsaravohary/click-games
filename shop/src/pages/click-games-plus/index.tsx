import Layout from "@components/layout/layout";
import { privacyPolicy } from "@settings/privacy.settings";
import { Link, Element } from "react-scroll";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import HomeLayout from "@components/layout/home-layout";
import Button from "@components/ui/button";
import { GetStaticProps } from "next";
import { dehydrate, QueryClient } from "react-query";
import { fetchSettings } from "@data/settings/use-settings.query";
import { fetchProducts } from "@data/product/use-products.query";
import { fetchCategories } from "@data/category/use-categories.query";
import { fetchTypes } from "@data/type/use-types.query";
import ListGamesExchange from "@components/click-games-plus/list-games-exchange";
import ListLogo from "@components/click-games-plus/list-logo";
import { SEO } from "@components/seo";

function makeTitleToDOMId(title: string) {
  return title.toLowerCase().split(" ").join("_");
}
const products = [
  {
    id: 1,
    name: "Super Mario Odyssey standard",
    color: "White and black",
    href: "#",
    imageSrc:
      "https://www.click-univers.com/_next/image?url=https%3A%2F%2Fapi.click-univers.com%2Fstorage%2F457%2Fconversions%2F81TksYoxfQL._AC_SL1500_-thumbnail.jpg&w=1920&q=75",
    imageAlt:
      "Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.",
    price: "$140",
  },
  {
    id: 2,
    name: "Super Mario Odyssey standard",
    color: "White and black",
    href: "#",
    imageSrc:
      "https://www.click-univers.com/_next/image?url=https%3A%2F%2Fapi.click-univers.com%2Fstorage%2F457%2Fconversions%2F81TksYoxfQL._AC_SL1500_-thumbnail.jpg&w=1920&q=75",
    imageAlt:
      "Front of zip tote bag with white canvas, black canvas straps and handle, and black zipper pulls.",
    price: "$140",
  },
  // More products...
];
export default function ClickGamePlusPage() {

  return (
    <>
      <SEO title="Click sur ton Univers"/>
      <div className="w-full  overflow-hidden block lg:mt-6">
        <div className="flex justify-center py-8">
          <img
            src="click-games-plus.png"
            alt=""
            className=" h-full object-center object-cover w-96"
          />
        </div>
        <ListLogo />
      </div>
      <div className="flex flex-1 bg-gray-100">
        <main className="w-full overflow-hidden block lg:mt-6">
          <Element name="grid">
            <ListGamesExchange />
          </Element>
        </main>
      </div>
    </>
  );
}

ClickGamePlusPage.Layout = HomeLayout;

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