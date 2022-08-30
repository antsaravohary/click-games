import Layout from "@components/layout/layout";
import { parseContextCookie } from "@utils/parse-cookie";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useCustomerQuery } from "@data/customer/use-customer.query";
import { useGameSale } from "@contexts/game-sale.context";
import GameToSaleList from "@components/game/game-to-sale-list";
import GameSaleSucucess from "@components/game/game-sale-success";
import { useState } from "react";
import RepairCreateStep1 from "@components/repair/repair-create-step1";
import RepairStep from "@components/repair/repair-step";
import RepairCreateStep2 from "@components/repair/repair-create-step2";
import { useRepair } from "@contexts/repair.context";
import RepairCreateStep3 from "@components/repair/repair-create-step3";
import CreateSucucess from "@components/repair/create-success";

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
  const { step, clear } = useRepair();
  const [success, setSuccess] = useState(false);
  const [repair, setRepair] = useState({});
  if (success) {
    return (
      <div className="max-w-2xl mx-auto p-4 sm:px-6 lg:px-8 mt-5 bg-white">
        <CreateSucucess repair={repair} />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4 sm:px-6 lg:px-8 mt-5 bg-white">
      <RepairStep step={step} />
      {step === 1 && <RepairCreateStep1 />}
      {step === 2 && <RepairCreateStep2 />}
      {step === 3 && (
        <RepairCreateStep3
          onSuccess={(r: any) => {
            clear();
            setSuccess(true);
            setRepair(r);
          }}
        />
      )}
    </div>
  );
}
Create.Layout = Layout;
