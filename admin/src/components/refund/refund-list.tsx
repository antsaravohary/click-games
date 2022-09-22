import Pagination from "@components/ui/pagination";
import Image from "next/image";
import { Table } from "@components/ui/table";
import ActionButtons from "@components/common/action-buttons";
import { siteSettings } from "@settings/site.settings";
import { User, UserPaginator } from "@ts-types/generated";
import { useMeQuery } from "@data/user/use-me.query";
import { useTranslation } from "next-i18next";
import { useIsRTL } from "@utils/locals";
import usePrice from "@utils/use-price";
import dayjs from "dayjs";
import { Refund, RefundPaginator } from "@ts-types/refund-type";
import Button from "@components/ui/button";
import { useRefundFinishMutation } from "@data/refund/use-refund-finish.mutation";

type IProps = {
  refunds: RefundPaginator | undefined;
  onPagination: (current: number) => void;
  is_admin?: boolean;
};
const RefundList = ({ refunds, onPagination, is_admin = false }: IProps) => {
  const { data } = refunds;
  const { t } = useTranslation();
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
      title: "Raison",
      dataIndex: "reason",
      key: "reason",
      align: alignLeft,
    },
    {
      title: t("table:table-item-email"),
      dataIndex: "customer",
      key: "email",
      align: alignLeft,
      render: (customer: User) => customer.email,
    },
    {
      title: t("table:table-item-amount"),
      dataIndex: "amount",
      key: "amount",
      align: alignLeft,
      render: (amount: number) => {
        const { price } = usePrice({
          amount: amount,
        });
        return price;
      },
    },
    {
      title: t("table:table-item-status"),
      dataIndex: "status",
      key: "status",
      align: alignLeft,
      render: (status: string) => <span>{t(`text-${status}`)}</span>,
    },
    {
      title: t("table:table-item-created-at"),
      dataIndex: "created_at",
      key: "created_at",
      align: alignLeft,
      render: (created_at: string) => (
        <span>{dayjs(created_at).format("DD/MM/YYYY")}</span>
      ),
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "Action",
      render: (id: any, refund: any) => {
        const { mutate: finish, isLoading } = useRefundFinishMutation();
        if (is_admin && refund.status === "pending") {
          return (
            <Button
              onClick={() => finish(id)}
              disabled={isLoading}
              loading={isLoading}
              size="small"
            >
              Terminé
            </Button>
          );
        }
      },
    },
  ];

  return (
    <>
      <div className="rounded overflow-hidden shadow mb-6">
        {/* @ts-ignore */}
        <Table
          columns={columns}
          emptyText={t("table:empty-table-data")}
          data={data}
          rowKey="id"
          scroll={{ x: 800 }}
        />
      </div>

      {/*!!paginatorInfo.total && (
        <div className="flex justify-end items-center">
          <Pagination
            total={paginatorInfo.total}
            current={paginatorInfo.currentPage}
            pageSize={paginatorInfo.perPage}
            onChange={onPagination}
          />
        </div>
      )*/}
    </>
  );
};

export default RefundList;
