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
import { SupportTicketLit } from "@components/support/support-ticket-list";

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

export default function SupportPage() {
  const { t } = useTranslation("common");
  const [ticketActive, setTicketActive] = useState("NONE");
  const {
    data,
    isFetching: loading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage: loadingMore,
  } = useTicketsQuery();
  console.log("data",data);
  const {openModal}=useModalAction();
  const isMobile = useWindowSize().width < 860;
  return (
    <>
      <SEO title="Supports" />
      <div className="flex flex-col xl:flex-row items-start max-w-1920 w-full mx-auto py-10 md:px-8 xl:py-14 xl:px-16 2xl:px-20 bg-gray-100">
        <div className="w-full overflow-hidden bg-white rounded-sm">
          <div className="flex justify-between">
            <h3 className="text-xl font-semibold md:py-5 text-heading px-5">
             Aide support
            </h3>
          </div>
          <div className="bg-white rounded-md p-4"><SupportTicketLit tickets={data?.pages[0]?.data} /></div>

        </div>
      </div>
    </>
  );
}
SupportPage.Layout = AccountLayout;
