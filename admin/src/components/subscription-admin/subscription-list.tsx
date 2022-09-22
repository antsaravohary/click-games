import Pagination from "@components/ui/pagination";
import { Table } from "@components/ui/table";
import ActionButtons from "@components/common/action-buttons";
import { User } from "@ts-types/generated";
import { useMeQuery } from "@data/user/use-me.query";
import { useTranslation } from "next-i18next";
import { useIsRTL } from "@utils/locals";
import { SubscriptionPaginator } from "@ts-types/stripe-subscription-type";
import { formatDateComplet, formatDateFromNow } from "@utils/format-date";
import { ROUTES } from "@utils/routes";
import Button from "@components/ui/button";
import { useState } from "react";
import http from "@utils/api/http";
import { toast } from "react-toastify";
import { useQueryClient } from "react-query";
import { API_ENDPOINTS } from "@utils/api/endpoints";

type IProps = {
  subscriptions: SubscriptionPaginator | null | undefined;
  onPagination: (current: number) => void;
};
const SubscriptionList = ({ subscriptions, onPagination }: IProps) => {
  const { data, paginatorInfo } = subscriptions!;
  const { t } = useTranslation();
  const { alignLeft } = useIsRTL();
  const columns = [
    {
      title: t("table:table-item-user"),
      dataIndex: "user",
      key: "id",
      align: alignLeft,
      render: (user: User) => user?.name
    },
    {
      title: t("table:table-item-type"),
      dataIndex: "type",
      key: "type",
      align: alignLeft
    },
    {
      title: t("table:table-item-start"),
      dataIndex: "current_period_start",
      key: "current_period_start",
      align: alignLeft,
      render: (d: string) => formatDateComplet(d)
    },
    {
      title: t("table:table-item-end"),
      dataIndex: "current_period_end",
      key: "current_period_start",
      align: alignLeft,
      render: (d: string) => formatDateComplet(d)
    },
    {
      title: t("table:table-item-status"),
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status: boolean) => (status ? "Active" : "Inactive"),
    },
    {
      title: t("Prélèvement"),
      dataIndex: "current_period_end",
      key: "current_period_start",
      align: alignLeft,
      render: (d: string) => formatDateFromNow(d)
    },
    {
      title: t(""),
      dataIndex: "id",
      key: "id",
      align: alignLeft,
      render: (id, subscription) => {
        const [loading, setLoading] = useState(false);
        const queryClient = useQueryClient();
        if (!subscription?.subscription_id) {
          return (<Button onClick={() => {
            console.log(subscription);
            setLoading(true);
            http.post("/stripe/subscription/active/" + subscription.user.id).then(() => {
              toast.success("Prélèvement avec succcès");
              queryClient.invalidateQueries(API_ENDPOINTS.SUBSCRIPTION);
            }).catch(() => {
              toast.error("Il y a une erreur est survenue veuillez consulter votre compte stripe pour en savoir rplus")
            }).finally(() => {
              setLoading(false);

            })

          }} loading={loading} disabled={loading} size="small">Prélévé maintenant</Button>)
        } else {
          return (<div></div>)
        }

      }
    },
    {
      title: t("table:table-item-actions"),
      dataIndex: "id",
      key: "actions",
      align: "center",
      render: (id: string, { is_active }: any) => {
        const { data } = useMeQuery();
        return (
          <>
            {data?.id != id && (
              <ActionButtons
                id={id}
                detailsUrl={ROUTES?.SUBSCRIPTION + "/" + id}
              />
            )}
          </>
        );
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

export default SubscriptionList;
