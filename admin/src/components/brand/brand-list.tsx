import { Table } from "@components/ui/table";
import ActionButtons from "@components/common/action-buttons";
import * as typeIcons from "@components/icons/type";
import { ROUTES } from "@utils/routes";
import { useTranslation } from "next-i18next";
import { useIsRTL } from "@utils/locals";
import { Brand } from "@ts-types/brand-type";

export type IProps = {
  brands: Brand[] | undefined;
};

const BrandList = ({ brands }: IProps) => {
  const { t } = useTranslation();
  const { alignLeft, alignRight } = useIsRTL();

  const columns = [
    {
      title: t("table:table-item-id"),
      dataIndex: "id",
      key: "id",
      align: "center",
      width: 60,
    },

    {
      title: t("table:table-item-title"),
      dataIndex: "name",
      key: "name",
      align: alignLeft,
      render: (name: any) => <span className="whitespace-nowrap">{name}</span>,
    },
    {
      title: t("table:table-item-type"),
      dataIndex: "type",
      key: "type",
      align: "center",
    },
    {
      title: t("Modele disponible"),
      dataIndex: "modeles",
      key: "modeles",
      align: "center",
      render:(modeles:any[])=>modeles?.length
    },
    {
      title: t("table:table-item-actions"),
      dataIndex: "id",
      key: "id",
      align: alignRight,
      render: (id: string, record: Brand) => (
        <ActionButtons
          id={record.id}
          editUrl={`${ROUTES.BRAND}/edit/${id}`}
          deleteModalView="DELETE_TYPE"
        />
      ),
    },
  ];

  return (
    <div className="rounded overflow-hidden shadow mb-8">
      {/* @ts-ignore */}
      <Table
        columns={columns}
        emptyText={t("table:empty-table-data")}
        data={brands}
        rowKey="id"
        scroll={{ x: 380 }}
      />
    </div>
  );
};

export default BrandList;
