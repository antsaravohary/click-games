import Card from "@components/common/card";
import Layout from "@components/layouts/admin";
import Search from "@components/common/search";
import ErrorMessage from "@components/ui/error-message";
import LinkButton from "@components/ui/link-button";
import Loader from "@components/ui/loader/loader";
import { Category, SortOrder } from "@ts-types/generated";
import { useState } from "react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ROUTES } from "@utils/routes";
import SortForm from "@components/common/sort-form";
import BrandList from "@components/brand/brand-list";
import { useBrandsQuery } from "@data/brand/use-brands.query";
import CategoryChoice from "@components/category/category-choice";
import SelectInput from "@components/ui/select-input";
import Select from "@components/ui/select/select";

export default function TypesPage() {
  const { t } = useTranslation();
  const [orderBy, setOrder] = useState("created_at");
  const [category, setCategory] = useState<Category[] | null>(null);
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);
  const [type, setType] = useState<{ label: string; value: string }>({
    label: "Console",
    value: "console",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data,
    isLoading: loading,
    error,
  } = useBrandsQuery({
    text: searchTerm,
    type: type?.value,
    category_id: category ? category[1].id : null,
    orderBy,
    sortedBy,
  });

  if (loading) return <Loader text={t("common:text-loading")} />;
  if (error) return <ErrorMessage message={error.message} />;
  function handleSearch({ searchText }: { searchText: string }) {
    setSearchTerm(searchText);
  }
  return (
    <>
      <Card className="flex flex-col xl:flex-row items-center mb-8">
        <div className="md:w-1/4 mb-4 xl:mb-0">
          <h1 className="text-xl font-semibold text-heading">
            {t("common:sidebar-nav-item-brand")}
          </h1>
        </div>

        <div className="w-full xl:w-3/4 flex flex-col md:flex-row space-y-4 md:space-y-0 items-center ms-auto">
          <Search onSearch={handleSearch} />
          <div className="ml-2 w-2/4">
            {" "}
            <Select
              onChange={(e: { label: string; value: string }) => setType(e)}
              value={type}
              options={[
                {
                  label: "Console",
                  value: "console",
                },
                {
                  label: "Télephone",
                  value: "telephone",
                },
              ]}
              name="orderBy"
              placeholder={"type"}
            />
          </div>

          <SortForm
            className="md:ms-5 hidden"
            showLabel={false}
            onSortChange={({ value }: { value: SortOrder }) => {
              setColumn(value);
            }}
            onOrderChange={({ value }: { value: string }) => {
              setOrder(value);
            }}
            options={[
              { id: 1, value: "name", label: "Name" },
              { id: 2, value: "created_at", label: "Created At" },
              { id: 2, value: "updated_at", label: "Updated At" },
            ]}
          />

          <LinkButton
            href={`${ROUTES.BRAND}/create`}
            className="h-12 md:ms-6 w-full md:w-auto"
          >
            <span className="block md:hidden xl:block">
              + {t("form:button-label-add-brand")}
            </span>
            <span className="hidden md:block xl:hidden">
              + {t("form:button-label-add")}
            </span>
          </LinkButton>
        </div>
      </Card>
      <BrandList brands={data?.brands.data} />
    </>
  );
}

TypesPage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["table", "common", "form"])),
  },
});
