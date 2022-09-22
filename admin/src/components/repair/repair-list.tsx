import { Table } from "@components/ui/table";
import ActionButtons from "@components/common/action-buttons";
import { useTranslation } from "next-i18next";
import { useIsRTL } from "@utils/locals";
import usePrice from "@utils/use-price";
import { formatAddress } from "@utils/format-address";
import { Repair, RepairPaginator } from "@ts-types/repairs-type";
import { useRouter } from "next/router";
import { formatDateFromNow } from "@utils/format-date";
import { status_repair } from "@utils/data";

export type IProps = {
  repairs: Repair[] | undefined;
  onPagination: RepairPaginator;
};

const RepairList = ({ repairs, onPaginate }: IProps) => {
  const { t } = useTranslation();
  const { alignLeft, alignRight } = useIsRTL();
  const router = useRouter();
  const columns = [
    {
      title: t("table:table-item-ref"),
      dataIndex: "ref",
      key: "ref",
      align: "center",
      width: 150,
    },
    {
      title: t("table:table-item-console"),
      dataIndex: "model_brand",
      key: "model_brand",
      align: "center",
      width: 150,
      render: (model_brand: any) => (
        <span>
          {model_brand?.brand?.name} / {model_brand?.name}
        </span>
      ),
    },
    {
      title: t("table:table-item-total"),
      dataIndex: "total_amount",
      key: "total_amount",
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
      render: (status: string) => <span>{status_repair[status].label}</span>,
    },
    {
      title: t("table:table-item-shipping-address"),
      dataIndex: "send_delivery",
      key: "sender_delivery_id",
      align: alignLeft,
      render: (send_delivery: any) => (
        <div>{formatAddress(send_delivery?.sender?.address)}</div>
      ),
    },
    /*{
      // title: "Download",
      title: "Facture",
      dataIndex: "id",
      key: "download",
      align: "center",
      render: (_id: string, order: Order) => (
        <div>
          <PDFDownloadLink
            document={<InvoicePdf order={order} />}
            fileName="invoice.pdf"
          >
            {({ loading }: any) =>
              loading ? t("common:text-loading") : t("common:text-download")
            }
          </PDFDownloadLink>
        </div>
      ),
    },*/
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
  console.log("repairs", repairs);
  return (
    <div className="rounded overflow-hidden shadow mb-8">
      {/* @ts-ignore */}
      <Table
        columns={columns}
        
        emptyText={t("table:empty-table-data")}
        data={repairs?.data}
        rowKey="id"
        scroll={{ x: 380 }}
      />
    </div>
  );
};

export default RepairList;
