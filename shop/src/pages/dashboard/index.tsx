import { GetServerSideProps } from "next";
import { parseContextCookie } from "@utils/parse-cookie";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import AccountLayout from "@components/layout/account-layout";
import DashboardHead from "@components/dashboard/dashboard-head";
import CardInfo from "@components/dashboard/card-info";
import { OrderIcon } from "@components/icons/order-icon";
import TransactionList from "@components/transaction/transaction-list";
import { DollarIcon, RepairIcon } from "@components/icons/sidebar";
import { formatToPrice } from "@utils/use-price";
import { useCustomerQuery } from "@data/subscription/use-customer.query";
import { useDashboardInfoQuery } from "@data/dashboard/use-dashboard-info.query";
import { useTransactionsQuery } from "@data/transaction/use-transactions.query";
import { ROUTES } from "@utils/routes";

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const cookies = parseContextCookie(context?.req?.headers?.cookie);
  if (!cookies?.auth_token) {
    return { redirect: { destination: "/", permanent: false } };
  }
  return {
    props: {
      ...(await serverSideTranslations(context.locale, ["common", "forms"])),
    },
  };
};

export default function dashboardPage() {
  const { data: dataMe } = useCustomerQuery();
  const { data: info } = useDashboardInfoQuery();
  const { data: transacations } = useTransactionsQuery({
    limit: 10,
    orderBy: "created_at",
    sortedBy: "DESC",
  });
  return (
    <>
      <DashboardHead />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-lg leading-6 font-medium text-gray-900 mt-5">
          Aperçu
        </h2>
        <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <CardInfo
            icon={<DollarIcon className="h-6 w-6 text-gray-400" />}
            text={dataMe?.me?.balance?.current_balance>1?"Soldes":"Solde"}
            value={formatToPrice(dataMe?.me?.balance?.current_balance)}
          />
          <CardInfo
            icon={<OrderIcon className="h-6 w-6 text-gray-400" />}
            text={info?.info?.total_order>1?"Commandes en cours":"Commande en cours"}
            value={info?.info?.total_order}
            href={ROUTES.ORDERS}
          />

          <CardInfo
            icon={<RepairIcon className="h-6 w-6 text-gray-400" />}
            text={info?.info?.total_repair>1?"Réparations en cours":"Réparation en cours"}
            value={info?.info?.total_repair}
            href={ROUTES.REPAIR}
          />
        </div>
        <h2 className="text-lg leading-6 font-medium text-gray-900 mt-5">
          Dernière transactions
        </h2>
        <div className="bg-white border rounded-md shadow ">
          <TransactionList transactions={transacations} />
        </div>
      </div>
    </>
  );
}

dashboardPage.Layout = AccountLayout;
