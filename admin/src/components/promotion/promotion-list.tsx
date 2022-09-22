import ActionButtons from "@components/common/action-buttons";
import Pagination from "@components/ui/pagination";
import { Table } from "@components/ui/table";
import { PromotionType } from "@ts-types/promotion-type.types";
import { PromotionPaginator } from "@ts-types/promotion.type";
import { ROUTES } from "@utils/routes";
import usePrice from "@utils/use-price";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

type IProps = {
  promotions: PromotionPaginator | null | undefined;
  onPagination: (current: number) => void;
};

const PromotionList = ({ promotions,onPagination}: IProps) => {
  const { data, paginatorInfo } = promotions! ?? {};
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      align: "center",
      width: 150,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      width: 150,
    },
    {
      title: "type",
      dataIndex: "promotion_type",
      key: "promotion_type",
      align: "center",
      width: 150,
      render: (promotion_type: PromotionType) => (
        <span className="whitespace-nowrap truncate">{promotion_type.title}</span>
      ),
    },
    {
      title: "Montant",
      dataIndex: "total_amount",
      key: "total_amount",
      align: "center",
      width: 150,
      render: (total_amount: number) => {
        const {price} =usePrice({amount:total_amount});
        return (<span className="whitespace-nowrap truncate">{price}</span>)
      }
    },
    {
      title: "Durée",
      dataIndex: "delay",
      key: "delay",
      align: "center",
      width: 150,
      render: (delay: number) => (
        <span className="whitespace-nowrap truncate">{delay} Jours</span>
      ),
    },
    {
      title: "debut",
      dataIndex: "start_date",
      key: "start_date",
      align: "center",
      width: 150,
      render:(start_date:string)=>start_date?dayjs(start_date).format("DD/MM/YYYY"):"---"
    },
    {
      title: "Fin",
      dataIndex: "end_date",
      key: "end_date",
      align: "center",
      width: 150,
      render:(end_date:string)=>end_date?dayjs(end_date).format("DD/MM/YYYY"):"---"
    },
    {
      title: "Actions",
      dataIndex: "id",
      key: "actions",
      align: "center",
      width: 90,
      render: (id: string) => (
        <ActionButtons
          id={id}
          detailsUrl={`${ROUTES.PROMOTION}/${id}`}
          /*deleteModalView="DELETE_CATEGORY"*/
        />
      ),
    },
  ];
  const { t } = useTranslation();
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

export default PromotionList;
