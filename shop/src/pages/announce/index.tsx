import { useEffect, useState, Fragment } from "react";
import Layout from "@components/layout/layout";
import ProfileSidebar from "@components/profile/profile-sidebar";
import OrderCard from "@components/order/order-card";
import ErrorMessage from "@components/ui/error-message";
import OrderDetails from "@components/order/order-details";
import Collapse, { Panel } from "rc-collapse";
import "rc-collapse/assets/index.css";
import { GetServerSideProps } from "next";
import { parseContextCookie } from "@utils/parse-cookie";
import Spinner from "@components/ui/loaders/spinner/spinner";
import Scrollbar from "@components/ui/scrollbar";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { useOrdersQuery } from "@data/order/use-orders.query";
import Button from "@components/ui/button";
import NotFound from "@components/common/not-found";
import { useProductsQuery } from "@data/product/use-products.query";
import ProductList from "@components/product/product-list";
import SortForm from "@components/common/sort-form";
import { SortOrder } from "@ts-types/generated";
import { ArrowUp } from "@components/icons/arrow-up";
import { ArrowDown } from "@components/icons/arrow-down";
import Card from "@components/ui/card";
import cn from "classnames";
import LinkButton from "@components/ui/link-button";
import { ROUTES } from "@utils/routes";
import SearchInput from "@components/common/search-input";
import { useCustomerQuery } from "@data/customer/use-customer.query";
import Loader from "@components/ui/loader/loader";

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

export default function AnnouncePage() {
  const { t } = useTranslation("common");
  const [page, setPage] = useState<number>(1);
  const [column, setColumn] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [order, setOrder] = useState<string>("");
  const {
    data:dataMe,
    isLoading: loadingMe,
    error: errorMe,
  } = useCustomerQuery();
  console.log("me",dataMe);
  const { data, fetchNextPage, fetchPreviousPage, isLoading } =
    useProductsQuery({
      text: text,
      limit: 6,
      user_id:dataMe?.me?.id,
      page: page,
    });
  const handlePaginate = (current: number) => {
    setPage(current);
  };
  if (errorMe) return <ErrorMessage message={errorMe.message} />;
  if (loadingMe) {
    return (
      <>
        <Loader />
      </>
    );
  }

  return (
    <div className="w-full bg-light">
      <div className="flex flex-col xl:flex-row items-start  w-full  py-10 px-5 xl:py-14 xl:px-8 2xl:px-14  min-h-screen">
        <ProfileSidebar className="flex-shrink-0 hidden xl:block xl:w-80 me-8" />
        <div className="w-full">
          <Card className="flex flex-col xl:flex-row items-center mb-8">
            <div className="md:w-1/4 mb-4 xl:mb-0">
              <h1 className="text-xl font-semibold text-heading">
                Mes annonces
              </h1>
            </div>

            <div className="w-full xl:w-3/4 flex flex-col md:flex-row space-y-2 md:space-y-0 items-center ms-auto">
              <SearchInput onSearch={(e) => setText(e?.searchText)} />
              <LinkButton
                href={`announce/create/`}
                className="h-12 md:ms-6 w-full md:w-auto"
              >
                <span className="block md:hidden xl:block">
                  + {t("text-add")} une annonces
                </span>
                <span className="hidden md:block xl:hidden">
                  + {t("text-add")}
                </span>
              </LinkButton>
            </div>
          </Card>
          <ProductList
          isLoading={isLoading}
            products={data?.pages ? data?.pages[0] : null}
            onPagination={handlePaginate}
          />
        </div>
      </div>
    </div>
  );
}

AnnouncePage.Layout = Layout;
