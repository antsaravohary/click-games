import Card from "@components/common/card";
import Layout from "@components/layouts/admin";
import Search from "@components/common/search";
import LinkButton from "@components/ui/link-button";
import { useState } from "react";
import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import TagList from "@components/tag/tag-list";
import { adminAndOwnerOnly, adminOnly } from "@utils/auth-utils";
import { useTagsQuery } from "@data/tag/use-tags.query";
import { SortOrder } from "@ts-types/generated";
import { OrderField } from "@ts-types/index";
import { ROUTES } from "@utils/routes";
import SortForm from "@components/common/sort-form";
import { useArticlesQuery } from "@data/article/use-articles.query";
import ArticleList from "@components/article/article-list";
import ModelMessageList from "@components/model-message/model-message-list";
import { useModelMessagesQuery } from "@data/model-message/use-model-messages.query";

export default function Articles() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [orderBy, setOrder] = useState("created_at");
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);
  const {
    data,
    isLoading: loading,
    error,
  } = useModelMessagesQuery({
    limit: 20,
    orderBy,
    sortedBy,
    text: searchTerm,
    page,
  });

  if (loading) return <Loader text={t("common:text-loading")} />;
  if (error) return <ErrorMessage message={error.message} />;

  function handleSearch({ searchText }: { searchText: string }) {
    setSearchTerm(searchText);
  }
  function handlePagination(current: any) {
    setPage(current);
  }
  return (
    <>
      <Card className="flex flex-col xl:flex-row items-center mb-8">
        <div className="md:w-1/4 mb-4 xl:mb-0">
          <h1 className="text-xl font-semibold text-heading">
            {t("common:sidebar-nav-item-article")}
          </h1>
        </div>

        <div className="w-full xl:w-3/4 flex flex-col md:flex-row space-y-4 md:space-y-0 items-center ms-auto">
          <Search onSearch={handleSearch} />

          {/**
          * 
          *  <SortForm
            className="md:ms-5"
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
          */}

          <LinkButton
            href={`${ROUTES.MODEL_MESSAGE}/create`}
            className="h-12 md:ms-6 w-full md:w-auto"
          >
            <span className="block md:hidden xl:block">
              + {t("form:button-label-add-article")}
            </span>
            <span className="hidden md:block xl:hidden">
              + {t("form:button-label-add")}
            </span>
          </LinkButton>
        </div>
      </Card>

      <ModelMessageList
        model_messages={data?.model_messages}
        onPagination={handlePagination}
      />
    </>
  );
}
Articles.authenticate = {
  permissions: adminAndOwnerOnly,
};
Articles.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["form", "common", "table"])),
  },
});
