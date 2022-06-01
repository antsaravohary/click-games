import { useModalAction } from "@components/ui/modal/modal.context";
import { Table } from "@components/ui/table";
import { repair } from "@ts-types/repairs-type";
import { status_repair } from "@utils/data";
import { useIsRTL } from "@utils/locals";
import { formatToPrice } from "@utils/use-price";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

export const RepairList = ({ repairs,isLoading }: { repairs: repair[],isLoading:boolean}) => {
    const { t } = useTranslation("common");
    const { alignLeft, alignRight } = useIsRTL();
    console.log("repairs",repairs);
    const refundTableColumns = [
    
      {
        title: t("ref"),
        dataIndex: "ref",
        key: "ref",
        align: alignLeft,
        render:(e:string)=>(<a href={`repair/${e}`}>{e}</a>)
      },
      {
        title: t("console"),
        dataIndex: "model_brand",
        key: "model_brand",
        align: alignLeft,
        render:(e:any)=>(<span>{e?.brand?.name} / {e?.name}</span>)
      },
     
      {
        title: t("text-amount"),
        dataIndex: "amount",
        key: "amount",
        align: "center",
        render:(e:number)=>formatToPrice(e)
      },
      {
        title: t("text-status"),
        dataIndex: "status",
        key: "status",
        align: "center",
        render: (status: string) => <span>{status_repair[status]?.label}</span>,
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
        rowKey="ref"
        columns={refundTableColumns}
        data={repairs}
        emptyText={()=>(<div className="flex justify-center"> Aucun donnée </div>)}
        className="orderDetailsTable w-full"
        scroll={{ x: 450, y: 500 }}
      />
    );
  };
  