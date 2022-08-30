import { GetServerSideProps } from "next";
import { parseContextCookie } from "@utils/parse-cookie";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { SEO } from "@components/seo";
import AccountLayout from "@components/layout/account-layout";
import LinkButton from "@components/ui/link-button";
import { RepairList } from "@components/repair/repair-list";
import { useRepairsQuery } from "@data/repair/use-repairs.query";
import CommingSoon from "@components/comming-soon/comming-soon";
import { ExchangeList } from "@components/exchange/exchange-list";
import { useExchangesQuery } from "@data/exchange/use-exchanges.query";

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

export default function Exchange() {
  const { data, isLoading } = useExchangesQuery({

  });
  return (
    <>
      <SEO title="Jeux video" />
      <div className="flex flex-col xl:flex-row items-start max-w-1920 w-full mx-auto py-10 md:px-8 xl:py-14 xl:px-16 2xl:px-20 bg-gray-100">
        <div className="w-full overflow-hidden bg-white rounded-sm">
          <div className="flex justify-between">
            <h3 className="text-xl font-semibold md:py-5 text-heading px-5">
              Echange de jeux
            </h3>
          </div>
          <div className="bg-white rounded-md p-4"><ExchangeList exchanges={data?.pages[0]?.data} /></div>

        </div>
      </div>
    </>
  );
}

Exchange.Layout = AccountLayout;
