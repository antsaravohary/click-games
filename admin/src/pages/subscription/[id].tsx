import Card from "@components/common/card";
import Layout from "@components/layouts/admin";
import Search from "@components/common/search";
import LinkButton from "@components/ui/link-button";
import { useState } from "react";
import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ROUTES } from "@utils/routes";
import { SEO } from "@components/seo";
import SubscriptionList from "@components/subscription-admin/subscription-list";
import { useSubscriptionQuery } from "@data/subscription/use-subscription.query";
import { useRouter } from "next/router";
import { formatDate, formatDateComplet } from "@utils/format-date";
import { useTransactionsQuery } from "@data/transaction/use-transactions.query";
import { Transaction } from "@ts-types/transactions-type";
import { formatToPrice } from "@utils/use-price";
import { PDFDownloadLink } from "@react-pdf/renderer";
import SubscriptionTransactionPdf from "@components/subscription-admin/subscription-transaction-pdf";
import { useOrderQuery } from "@data/order/use-order.query";
import SubscriptionPaymentList from "@components/subscription-admin/subscription-payment-list";

export default function Subscriptions() {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const { t } = useTranslation();
  const router = useRouter();
  const {
    data,
    isLoading: loading,
    error,
  } = useSubscriptionQuery(router.query.id as string);

  if (loading) return <Loader text={t("common:text-loading")} />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <>
      <SEO title="Abonnement" />
      <Card className=" md:flex-row items-center mb-8">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Abonnement d'utilisateur
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Personal details and application.
          </p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Utilisateur</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {data?.subscription?.user?.name}
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">E-mail</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {data?.subscription?.user?.email}
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Abonnement</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {data?.subscription?.type}
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Periode</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {formatDateComplet(data?.subscription?.current_period_start)} au{" "}
                {formatDateComplet(data?.subscription?.current_period_end)}
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Status</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {data?.subscription?.status ? "Active" : "Expiré"}
              </dd>
            </div>
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Paiement</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
   
                  <SubscriptionPaymentList subscription={data?.subscription} />
              
              </dd>
            </div>
          </dl>
        </div>
      </Card>
    </>
  );
}
Subscriptions.Layout = Layout;

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "form"])),
  },
});
