import Layout from "@components/layout/layout";
import { parseContextCookie } from "@utils/parse-cookie";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useCustomerQuery } from "@data/customer/use-customer.query";
import { useGameSale } from "@contexts/game-sale.context";
import GameToSaleList from "@components/game/game-to-sale-list";
import SaleGameStep from "@components/game/game-sale-step";
import GameToSaleStep2 from "@components/game/game-to-sale-step2";
import GameToSaleStep3 from "@components/game/game-to-sale-step3";
import GameSaleSucucess from "@components/game/game-sale-success";
import { useState } from "react";

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

export default function Create() {
  const { data: me } = useCustomerQuery();
  const { step,clear } = useGameSale();
  const [success, setSuccess] = useState(false);
  const [refPurchase, setRefPurchase] = useState("");
  if (success) {
    return (
      <div className="max-w-2xl mx-auto p-4 sm:px-6 lg:px-8 mt-5 bg-white">
        <GameSaleSucucess refPurchase={refPurchase} />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 sm:px-6 lg:px-8 mt-5 bg-white">
      <SaleGameStep step={step} />
      {step === 1 && <GameToSaleList />}
      {step === 2 && <GameToSaleStep2 />}
      {step === 3 && (
        <GameToSaleStep3
          onSuccess={(ref) => {
            console.log("on success");
            setRefPurchase(ref);
            setSuccess(true);
            clear();
          }}
        />
      )}
    </div>
  );
}
Create.Layout = Layout;
