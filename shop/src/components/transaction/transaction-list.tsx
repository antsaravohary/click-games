import { formatDateComplet } from "@utils/format-date";
import { useIsRTL } from "@utils/locals";
import { formatToPrice } from "@utils/use-price";
import Table from "rc-table";

const TransactionList = ({ transactions }: any) => {
  const { alignLeft, alignRight } = useIsRTL();
  const table_column = [
    {
      title: "Transaction",
      dataIndex: "object",
      key: "object",
      width:250,
      align: alignLeft,
    },
    {
      title: "Montant",
      dataIndex: "amount",
      width: 150,
      key: "amount",
      align: "center",
      render: (amount: number) => formatToPrice(amount),
    },
    {
      title: "Date",
      dataIndex: "created_at",
      width: 150,
      key: "created_at",
      align: "center",
      render: (date:any) => <span>{formatDateComplet(date)}</span>,
    },
  ];
  return (
    <div>
      <Table
        //@ts-ignore
        rowKey={"id"}
        columns={table_column}
        data={transactions?.pages?.[0]?.data}
        emptyText={()=>(<div className="flex justify-center"> Aucune transaction </div>)}
        className="orderDetailsTable w-full"
        scroll={{ x: 450, y: 500 }}
      />
    </div>
  );
};

export default TransactionList;
