import Pagination from "@components/ui/pagination";
import { Table } from "@components/ui/table";
import ActionButtons from "@components/common/action-buttons";
import { getIcon } from "@utils/get-icon";
import * as categoriesIcon from "@components/icons/category";
import { ROUTES } from "@utils/routes";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { useIsRTL } from "@utils/locals";
import { ModelMessage } from "@ts-types/article-type";

export type IProps = {
  model_messages: any | undefined | null;
  onPagination: (key: number) => void;
};

const ModelMessageList = ({ model_messages, onPagination }: IProps) => {
  const { t } = useTranslation();
  const { data, paginatorInfo } = model_messages! ?? {};
  const rowExpandable = (record: any) => record.children?.length;

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
      title: t("table:table-item-title"),
      dataIndex: "title",
      key: "title",
      align: alignLeft,
    },

    {
      title: t("table:table-item-actions"),
      dataIndex: "id",
      key: "actions",
      align: "center",
      width: 90,
      render: (id: string) => (
        <ActionButtons
          id={id}
          editUrl={`${ROUTES.MODEL_MESSAGE}/${id}/edit`}
          deleteModalView="DELETE_ARTICLE"
        />
      ),
    },
  ];

  return (
    <>
      <div className="rounded overflow-hidden shadow mb-6">
        <Table
          //@ts-ignore
          columns={columns}
          emptyText={t("table:empty-table-data")}
          //@ts-ignore
          data={data}
          rowKey="id"
          scroll={{ x: 1000 }}
          expandable={{
            expandedRowRender: () => "",
            rowExpandable: rowExpandable,
          }}
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

export default ModelMessageList;
