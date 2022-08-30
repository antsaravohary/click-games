import { useModalAction } from "@components/ui/modal/modal.context";
import { Table } from "@components/ui/table";
import { useIsRTL } from "@utils/locals";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

export const RefundList = ({ refunds }: { products: any }) => {
    const { t } = useTranslation("common");
    const { alignLeft, alignRight } = useIsRTL();
    const { openModal } = useModalAction();
  
    const refundTableColumns = [
    
      {
        title: "Commande ref",
        dataIndex: "order",
        key: "order",
        align: alignLeft,
        ellipsis: true,
        render:(order)=>(order.ref)
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
      {
        title: t("text-amount"),
        dataIndex: "amount",
        key: "amount",
        align: alignLeft,
      },
      {
        title: "Boutique",
        dataIndex: "order",
        key: "shop",
        align: alignLeft,
        render:(order)=>(order?.shop?.name)
      },
      {
        title: t("text-status"),
        dataIndex: "status",
        key: "status",
        align: alignLeft,
        render: (status: string) => <span>{t(`text-${status}`)}</span>,
      },
    ];
  
    return (
      <Table
        //@ts-ignore
        columns={refundTableColumns}
        data={refunds}
        className="orderDetailsTable w-full"
        scroll={{ x: 680 }}
      />
    );
  };
  