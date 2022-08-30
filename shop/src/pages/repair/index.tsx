import { GetServerSideProps } from "next";
import { parseContextCookie } from "@utils/parse-cookie";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { SEO } from "@components/seo";
import AccountLayout from "@components/layout/account-layout";
import LinkButton from "@components/ui/link-button";
import { RepairList } from "@components/repair/repair-list";
import { useRepairsQuery } from "@data/repair/use-repairs.query";
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

export default function Repair() {
  const {data,isLoading}=useRepairsQuery({

  });
  return <><CommingSoon title={"Service de réparation"} description={""}/></>
  return (
    <>
      <SEO title="Jeux video" />
      <div className="flex flex-col xl:flex-row items-start max-w-1920 w-full mx-auto py-10 px-8 xl:py-14 xl:px-16 2xl:px-20 bg-white">
        <div className="w-full overflow-hidden">
          <div className="flex justify-between">
          <h3 className="text-xl font-semibold py-5 text-heading px-5">
           Reparation des consoles
          </h3>
          <LinkButton href={"/repair/create"}>Reparer mon console</LinkButton>
          </div>
        
          <RepairList repairs={data?.pages[0]?.data} />
        </div>
      </div>
    </>
  );
}

Repair.Layout = AccountLayout;
