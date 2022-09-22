import { Table } from "@components/ui/table";
import ActionButtons from "@components/common/action-buttons";
import { useTranslation } from "next-i18next";
import { useIsRTL } from "@utils/locals";
import Pagination from "@components/ui/pagination";
import { UserPaginator } from "@ts-types/generated";
import { useRouter } from "next/router";

type IProps = {
  staffs: UserPaginator | null | undefined;
  onPagination: (current: number) => void;
};

const StaffList = ({ staffs, onPagination }: IProps) => {
  const { t } = useTranslation();
  const { alignLeft, alignRight } = useIsRTL();
  const { data, paginatorInfo } = staffs!;
  const router =useRouter();
  const columns = [
    {
      title: t("table:table-item-title")+"s",
      dataIndex: "name",
      key: "name",
      align: alignLeft,
    },
    {
      title: t("table:table-item-email"),
      dataIndex: "email",
      key: "email",
      align: alignLeft,
    },
    {
      title: t("table:table-item-status"),
      dataIndex: "is_active",
      key: "is_active",
      align: "center",
      render: (is_active: boolean) =>
        is_active ? t("common:text-active") : t("common:text-inactive"),
    },
    {
      title: "Boutiques",
      dataIndex: "managed_shops",
      key: "managed_shops",
      align: "center",
      render: (managed_shops: any) =>
         <span>{managed_shops.map((shop: { name: any; })=><span className="mx-1 border bg-accent rounded p-1 text-white">{shop.name}</span>)}</span> 
    },
    {
      title: t("table:table-item-actions"),
      dataIndex: "id",
      key: "actions",
      align: alignRight,
      render: (id: string) => {
        return <ActionButtons
         id={id} deleteModalView="DELETE_STAFF"
         editUrl={`${router.asPath}/${id}`}
         />;
      },
    },
  ];

  return (
    <>
      <div className="rounded overflow-hidden shadow mb-6">
        <Table
          // @ts-ignore
          columns={columns}
          emptyText={t("table:empty-table-data")}
          data={data!}
          rowKey="id"
          scroll={{ x: 800 }}
        />
      </div>
      {!!paginatorInfo.total && (
        <div className="flex justify-end items-center">
          <Pagination
            total={paginatorInfo.total}
            current={paginatorInfo.currentPage}
            pageSize={paginatorInfo.perPage}
            onChange={onPagination}
            showLessItems
          />
        </div>
      )}
    </>
  );
};

export default StaffList;
