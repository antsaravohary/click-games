import Pagination from "@components/ui/pagination";
import Image from "next/image";
import { Table } from "@components/ui/table";
//import ActionButtons from "@components/common/action-buttons";
import { siteSettings } from "@settings/site.settings";
import usePrice from "@utils/use-price";
import Badge from "@components/ui/badge/badge";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import "dayjs/locale/fr";
import { Product, ProductPaginator } from "@ts-types/generated";
import { useIsRTL } from "@utils/locals";
import Loader from "@components/ui/loader/loader";

export type IProps = {
  products?: ProductPaginator;
  isLoading?:boolean
  onPagination: (current: number) => void;
};

const ProductList = ({ products, onPagination,isLoading }: IProps) => {
  const { data, paginatorInfo } = products! ?? {};

  const router = useRouter();
  const { t } = useTranslation();
  const { alignLeft, alignRight } = useIsRTL();

  let columns = [
    {
      title: "Nom",
      dataIndex: "image",
      width: 150,
      key: "image",
      align: alignLeft,
      render: (image: any, { name }: { name: string }) => (
        <div className="flex">
          <Image
            src={image?.thumbnail ?? siteSettings.product.placeholderImage}
            alt={name}
            layout="fixed"
            priority={true}
            width={42}
            height={42}
            className="rounded overflow-hidden"
          />
          <p className="ml-2">
            {name}
          </p>
        </div>
      ),
    },
    {
      title:"Prix",
      dataIndex: "price",
      key: "price",
      width: 120,
      align: "center",
      ellipsis: true,
    },
    {
      title: t("Quantité"),
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
      width: 50,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      width: 100,
      render: (status: string) => (
        <Badge
          text={status === "draft" ? "Brouillon" : "Publier"}
          color={
            status.toLocaleLowerCase() === "draft"
              ? "bg-yellow-400"
              : "bg-accent"
          }
        />
      ),
    },
    /* {
      title: t("table:table-item-actions"),
      dataIndex: "slug",
      key: "actions",
      align: "center",
      width: 80,
      render: (slug: string, record: Product) => (
        <ActionButtons
          id={record?.id}
          editUrl={`${router.asPath}/${slug}/edit`}
          deleteModalView="DELETE_PRODUCT"
        />
      ),
    },*/
  ];

  if (router?.query?.shop) {
    columns = columns?.filter((column) => column?.key !== "shop");
  }

  return (
    <>
      <div className="rounded overflow-hidden shadow mb-6">
        <Table
          /* @ts-ignore */
          columns={columns}
          
          emptyText={()=>{
            return (
              isLoading?<div className="w-full flex justify-center">
               <Loader simple className="h-8 w-8"/>
              </div>:<div className="text-lg"> {t("empty-table-announce-data")}</div>
            )
          }}
          tableLayout="auto"
          data={data}
          rowKey="id"
          scroll={{ x: 500 }}
        />
      </div>

      {!!paginatorInfo?.total && (
        <div className="flex justify-end items-center">
          <Pagination
            total={paginatorInfo.total}
            current={paginatorInfo.currentPage}
            pageSize={paginatorInfo.perPage}
            onChange={onPagination}
            showLessItems
          />
        </div>
      )}
    </>
  );
};

export default ProductList;
