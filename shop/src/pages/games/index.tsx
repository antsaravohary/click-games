import Layout from "@components/layout/layout";
import ProfileSidebar from "@components/profile/profile-sidebar";
import ProfileForm from "@components/profile/profile-form";
import { useCustomerQuery } from "@data/customer/use-customer.query";
import ErrorMessage from "@components/ui/error-message";
import Address from "@components/address/address";
import Card from "@components/ui/card";
import { GetServerSideProps } from "next";
import { parseContextCookie } from "@utils/parse-cookie";
import Spinner from "@components/ui/loaders/spinner/spinner";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { SEO } from "@components/seo";
import { useRefundsQuery } from "@data/refund/use-tickets.query";
import { RefundList } from "@components/Refund/refund-list";
import AccountLayout from "@components/layout/account-layout";
import { GamePurchaseList } from "@components/game/game-purchase-list";
import LinkButton from "@components/ui/link-button";
import { usePurchasesQuery } from "@data/purchase-game/use-purchases.query";
import CommingSoon from "@components/comming-soon/comming-soon";

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

export default function Games() {
  const {data}=usePurchasesQuery({limit:30});
  return <><CommingSoon title={"Le service de vente"} description={""}/></>
  return (
    <>
      <SEO title="Jeux video" />
      <div className="flex flex-col xl:flex-row items-start max-w-1920 w-full mx-auto py-10 px-8 xl:py-14 xl:px-16 2xl:px-20 bg-white">
        <div className="w-full overflow-hidden">
          <div className="flex justify-between">
          <h3 className="text-xl font-semibold py-5 text-heading px-5">
            Ventes
          </h3>
          <LinkButton href={"/games/sale"}>Nouvelle vente</LinkButton>
          </div>
        
          <GamePurchaseList purchases={data?.pages[0].data} />
        </div>
      </div>
    </>
  );
}

Games.Layout = AccountLayout;
