import Card from "@components/common/card";
import { useState } from "react";
import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { adminOnly, adminOwnerAndStaffOnly } from "@utils/auth-utils";
import { SortOrder } from "@ts-types/generated";
import { useShopQuery } from "@data/shop/use-shop.query";
import PromotionList from "@components/promotion/promotion-list";
import LinkButton from "@components/ui/link-button";
import { usePromotionsQuery } from "@data/promotion/use-promotions.query";
import AdminLayout from "@components/layouts/admin";
import SortForm from "@components/common/sort-form";
import { SEO } from "@components/seo";

export default function Promotions() {
  const {
    query: { shop },
  } = useRouter();
  const { t } = useTranslation();
  const [orderBy, setOrder] = useState("created_at");
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);
  const { data: shopData, isLoading: fetchingShop } = useShopQuery(
    shop as string
  );
  const shopId = shopData?.shop?.id!;
  const {data:promotionsData,  isLoading: loading,error}=usePromotionsQuery({
  });
 
  
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  if (loading || fetchingShop)
    return <Loader text={t("common:text-loading")} />;
  if (error) return <ErrorMessage message={error.message} />;
  function handleSearch({ searchText }: { searchText: string }) {
    setSearchTerm(searchText);
  }
  function handlePagination(current: any) {
    setPage(current);
  }
  return (
    <>
    <SEO title="Publicités"/>
      <Card className="flex flex-col md:flex-row items-center justify-between mb-8">
        <div className="md:w-1/4 mb-4 md:mb-0">
          <h1 className="text-lg font-semibold text-heading">
           Promotions
          </h1>
        </div>

        <div className="w-full md:w-3/4 flex flex-col md:flex-row items-center ms-auto">
        <SortForm
            showLabel={false}
            placeholder="Status"
            className="w-full md:w-1/2 md:ms-5 mt-5 md:mt-0 flex-shrink-1"
            onOrderChange={({ value }: { value: string }) => {
              setOrder(value);
            }}
            options={[
              { value: "total", label: "Total" },
              { value: "pending", label: "En attente" },
              { value: "validated", label: "Validée" },
            ]}
          /> 
          <SortForm
            showLabel={false}
            className="w-full md:w-1/2 md:ms-5 mt-5 md:mt-0 flex-shrink-1"
            onSortChange={({ value }: { value: SortOrder }) => {
              setColumn(value);
            }}
            onOrderChange={({ value }: { value: string }) => {
              setOrder(value);
            }}
            options={[
              { value: "total", label: "Total" },
              { value: "created_at", label: "Created At" },
              { value: "updated_at", label: "Updated At" },
            ]}
          />
        </div>
        <LinkButton
                href={`/${shop}/promotions/create`}
                className="h-12 ms-4 md:ms-6"
              >
                <span className="hidden md:block">
                  + Nouvelle promotion
                </span>
                <span className="md:hidden">
                  + {t("form:button-label-add")}
                </span>
              </LinkButton>
      </Card>

        <PromotionList onPagination={handlePagination}  promotions={promotionsData?.promotions}/>
    </>
  );
}
Promotions.authenticate = {
  permissions: adminOnly,
};
Promotions.Layout = AdminLayout;

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["table", "common", "form"])),
  },
});
