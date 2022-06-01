import { Eye } from "@components/icons/eye-icon";
import LinkButton from "@components/ui/link-button";
import { useModalAction } from "@components/ui/modal/modal.context";
import { Table } from "@components/ui/table";
import { Exchange } from "@ts-types/exchanges-type";
import { Ticket } from "@ts-types/generated";
import { priority_data, status_exchange } from "@utils/data";
import { useIsRTL } from "@utils/locals";
import { ROUTES } from "@utils/routes";
import { formatToPrice } from "@utils/use-price";
import dayjs from "dayjs";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export const SupportTicketLit = ({ tickets, isLoading }: { tickets: Ticket[], isLoading: boolean }) => {
    const { t } = useTranslation("common");
    const { alignLeft, alignRight } = useIsRTL();
    const ColumnTable = [

        {
            title: t("id"),
            dataIndex: "id",
            key: "id",
            width: "75px",
            align: alignLeft,

        },
        {
            title: t("Objet"),
            dataIndex: "subject",
            key: "subject",
            align: alignLeft,

        },
        {
            title: t("Status"),
            dataIndex: "status",
            key: "status",
            align: alignLeft,
            render: (status) => (
                status ? <span className="text-yellow-500">Ouvert</span> : <span className="text-green-500">Fermé</span>
            )

        },
        {
            title: t("Priorité"),
            dataIndex: "priority",
            key: "priority",
            align: alignLeft,
            render: (priority: number) => (<span className={`text-${priority_data[priority].color}-500`}>{priority_data[priority]?.label}</span>)


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
            title: "Action",
            dataIndex: "id",
            align: alignRight,

            key: "id",
            render: (id: any) => (
                <div className="flex justify-end">
                    <Link href={ROUTES.SUPPORTS + "/view/" + id}><Eye height={32} width={32} /></Link>
                    <div className="text-xs inline-flex font-medium  text-accent rounded-full text-center p-2">!</div>
                </div>
            )
        }
    ];

    return (
        <Table
            //@ts-ignore
            rowKey="id"
            columns={ColumnTable}
            data={tickets}
            emptyText={() => (<div className="flex justify-center"> Vous avez auccun échange en cours</div>)}
            className="orderDetailsTable w-full"
            scroll={{ x: 700, y: 500 }}
        />
    );
};
