import { Table } from "@components/ui/table";
import ActionButtons from "@components/common/action-buttons";
import { useTranslation } from "next-i18next";
import { useIsRTL } from "@utils/locals";
import usePrice from "@utils/use-price";
import { formatAddress } from "@utils/format-address";
import { useRouter } from "next/router";
import { formatDateFromNow } from "@utils/format-date";
import { status_repair } from "@utils/data";
import { Exchange, ExchangePaginator } from "@ts-types/exchanges-type";
import { User } from "@ts-types/generated";
import { status_exchange } from "./data-exchange";

export type IProps = {
  exchanges: Exchange[] | undefined;
  onPagination: ExchangePaginator;
};

const ExchangeList = ({ exchanges, onPaginate }: IProps) => {
  console.log("exchanges",exchanges);
  const { t } = useTranslation();
  const { alignLeft, alignRight } = useIsRTL();
  const router = useRouter();
  const columns = [
    {
      title: t("table:table-item-ref"),
      dataIndex: "ref",
      key: "ref",
      align:alignLeft,
      width: 150,
    },
    {
      title: t("table:table-item-user"),
      dataIndex: "user",
      key: "user",
      align: alignLeft,
      render:(user:User)=>user?.name
    },
    {
      title: t("Produit"),
      dataIndex: "shop_product",
      key: "customer_product",
      align: alignLeft,
      render: (e,p) => (<span>{p?.shop_product?.name} {"<=>"} {p?.customer_product?.product?.name}</span>)
    },
    {
      title: t("table:table-item-amount"),
      dataIndex: "amount",
      key: "amount",
      align: "center",
      width: 120,
      render: (value: any) => {
        const { price } = usePrice({
          amount: value,
        });
        return <span className="whitespace-nowrap">{price}</span>;
      },
    },
    {
      title: t("table:table-item-repair-date"),
      dataIndex: "created_at",
      key: "created_at",
      align: "center",
      render: (date: string) => {
        return (
          <span className="whitespace-nowrap">{formatDateFromNow(date)}</span>
        );
      },
    },
    {
      title: t("table:table-item-status"),
      dataIndex: "status",
      key: "status",
      align: alignLeft,
      render: (status: string) => <span>{status_exchange[status]?.label}</span>,
    },
    {
      title: "Détails",
      dataIndex: "id",
      key: "actions",
      align: "center",
      width: 100,
      render: (id: string) => (
        <ActionButtons id={id} detailsUrl={`${router.asPath}/${id}`} />
      ),
    },
  ];
  return (
    <div className="rounded overflow-hidden shadow mb-8">
      {/* @ts-ignore */}
      <Table
        columns={columns}

        emptyText={t("table:empty-table-data")}
        data={exchanges}
        rowKey="id"
        scroll={{ x: 380 }}
      />
    </div>
  );
};

export default ExchangeList;
