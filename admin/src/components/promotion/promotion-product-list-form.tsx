import { Product, ProductType } from "@ts-types/generated";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useIsRTL } from "@utils/locals";
import { siteSettings } from "@settings/site.settings";
import { Table } from "@components/ui/table";

type props = {
  products: Array<Product>;
  setProducts: any;
};

const PromotionProductListForm = ({ products, setProducts }: props) => {
  const { t } = useTranslation();
  const {
    query: { shop },
  } = useRouter();
  const { alignLeft } = useIsRTL();
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
      width: 100,
      ellipsis: true,
    },
    /* {
          title: t("table:table-item-group"),
          dataIndex: "type",
          key: "type",
          width: 120,
          align: "center",
          ellipsis: true,
          render: (type: any) => (
            <span className="whitespace-nowrap truncate">{type?.name}</span>
          ),
        },*/
    {
      title: t("table:table-item-actions"),
      dataIndex: "slug",
      key: "actions",
      align: "center",
      width: 80,
      render: (slug: string, record: Product) => (
        <button
          onClick={() => {
            setProducts(
              products.filter((p => p.id != record.id)
            ))
          }}
          className="rounded bg-red-600 text-white px-2 py-1"
        >
          {" "}
          Retirer
        </button>
      ),
    },
  ];

  columns = columns?.filter((column) => column?.key !== "shop");
  return (
    <div>
      <Table
        /* @ts-ignore */
        columns={columns}
        emptyText={t("table:empty-table-data")}
        data={products}
        rowKey="id"
        
        scroll={{ y: 200,x:500}}
      />
    </div>
  );
};

export default PromotionProductListForm;
