import { Product, ProductType } from "@ts-types/generated";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useIsRTL } from "@utils/locals";
import { siteSettings } from "@settings/site.settings";
import { Table } from "@components/ui/table";

type props = {
  products: Array<Product>|undefined;
};

const PromotionProductListDetail = ({ products}: props) => {
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
      width: 70,
      render: (image: any, { name }: { name: string }) => (
        <Image
          src={image?.thumbnail ?? siteSettings.product.placeholder}
          alt={name}
          layout="fixed"
          priority={true}
          width={50}
          height={50}
          className="rounded overflow-hidden"
        />
      ),
    },
    {
      title: t("table:table-item-title"),
      dataIndex: "name",
      key: "name",
      align: alignLeft,
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
   /* {
      title: t("table:table-item-actions"),
      dataIndex: "slug",
      key: "actions",
      align: "center",
      width: 100,
      render: (slug: string, record: Product) => (
        <button
          className="rounded bg-green-600 text-white px-2 py-1"
        >
          {" "}
          Valider
        </button>
      ),
    },*/
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
        
        scroll={{ x: 300 }}
      />
    </div>
  );
};

export default PromotionProductListDetail;
