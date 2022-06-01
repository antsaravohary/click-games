import Pagination from "@components/ui/pagination";
import { Table } from "@components/ui/table";
import { OrderPaginator, User } from "@ts-types/generated";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { useIsRTL } from "@utils/locals";
import { StripeSessionPaginator } from "@ts-types/stripe-session-type";
import PriceView from "@components/common/price-view";
import StripeSessionProductView from "./stripe-session-product-view";

type IProps = {
  stripeSessions: StripeSessionPaginator | null | undefined;
  onPagination: (current: number) => void;
};

const StripeSessionList = ({ stripeSessions, onPagination }: IProps) => {
  const { data, paginatorInfo } = stripeSessions! ?? {};
  const { t } = useTranslation();
  const rowExpandable = (record: any) => record.children?.length;
  const router = useRouter();
  const { alignLeft } = useIsRTL();

  const columns = [
    {
      title: t("table:table-item-id"),
      dataIndex: "id",
      key: "id",
      align: "left",
      width: 150,
    },
    {
      title: t("table:table-item-user"),
      dataIndex: "user",
      key: "user",
      align: "left",
      width: 250,
      render: (user: User) => user.name,
    },
    {
      title: t("Click Game plus"),
      dataIndex: "data",
      key: "data",
      align: "left",
      width: 150,
      render: (data: any) =>
        data?.clickGamePlus === "NEW"
          ? "Nouveau membre"
          : data?.clickGamePlus === "SUBSCRIBER"
          ? "Membre"
          : "non",
    },
    {
      title: t("table:table-item-product"),
      dataIndex: "data",
      key: "data",
      align: "left",
      render: (data: any) => {
        return (
          <div>
            <ul role="list" className="divide-y divide-gray-200">
              {data?.products?.map((product, idx) => (
                <li key={idx}>
                  <StripeSessionProductView
                    product_id={product?.product_id}
                    product={product}
                    key={idx}
                  />
                </li>
              ))}
            </ul>
          </div>
        );
      },
    },
    {
      title: t("table:table-item-amount"),
      dataIndex: "data",
      key: "data",
      align: "left",
      width: 250,
      render: (data: any) => <PriceView amount={data?.orderInput?.total} />,
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

export default StripeSessionList;
