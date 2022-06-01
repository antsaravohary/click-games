import Pagination from "@components/ui/pagination";
import { Table } from "@components/ui/table";
import ActionButtons from "@components/common/action-buttons";
import { useTranslation } from "next-i18next";
import { useIsRTL } from "@utils/locals";
import { adminOnly, getAuthCredentials, hasAccess } from "@utils/auth-utils";
import { ROUTES } from "@utils/routes";
import { useRouter } from "next/router";
import { ContactPaginator } from "@ts-types/contact-type";
import Button from "@components/ui/button";
import { useUpdateContactMutation } from "@data/contact/use-contact-update.mutation";

type IProps = {
  contacts: ContactPaginator | null | undefined;
  onPagination: (current: number) => void;
};

const ContactList = ({ contacts, onPagination }: IProps) => {
  const { t } = useTranslation();
  const { alignLeft } = useIsRTL();

  const router = useRouter();

  let columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: alignLeft,
    },
    {
      title: t("Nom et prénoms"),
      dataIndex: "name",
      key: "name",
      align: alignLeft,
    },
    {
      title: t("Email suite au premier contact"),
      dataIndex: "first_contact",
      key: "first_contanct",

      align: alignLeft,

      render: (first_contant: boolean) => (first_contant ? "OK" : "NON"),
    },

    {
      title: t("table:table-item-actions"),
      dataIndex: "id",
      key: "actions",
      align: "center",
      render: (id: string, contact: any) => {
        const { mutate: update,isLoading} = useUpdateContactMutation();
        return (
          <Button disabled={isLoading} loading={isLoading}
            onClick={() => {
              update({
                variables: {
                  id: id,
                  input: {
                    action: "send_first_email",
                  },
                },
              });
            }}
          >
            {!contact.first_contact ? "Envoyer" : "Renvoyer"}
          </Button>
        );
      },
    },
  ];
  return (
    <>
      <div className="rounded overflow-hidden shadow mb-6">
        <Table
          //@ts-ignore
          columns={columns}
          emptyText={t("table:empty-table-data")}
          data={contacts?.data}
          rowKey="id"
          scroll={{ x: 800 }}
        />
      </div>

      {!!contacts?.paginatorInfo.total && (
        <div className="flex justify-end items-center">
          <Pagination
            total={contacts?.paginatorInfo.total}
            current={contacts?.paginatorInfo.currentPage}
            pageSize={contacts?.paginatorInfo.perPage}
            onChange={onPagination}
          />
        </div>
      )}
    </>
  );
};

export default ContactList;
