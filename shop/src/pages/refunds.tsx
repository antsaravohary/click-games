import ErrorMessage from "@components/ui/error-message";
import { GetServerSideProps } from "next";
import { parseContextCookie } from "@utils/parse-cookie";
import Spinner from "@components/ui/loaders/spinner/spinner";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { SEO } from "@components/seo";
import { useRefundsQuery } from "@data/refund/use-tickets.query";
import { RefundList } from "@components/Refund/refund-list";
import AccountLayout from "@components/layout/account-layout";

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

export default function Refunds() {
  const { isLoading: loading, data, error } = useRefundsQuery();
  if (error) return <ErrorMessage message={error.message} />;
  return (
    <>
      <SEO title="Refund" />
      <div className="flex flex-col xl:flex-row items-start max-w-1920 w-full mx-auto py-10 px-8 xl:py-14 xl:px-16 2xl:px-20 bg-gray-100">
        <div className="w-full overflow-hidden bg-white rounded-sm">
          <div className="flex justify-between">
            <h3 className="text-xl font-semibold py-5 text-heading px-5">
            Remboursement
            </h3>
          </div>
          {loading ? (
          <Spinner showText={false} />
        ) : <div className="bg-white rounded-md p-4">  <RefundList refunds={data?.pages[0].data}/></div>
          }
         
        </div>
      </div>

    </>
  );
}

Refunds.Layout = AccountLayout;
