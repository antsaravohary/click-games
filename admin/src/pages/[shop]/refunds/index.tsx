import Card from "@components/common/card";
import LinkButton from "@components/ui/link-button";
import Loader from "@components/ui/loader/loader";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ShopLayout from "@components/layouts/shop";
import { useRouter } from "next/router";
import StaffList from "@components/shop/staff-list";
import { adminAndOwnerOnly } from "@utils/auth-utils";
import ErrorMessage from "@components/ui/error-message";
import { useShopQuery } from "@data/shop/use-shop.query";
import { useStaffsQuery } from "@data/shop/use-staffs.query";
import { useState } from "react";
import { SortOrder } from "@ts-types/generated";
import SortForm from "@components/common/sort-form";
import { useRefundsQuery } from "@data/refund/use-refunds.query";
import RefundList from "@components/refund/refund-list";
import { SEO } from "@components/seo";

export default function StaffsPage() {
  const {
    query: { shop },
  } = useRouter();
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<string>();
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);

  const { data: shopData, isLoading: fetchingShopId } = useShopQuery(
    shop as string
  );

  const shopId = shopData?.shop?.id!;
  const {
    data,
    isLoading: loading,
    error,
  } = useRefundsQuery({
    shop_id: Number(shopId),
    page,
    status,
    sortedBy,
  });
  if (fetchingShopId || loading)
    return <Loader text={t("common:text-loading")} />;
  if (error)
    return (
      <ErrorMessage message={error?.response?.data?.message || error.message} />
    );

  function handlePagination(current: any) {
    setPage(current);
  }
  return (
    <>
    <SEO title="Retraits"/>
      <Card className="flex flex-col md:flex-row items-center justify-between mb-8">
        <div className="md:w-1/4 mb-4 md:mb-0">
          <h1 className="text-lg font-semibold text-heading">
            {t("form:text-refund")}
          </h1>
        </div>

        <div className="flex items-center w-full md:w-3/4 xl:w-2/4 ms-auto">
          <SortForm
            showLabel={false}
            className="w-full"
            onSortChange={({ value }: { value: SortOrder }) => {
              setColumn(value);
            }}
            onOrderChange={({ value }: { value: string }) => {
              setStatus(value);
            }}
            options={[
              { value: "pending", label: "En attente" },
              { value: "approved", label: "Terminé" },
            ]}
          />
        </div>
      </Card>

      <RefundList refunds={data?.refunds} onPagination={handlePagination} />
    </>
  );
}
StaffsPage.authenticate = {
  permissions: adminAndOwnerOnly,
};
StaffsPage.Layout = ShopLayout;

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["table", "common", "form"])),
  },
});
