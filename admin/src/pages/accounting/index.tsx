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
import { adminOnly } from "@utils/auth-utils";
import { useTagsQuery } from "@data/tag/use-tags.query";
import { SortOrder } from "@ts-types/generated";
import { OrderField } from "@ts-types/index";
import { ROUTES } from "@utils/routes";
import SortForm from "@components/common/sort-form";
import { useArticlesQuery } from "@data/article/use-articles.query";
import ArticleList from "@components/article/article-list";
import { RadioGroup } from "@headlessui/react";
import classNames from "classnames";
const memoryOptions = [
    { name: 'Impôt', inStock: true },
    { name: 'Tax', inStock: true },
    { name: 'Cotisation', inStock: true }]
  
export default function Accounting() {
  const { t } = useTranslation();
  const [mem, setMem] = useState(memoryOptions[2])

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [orderBy, setOrder] = useState("created_at");
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);
  const {
    data,
    isLoading: loading,
    error,
  } = useArticlesQuery({
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
       <div>
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-medium text-gray-900"></h2>
      
      </div>

      <RadioGroup value={mem} onChange={setMem} className="mt-2">
        <RadioGroup.Label className="sr-only">Choisir une option</RadioGroup.Label>
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
          {memoryOptions.map((option) => (
            <RadioGroup.Option
              key={option.name}
              value={option}
              className={({ active, checked }) =>
                classNames(
                  option.inStock ? 'cursor-pointer focus:outline-none' : 'opacity-25 cursor-not-allowed',
                  active ? 'ring-2 ring-offset-2 ring-indigo-500' : '',
                  checked
                    ? 'bg-indigo-600 border-transparent text-white hover:bg-indigo-700'
                    : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50',
                  'border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1'
                )
              }
              disabled={!option.inStock}
            >
              <RadioGroup.Label as="p">{option.name}</RadioGroup.Label>
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
    <div>

    </div>

    </>
  );
}
Accounting.authenticate = {
  permissions: adminOnly,
};
Accounting.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["form", "common", "table"])),
  },
});
