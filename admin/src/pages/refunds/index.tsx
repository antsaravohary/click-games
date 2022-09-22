import Card from "@components/common/card";
import Loader from "@components/ui/loader/loader";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { adminAndOwnerOnly } from "@utils/auth-utils";
import ErrorMessage from "@components/ui/error-message";
import { useShopQuery } from "@data/shop/use-shop.query";
import { useState } from "react";
import { SortOrder } from "@ts-types/generated";
import SortForm from "@components/common/sort-form";
import { useRefundsQuery } from "@data/refund/use-refunds.query";
import RefundList from "@components/refund/refund-list";
import AdminLayout from "@components/layouts/admin";
import { SEO } from "@components/seo";

export default function StaffsPage() {
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<string>("pending");
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);

  const {
    data,
    isLoading: loading,
    error,
  } = useRefundsQuery({
    page,
    status,
    sortedBy,
  });
  if ( loading)
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
    <SEO title="Remboursements"/>
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

      <RefundList refunds={data?.refunds} onPagination={handlePagination} is_admin={true} />
    </>
  );
}
StaffsPage.authenticate = {
  permissions: adminAndOwnerOnly,
};
StaffsPage.Layout = AdminLayout;

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["table", "common", "form"])),
  },
});
