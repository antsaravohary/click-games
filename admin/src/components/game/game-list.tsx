import { Table } from "@components/ui/table";
import ActionButtons from "@components/common/action-buttons";
import { ROUTES } from "@utils/routes";
import { useTranslation } from "next-i18next";
import { useIsRTL } from "@utils/locals";
import { Platform } from "@ts-types/platforms-type";
import { Game } from "@ts-types/games-type";
import usePrice from "@utils/use-price";

export type IProps = {
  games: Game[] | undefined;
};

const GameList = ({ games }: IProps) => {
  const { t } = useTranslation();
  const { alignLeft, alignRight } = useIsRTL();

  const columns = [
    {
      title: t("table:table-item-id"),
      dataIndex: "id",
      key: "id",
      align: "center",
      width: 60,
    },
    {
      title: t("table:table-item-title"),
      dataIndex: "name",
      key: "name",
      align: alignLeft,
      render: (name: any) => <span className="whitespace-nowrap">{name}</span>,
    },
    {
      title: t("table:table-item-year"),
      dataIndex: "year",
      key: "year",
      align: alignLeft,
    },
    {
      title: t("table:table-item-quantity"),
      dataIndex: "quantity",
      key: "quantity",
      align: alignLeft,
    },
    {
      title: t("table:table-item-buy-price"),
      dataIndex: "buy_price",
      key: "buy_price",
      align: alignLeft,
      render:(buy_price:number)=>{
        const {price}=usePrice({amount:buy_price});
        return price;
      }
    },
    {
      title: t("table:table-item-sale-price"),
      dataIndex: "sale_price",
      key: "sale_price",
      align: alignLeft,
      render:(sale_price:number)=>{
        const {price}=usePrice({amount:sale_price});
        return price;
      }
    },
    {
      title: t("table:table-item-actions"),
      dataIndex: "slug",
      key: "actions",
      align: alignRight,
      render: (id: string, record: Game) => (
        <ActionButtons
          id={record.id}
          editUrl={`${ROUTES.GROUPS}/${id}/edit`}
          deleteModalView="DELETE_TYPE"
        />
      ),
    },
  ];

  return (
    <div className="rounded overflow-hidden shadow mb-8">
      {/* @ts-ignore */}
      <Table
        columns={columns}
        emptyText={t("table:empty-table-data")}
        data={games}
        rowKey="id"
        scroll={{ x: 380 }}
      />
    </div>
  );
};

export default GameList;
