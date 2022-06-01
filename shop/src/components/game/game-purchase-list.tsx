import PriceView from "@components/common/price-view";
import { useModalAction } from "@components/ui/modal/modal.context";
import { Table } from "@components/ui/table";
import { status_purchase } from "@utils/data";
import { useIsRTL } from "@utils/locals";
import { ROUTES } from "@utils/routes";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { Link } from "..";

export const GamePurchaseList = ({ purchases }: { purchases: any }) => {
  const { t } = useTranslation("common");
  const { alignLeft, alignRight } = useIsRTL();
  const { openModal } = useModalAction();

  const refundTableColumns = [
    {
      title: t("ref"),
      dataIndex: "ref",
      key: "ref",
      align: alignLeft,
      render: (ref: any, p: any) => (
        <Link href={ROUTES.SALE + "/" + p.id}>{ref}</Link>
      ),
    },
    {
      title: t("produit"),
      dataIndex: "products",
      key: "products",
      align: alignLeft,
      render: (products: any[]) => <span>{products.length>1?`${products[0]?.name} et ${products.length-1} autres`:products[0]?.name}</span>,
    },
    {
      title: t("text-status"),
      dataIndex: "status",
      key: "status",
      align: alignLeft,
      render: (status: string) => <span>{status_purchase[status].label}</span>,
    },
  
    {
      title: t("text-amount"),
      dataIndex: "amount",
      key: "amount",
      align: "center",
      render: (amount: number) => <PriceView amount={amount} />,
    },
    {
      title: "Date",
      dataIndex: "created_at",
      key: "created_at",
      align: alignLeft,
      render: (created_at: string) => (
        <span>{dayjs(created_at).format("DD/MM/YYYY")}</span>
      ),
    },
  ];

  return (
    <Table
      //@ts-ignore
      columns={refundTableColumns}
      rowKey="id"
      data={purchases}
      className="orderDetailsTable w-full"
      scroll={{ x: 350, y: 500 }}
    />
  );
};
