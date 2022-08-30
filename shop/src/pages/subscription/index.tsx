import "rc-collapse/assets/index.css";
import { GetServerSideProps } from "next";
import { parseContextCookie } from "@utils/parse-cookie";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import AccountLayout from "@components/layout/account-layout";
import { CheckMark } from "@components/icons/checkmark";
import { PlusIcon } from "@components/icons/plus-icon";
import { formatToPrice } from "@utils/use-price";
import SubscriptionDetail from "@components/subscription/subscription-detail";
import { SEO } from "@components/seo";

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const cookies = parseContextCookie(context?.req?.headers?.cookie);
  if (!cookies?.auth_token) {
    return { redirect: { destination: "/", permanent: false } };
  }
  return {
    props: {
      ...(await serverSideTranslations(context.locale, ["common"])),
    },
  };
};
const checklist = [
  'Commission',
  'Parrainage',
  'Prix reduit',
  'Reparer vos console',
  'Vendre jeux',
  '14 jour d\'essaie',
]
export default function SubscribePage() {
 
  return (
    <>
    <SEO title="Abonnement" />
    <div className="flex flex-col xl:flex-row items-start max-w-1920 w-full mx-auto py-10 md:px-8 xl:py-14 xl:px-16 2xl:px-20 bg-gray-100">
      <div className="w-full overflow-hidden bg-white rounded-sm">
        <SubscriptionDetail/>

      </div>
    </div>
  </>
  );
}

SubscribePage.Layout = AccountLayout;
