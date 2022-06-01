import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Scrollbar from "@components/ui/scrollbar";
import { useTranslation } from "react-i18next";
import TicketCard from "@components/ticket/ticket-card";
import { useTicketsQuery } from "@data/ticket/use-tickets.query";
import TicketShow from "@components/ticket/ticket-show";
import { useState } from "react";
import { useWindowSize } from "@utils/use-window-size";
import { useShopQuery } from "@data/shop/use-shop.query";
import { useRouter } from "next/router";
import { adminOwnerAndStaffOnly } from "@utils/auth-utils";
import ShopLayout from "@components/layouts/shop";
import { SEO } from "@components/seo";
import AdminLayout from "@components/layouts/admin";

export default function SupportPage() {
  const { t } = useTranslation("common");
  const [ticketActive, setTicketActive] = useState("NONE");
  const {
    query: { shop },
  } = useRouter();
  const { data: shopData, isLoading: fetchingShop } = useShopQuery(
    shop as string
  );

  const shopId = shopData?.shop?.id!;
  const {
    data: ticketData,
    isFetching: loading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage: loadingMore,
  } = useTicketsQuery({
    shop_id: shopId,
  });

  const isMobile = useWindowSize().width < 860;
  console.log(isMobile);
  return (
    <>
      <SEO title="Supports" />
      <div className="w-full overflow-hidden flex ">
        {(!isMobile || (isMobile && ticketActive === "NONE")) && (
          <div
            className={`pe-2 lg:pe-2 w-full flex `}
            style={{ height: "calc(100vh - 60px)" }}
          >
            <div
              className={`flex w-full flex-col h-full pb-5 md:border md:border-border-200 `}
            >
              <h3 className="text-xl font-semibold py-5 text-heading px-5">
                Mes litiges
              </h3>
              <Scrollbar
                className="w-full px-4 "
                style={{ height: "calc(100% - 80px)" }}
              >
                <ul className="p-2">
                  {ticketData?.tickets?.data?.map((ticket) => (
                    <TicketCard
                      key={ticket.id}
                      ticket={ticket}
                      ticketActive={ticketActive}
                      setActive={setTicketActive}
                    />
                  ))}
                </ul>
              </Scrollbar>
            </div>
          </div>
        )}
        {(!isMobile || (isMobile && ticketActive !== "NONE")) && (
          <div
            className={`flex flex-3 flex-col w-full   border border-border-200`}
          >
            {ticketActive === "NONE" ? (
              <div className="flex justify-center border p-8 items-center h-full">
                Veuillez sélectionnez un litige
              </div>
            ) : (
              <TicketShow
                id={ticketActive}
                isMobile={isMobile}
                go_back={() => setTicketActive("NONE")}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
}
SupportPage.authenticate = {
  permissions: adminOwnerAndStaffOnly,
};
SupportPage.Layout = AdminLayout;

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["table", "common", "form"])),
  },
});
