import Card from "@components/common/card";
import ErrorMessage from "@components/ui/error-message";
import Loader from "@components/ui/loader/loader";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Layout from "@components/layouts/admin";
import { adminOnly } from "@utils/auth-utils";
import { useState } from "react";
import { SortOrder } from "@ts-types/generated";
import { useContactsQuery } from "@data/contact/use-contacts.query";
import ContactList from "@components/erp-mailling/contact-list";
import Search from "@components/common/search";
import StatusTypeFilter from "@components/erp-mailling/status-type-filter";
import LinkButton from "@components/ui/link-button";

export default function ErpMaillingPage() {

  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [first_contact, setFirst_contact] = useState<boolean>();
  const [orderBy, setOrder] = useState("created_at");
  const [sortedBy, setColumn] = useState<SortOrder>(SortOrder.Desc);
  function handleSearch({ searchText }: { searchText: string }) {
    setSearchTerm(searchText);
    setPage(1);
  }
  const {
    data,
    isLoading: loading,
    error,
  } = useContactsQuery({
    limit: 10,
    text:searchTerm,
    first_contact:first_contact,
    page,
    sortedBy,
    orderBy,
  });

  if (loading) return <Loader text={t("common:text-loading")} />;
  if (error) return <ErrorMessage message={error.message} />;

  function handlePagination(current: any) {
    setPage(current);
  }
  return (
    <>
      <Card className="flex flex-col md:flex-row items-center justify-between mb-8">
        <div className="md:w-1/4 mb-4 md:mb-0">
          <h1 className="text-lg font-semibold text-heading">
            {t("common:sidebar-nav-item-erp-mailling")}
          </h1>
        </div>
      </Card>
      <div className="w-full justify-center flex flex-col md:flex-row items-center ms-auto mb-4">
        <Search onSearch={handleSearch} />
        <StatusTypeFilter
          onStatusFilter={(e) => setFirst_contact(e.value)}
        />
        <LinkButton
            href="/erp-mailling/create"
            className="h-12 md:ms-6 w-full md:w-auto"
          >
           
            <span className="block">
              + {t("form:button-label-add")}
            </span>
          </LinkButton>
      </div>
      <ContactList contacts={data?.contacts} onPagination={handlePagination} />
    </>
  );
}
ErpMaillingPage.authenticate = {
  permissions: adminOnly,
};
ErpMaillingPage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["table", "common", "form"])),
  },
});
