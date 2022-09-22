import Card from "@components/common/card";
import Search from "@components/common/search";
import Loader from "@components/ui/loader/loader";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ShopLayout from "@components/layouts/shop";
import { useRouter } from "next/router";
import { adminOwnerAndStaffOnly } from "@utils/auth-utils";
import { useShopQuery } from "@data/shop/use-shop.query";
import { useState } from "react";
import { useOrderCodeClickCollectCheckQuery } from "@data/order/use-order-code-click-collect-check.query";
import ClickCollectRetraitList from "@components/click-collect/click-collect-retrait-list";
import { SEO } from "@components/seo";

export default function ClickCollect() {
  const {
    query: { shop },
  } = useRouter();
  const { t } = useTranslation();
  const { data: shopData, isLoading: fetchingShop } = useShopQuery(
    shop as string
  );
  const shopId = shopData?.shop?.id!;
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading: finding } =
    useOrderCodeClickCollectCheckQuery(searchTerm);
  if (fetchingShop) return <Loader text={t("common:text-loading")} />;
  function handleSearch({ searchText }: { searchText: string }) {
    setSearchTerm(searchText);
  }
  console.log("data", data);

  return (
    <>
     <SEO title="Click-Collect"/>
      <Card className="flex flex-col md:flex-row items-center justify-between mb-8">
        <div className="md:w-1/4 mb-4 md:mb-0">
          <h1 className="text-lg font-semibold text-heading">
            Entrée code de retrait click collect
          </h1>
        </div>

        <div className="w-full md:w-3/4 flex flex-col md:flex-row items-center ms-auto">
          <Search onSearch={handleSearch} />
        </div>
      </Card>
      <div className="flex justify-center">
        {finding &&searchTerm!=="" ? (
          <Loader className="w-8 h-8" text="recherche ..." simple={true} />
        ) : (
          <>
          {searchTerm!=""&&data&&<ClickCollectRetraitList order={data?.order} />}
            
          </>
        )}
      </div>
    </>
  );
}
ClickCollect.authenticate = {
  permissions: adminOwnerAndStaffOnly,
};
ClickCollect.Layout = ShopLayout;

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["table", "common", "form"])),
  },
});
