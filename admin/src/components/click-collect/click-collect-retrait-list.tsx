import Image from "next/image";
import { Table } from "@components/ui/table";
import { siteSettings } from "@settings/site.settings";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import "dayjs/locale/fr";
import { useIsRTL } from "@utils/locals";
import Button from "@components/ui/button";
import { useUpdateOrderMutation } from "@data/order/use-order-update.mutation";
import Badge from "@components/ui/badge/badge";

export type IProps = {
  order?: any;
};

const ClickCollectRetraitList = ({ order }: IProps) => {
  const router = useRouter();
  const { t } = useTranslation();
  const { alignLeft, alignRight } = useIsRTL();
  const data = order?.products?.filter(
    (product: { pivot: { click_collect: boolean } }) =>
      product.pivot.click_collect !== true
  );
  const { mutate: updateOrder, isLoading:updating} = useUpdateOrderMutation();
  const onConfirmClickCollect = () => {
    updateOrder({
      variables: {
        id: order.id,
        input: {
            click_collect_delivered:true,
        },
      },
    });
  };
  let columns = [
    {
      title: t("table:table-item-image"),
      dataIndex: "image",
      key: "image",
      align: alignLeft,
      width: 74,
      render: (image: any, { name }: { name: string }) => (
        <Image
          src={image?.thumbnail ?? siteSettings.product.placeholder}
          alt={name}
          layout="fixed"
          priority={true}
          width={42}
          height={42}
          className="rounded overflow-hidden"
        />
      ),
    },
    {
      title: t("table:table-item-title"),
      dataIndex: "name",
      key: "name",
      align: alignLeft,
      width: 200,
      ellipsis: true,
    },

    {
      title: t("table:table-item-quantity"),
      dataIndex: "pivot",
      key: "quantity",
      align: "center",
      width: 100,
      render: (pivot: { order_quantity: any }) => pivot.order_quantity,
    },
  ];

  return (
    <div className="flex flex-col">
      <div className="rounded overflow-hidden shadow mb-6">
        <Table
          /* @ts-ignore */
          columns={columns}
          emptyText={t("table:empty-table-data")}
          data={data}
          rowKey="id"
          scroll={{ x: 900 }}
        />
      </div>
      <div className="mt-4">
        {order.click_collect_delivered?<Badge  text="Produit déja livrée"/>: <Button onClick={onConfirmClickCollect} loading={updating} disabled={updating}>Confirmer la réception du produit</Button>}

      </div>
    </div>
  );
};

export default ClickCollectRetraitList;
