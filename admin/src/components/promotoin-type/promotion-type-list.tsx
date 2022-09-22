import Pagination from "@components/ui/pagination";
import { Table } from "@components/ui/table";
import ActionButtons from "@components/common/action-buttons";
import { ROUTES } from "@utils/routes";
import { useTranslation } from "next-i18next";
import { useIsRTL } from "@utils/locals";
import { PromotionTypePaginator } from "@ts-types/promotion-type.types";
import usePrice from "@utils/use-price";

export type IProps = {
  promotion_types: PromotionTypePaginator | undefined | null;
  onPagination: (key: number) => void;
};
const PromotionTypeList = ({ promotion_types, onPagination }: IProps) => {
  const { t } = useTranslation();
  const { data, paginatorInfo } = promotion_types!;
  const rowExpandable = (record: any) => record.children?.length;

  const { alignLeft } = useIsRTL();

  const columns = [
    {
      title: t("table:table-item-id"),
      dataIndex: "id",
      key: "id",
      align: "center",
      width: 60,
    },
    {
      title: "Titre",
      dataIndex: "title",
      key: "title",
      align: alignLeft,
      width: 150,
    },
    {
      title:"Description",
      dataIndex: "description",
      key: "description",
      align: alignLeft,
      width: 200,
    },
    {
      title:"Prix/jours",
      dataIndex: "price",
      key: "price",
      align: alignLeft,
      width: 200,
      render:(value:number)=>{
        const {price}=usePrice({amount:value});
        return<span className="whitespace-nowrap" title={price}>
        {price}
      </span>
      }
    },
   
   
    {
      title: "Nombre de produit",
      dataIndex: "max_product",
      key: "max_product",
      align: "center",
      ellipsis: true,
      width: 150,
    },
    {
      title: t("table:table-item-actions"),
      dataIndex: "id",
      key: "actions",
      align: "center",
      width: 90,
      render: (id: string) => (
        <ActionButtons
          id={id}
          editUrl={`${ROUTES.PROMOTION_TYPE}/edit/${id}`}
          /*deleteModalView="DELETE_CATEGORY"*/
        />
      ),
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

      {!!paginatorInfo.total && (
        <div className="flex justify-end items-center">
          <Pagination
            total={paginatorInfo.total}
            current={paginatorInfo.currentPage}
            pageSize={paginatorInfo.perPage}
            onChange={onPagination}
          />
        </div>
      )}
    </>
  );
};

export default PromotionTypeList;
