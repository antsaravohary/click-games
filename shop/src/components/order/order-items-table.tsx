import { Table } from "@components/ui/table";
import usePrice from "@utils/use-price";
import { siteSettings } from "@settings/site.settings";
import { useTranslation } from "next-i18next";
import { useIsRTL } from "@utils/locals";
import { useModalAction } from "@components/ui/modal/modal.context";
import Badge from "@components/ui/badge";

export const OrderItems = ({ products }: { products: any }) => {
  const { t } = useTranslation("common");
  const { alignLeft, alignRight } = useIsRTL();
  const { openModal } = useModalAction();


  const orderTableColumns = [
    {
      title: <span className="ps-20">{t("text-item")}</span>,
      dataIndex: "",
      key: "items",
      width: 250,
      align: alignLeft,
      ellipsis: true,
      render: (_: any, record: any) => {
        const { price } = usePrice({
          amount: +record.pivot?.unit_price,
        });
        let name = record.name;
        if (record.pivot?.variation_option_id) {
          const variationTitle = record.variation_options?.find(
            (vo: any) => vo.id === record.pivot.variation_option_id
          )["title"];
          name = `${name} - ${variationTitle}`;
        }
        return (
          <div className="flex items-center">
            <div className="w-16 h-16 flex flex-shrink-0 rounded overflow-hidden">
              <img
                src={
                  record.image?.thumbnail ??
                  siteSettings.product.placeholderImage
                }
                alt={name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col ms-4 overflow-hidden">
              <div className="flex mb-1">
                <span className="text-sm text-body truncate inline-block overflow-hidden">
                  {name}
                </span>
               
              </div>
              <span className="text-sm text-accent font-semibold mb-1 truncate inline-block overflow-hidden">
                {price}
              </span>
            </div>
              {!!record.pivot.click_collect&&  <Badge className="ml-2" text="Click&Collect" />}
              {!!record.pivot.code_click_collect  && record.pivot.status !== "delivered" &&<Badge className="ml-1" text="En attente de retrait" color="bg-yellow-600" />}
            {record.pivot.status === "delivered" && (
              <Badge className="ml-2" text="Delivrée" />
            )}
          </div>
        );
      },
    },
    {
      title: t("text-quantity"),
      dataIndex: "pivot",
      key: "pivot",
      align: "center",
      width: 100,
      render: (pivot: any) => {
        return <p className="text-body">{pivot.order_quantity}</p>;
      },
    },
    {
      title: t("text-price"),
      dataIndex: "pivot",
      key: "price",
      align: alignRight,
      width: 100,
      render: (pivot: any) => {
        const { price } = usePrice({
          amount: +pivot.subtotal,
        });
        return <p>{price}</p>;
      },
    },
    {
      dataIndex: "id",
      key: "id",
      align: alignRight,
      width: 50,
      render: (id: any) => {
        return (
          <button
            onClick={() => openModal("PRODUCT_AVIS", { product_id: id })}
            className=" p-2 rounded-full"
          >
            <svg
              className={`mx-1 w-4 h-4 fill-current cursor-pointer  hover:text-yellow-600 ${"text-yellow-500"} `}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
          </button>
        );
      },
    },
  ];

  return (
    <Table
      //@ts-ignore
      columns={orderTableColumns}
      data={products}
      rowKey={(record: any) =>
        record.pivot?.variation_option_id
          ? record.pivot.variation_option_id
          : record.created_at
      }
      className="orderDetailsTable w-full"
      scroll={{ x: 350, y: 500 }}
    />
  );
};
