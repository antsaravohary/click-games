import Pagination from "@components/ui/pagination";
import { Table } from "@components/ui/table";
import ActionButtons from "@components/common/action-buttons";
import { formatToPrice } from "@utils/use-price";
import { Order, User } from "@ts-types/generated";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useIsRTL } from "@utils/locals";
import { formatDateComplet } from "@utils/format-date";
import { TransactionPaginator } from "@ts-types/transactions-type";

type IProps = {
  transactions: TransactionPaginator | null | undefined;
  onPagination: (current: number) => void;
};

const TransactionList = ({ transactions, onPagination }: IProps) => {
  const { data, paginatorInfo } = transactions! ?? {};
  const { t } = useTranslation();
  const rowExpandable = (record: any) => record.children?.length;
  const router = useRouter();
  const { alignLeft } = useIsRTL();

  const columns = [
    {
      title: t("table:table-item-id"),
      dataIndex: "id",
      key: "id",
      align: "center",
      width: 50,
    },
    {
      title: t("table:table-item-user"),
      dataIndex: "user",
      key: "user",
      align: "center",
      render:(user:User)=>user.name
    },
    {
      title: t("table:table-item-object"),
      dataIndex: "object",
      key: "object",
      align: "center",
    },
    {
      title: t("table:table-item-amount"),
      dataIndex: "amount",
      key: "amount",
      align: "center",
      render: (value: any) => {
        return <span>{formatToPrice(value)}</span>;
      },
    },
    {
      title: t("table:table-item-order-date"),
      dataIndex: "created_at",
      key: "created_at",
      align: "center",
      render: (date: string) => {
        return (
          <span className="whitespace-nowrap">{formatDateComplet(date)}</span>
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
          data={data}
          rowKey="id"
          scroll={{ x: 1000 }}
          expandable={{
            expandedRowRender: () => "",
            rowExpandable: rowExpandable,
          }}
        />
      </div>

      {!!paginatorInfo?.total && (
        <div className="flex justify-end items-center">
          <Pagination
            total={paginatorInfo?.total}
            current={paginatorInfo?.currentPage}
            pageSize={paginatorInfo?.perPage}
            onChange={onPagination}
          />
        </div>
      )}
    </>
  );
};

export default TransactionList;
