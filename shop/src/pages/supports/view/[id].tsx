import { parseContextCookie } from "@utils/parse-cookie";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Spinner from "@components/ui/loaders/spinner/spinner";
import Scrollbar from "@components/ui/scrollbar";
import ProfileSidebar from "@components/profile/profile-sidebar";
import NotFound from "@components/common/not-found";
import Collapse from "rc-collapse";
import { useTranslation } from "react-i18next";
import Layout from "@components/layout/layout";
import TicketCard from "@components/ticket/ticket-card";
import { fetchTicket, useTicketsQuery } from "@data/ticket/use-tickets.query";
import Button from "@components/ui/button";
import { useTicketQuery } from "@data/ticket/use-ticket.query";
import TicketShow from "@components/ticket/ticket-show";
import { useState } from "react";
import { useWindowSize } from "@utils/use-window-size";
import { SEO } from "@components/seo";
import AccountLayout from "@components/layout/account-layout";
import { PlusIcon } from "@components/icons/plus-icon";
import { useModalAction } from "@components/ui/modal/modal.context";
import { useRouter } from "next/router";

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

export default function SupportView() {
  const { t } = useTranslation("common");
  const router=useRouter();


  const { openModal } = useModalAction();
  const isMobile = useWindowSize().width < 860;
  return (
    <>
      <SEO title="Supports" />
      <div className="w-full ">
        <div className="flex flex-col xl:flex-row items-start max-w-1920 w-full mx-auto py-10 px-5 xl:py-14 xl:px-8 2xl:px-14  min-h-screen">

          <TicketShow id={router.query.id} />
        </div>
      </div>
    </>
  );
}
SupportView.Layout = AccountLayout;
