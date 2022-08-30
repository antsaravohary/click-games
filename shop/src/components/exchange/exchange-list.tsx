import { Eye } from "@components/icons/eye-icon";
import LinkButton from "@components/ui/link-button";
import { useModalAction } from "@components/ui/modal/modal.context";
import { Table } from "@components/ui/table";
import { Exchange } from "@ts-types/exchanges-type";
import { status_exchange } from "@utils/data";
import { useIsRTL } from "@utils/locals";
import { ROUTES } from "@utils/routes";
import { formatToPrice } from "@utils/use-price";
import dayjs from "dayjs";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export const ExchangeList = ({ exchanges, isLoading }: { exchanges: Exchange[], isLoading: boolean }) => {
  const { t } = useTranslation("common");
  const { alignLeft, alignRight } = useIsRTL();
  const refundTableColumns = [

    {
      title: t("ref"),
      dataIndex: "ref",
      key: "ref",
      align: alignLeft,
      render: (e: string) => (<a href={`exchange/${e}`}>{e}</a>)
    },
    {
      title: t("Echange "),
      dataIndex: "shop_product",
      key: "shop_product",
      align: alignLeft,
      width:450,
      render: (e: any,record:any) => (<span>{e?.name+"<=>"+record?.customer_product?.product?.name}</span>)
    },

    {
      title: t("text-amount"),
      dataIndex: "amount",
      key: "amount",
      align: "center",
      render: (e: number) => formatToPrice(e)
    },
    {
      title: t("text-status"),
      dataIndex: "status",
      key: "status",
      align: "center",
      render: (status: string) => <span>{status_exchange[status]?.label}</span>,
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
      title:"Action",
      dataIndex:"id",
      key:"id",
      render:(id)=>(
        <div className="flex justify-center">
        <Link  href={ROUTES.EXCHANGE+"/"+id}><Eye height={32} width={32}/></Link></div>
      )
    }
  ];

  return (
    <Table
      //@ts-ignore
      rowKey="id"
      columns={refundTableColumns}
      data={exchanges}
      emptyText={() => (<div className="flex justify-center"> Vous avez auccun échange en cours</div>)}
      className="orderDetailsTable w-full"
      scroll={{ x: 700, y: 500 }}
    />
  );
};
