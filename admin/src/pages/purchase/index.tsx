import Card from "@components/common/card";
import Layout from "@components/layouts/admin";
import Search from "@components/common/search";
import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import { SortOrder } from "@ts-types/generated";
import { useEffect, useState } from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import SortForm from "@components/common/sort-form";
import CategoryTypeFilter from "@components/product/category-type-filter";
import cn from "classnames";
import { ArrowDown } from "@components/icons/arrow-down";
import { ArrowUp } from "@components/icons/arrow-up";
import { SEO } from "@components/seo";
import RepairList from "@components/repair/repair-list";

import { useRepairsQuery } from "@data/repair/use-repairs.query";
import { useModalAction } from "@components/ui/modal/modal.context";
import { QrCodeIcon } from "@components/icons/qr-code";
import { useRouter } from "next/router";
import { ROUTES } from "@utils/routes";
import { usePurchasesQuery } from "@data/purchase/use-purchases.query";
import PurchaseList from "@components/purchase/purchase-list";

export default function PurchasePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [type, setType] = useState("");
  const router = useRouter();
  const [page, setPage] = useState(1);
  const { t } = useTranslation();
  const [orderBy, setOrder] = useState("created_at");
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    setVisible((v) => !v);
  };

  const { openModal } = useModalAction();

  const {
    data,
    isLoading: loading,
    error,
  } = usePurchasesQuery({
    limit: 20,
    page,
    type,
    text: searchTerm,
    orderBy,
    sortedBy,
  });
  useEffect(() => {
    if (data?.repairs?.data?.length === 1) {
      router.push(ROUTES.REPAIR + "/" + data?.repairs?.data[0]?.id);
    }
  });

  if (loading) return <Loader text={t("common:text-loading")} />;
  if (error) return <ErrorMessage message={error.message} />;

  function handleSearch({ searchText }: { searchText: string }) {
    setSearchTerm(searchText);
    setPage(1);
  }
  function handlePagination(current: any) {
    setPage(current);
  }
  return (
    <>
      <SEO title="Produits" />
      <Card className="flex flex-col mb-8">
        <div className="w-full flex flex-col md:flex-row items-center">
          <div className="md:w-1/4 mb-4 md:mb-0">
            <h1 className="text-lg font-semibold text-heading">
              {t("form:input-label-repair")}
            </h1>
          </div>

          <div className="w-full md:w-3/4 flex space-x-2 items-center ms-auto">
            <Search onSearch={handleSearch} />
            <button
              onClick={() => {
                openModal("QR_READER_MODAL", {
                  data: {
                    onSuccess: (e) => {
                      setSearchTerm(e);
                    },
                  },
                });
              }}
            >
              <QrCodeIcon width={32} height={32} />
            </button>
          </div>

          <button
            className="text-accent text-base font-semibold flex items-center md:ms-5 mt-5 md:mt-0"
            onClick={toggleVisible}
          >
            {t("common:text-filter")}{" "}
            {visible ? (
              <ArrowUp className="ms-2" />
            ) : (
              <ArrowDown className="ms-2" />
            )}
          </button>
        </div>

        <div
          className={cn("w-full flex transition", {
            "h-auto visible": visible,
            "h-0 invisible": !visible,
          })}
        >
          <div className="flex flex-col md:flex-row md:items-center mt-5 md:mt-8 border-t border-gray-200 pt-5 md:pt-8 w-full">
            <CategoryTypeFilter
              className="w-full md:w-2/3 md:mr-5"
              onCategoryFilter={({ slug }: { slug: string }) => {
                setCategory(slug);
              }}
              onTypeFilter={({ slug }: { slug: string }) => {
                setType(slug);
              }}
            />
            <SortForm
              className="w-full md:w-1/3 mt-5 md:mt-0"
              onSortChange={({ value }: { value: SortOrder }) => {
                setColumn(value);
              }}
              onOrderChange={({ value }: { value: string }) => {
                setOrder(value);
              }}
              options={[
                { value: "name", label: "Nom" },
                { value: "price", label: "Prix" },
                { value: "max_price", label: "Maximum Prix" },
                { value: "mix_price", label: "Minimum Prix" },
                { value: "sale_price", label: "Prix de vente" },
                { value: "quantity", label: "Quantité" },
                { value: "created_at", label: "Crée le" },
                { value: "updated_at", label: "Dernière mise à jour" },
              ]}
            />
          </div>
        </div>
      </Card>

      <PurchaseList purchases={data.purchases} onPagination={handlePagination} />
    </>
  );
}
PurchasePage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["table", "common", "form"])),
  },
});
