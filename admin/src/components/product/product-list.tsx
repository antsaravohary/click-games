import Pagination from "@components/ui/pagination";
import Image from "next/image";
import { Table } from "@components/ui/table";
import ActionButtons from "@components/common/action-buttons";
import { siteSettings } from "@settings/site.settings";
import usePrice from "@utils/use-price";
import Badge from "@components/ui/badge/badge";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import "dayjs/locale/fr";
import {
  Product,
  ProductPaginator,
  ProductType,
  Shop,
} from "@ts-types/generated";
import { useIsRTL } from "@utils/locals";
import CurrencyInput from "@components/ui/currency-input";
import { useUpdateProductMutation } from "@data/product/product-update.mutation";
import { useShopQuery } from "@data/shop/use-shop.query";
import Checkbox from "@components/ui/checkbox/checkbox";
import { useState } from "react";
import Loader from "@components/ui/loader/loader";
import GoogleMerchantAddButton from "@components/google-merchant/google-merchant-add-button";

export type IProps = {
  products?: ProductPaginator;
  onPagination: (current: number) => void;
};

const CheckBoxInput = ({ record }: { record: Product }) => {
  const [state, setState] = useState(record?.exchangeable);
  const { mutate, isLoading } = useUpdateProductMutation();
  if (isLoading) {
    return <Loader className="h-5 w-5" simple />
  }
  return (<Checkbox className="w-5 flex items-center justify-center" checked={state} name={"exchangeable-" + record.id} value={state}
    onChange={() => {
      mutate({
        variables: {
          id: record?.id,
          input: {
            exchangeable: !state,
            discount:record?.discount,
            price:record?.price,
          }
        }
      },{
        onSuccess:()=>{
          setState(!state);
        }
      })
    }}
  />)
}

const ProductList = ({ products, onPagination }: IProps) => {
  const { data, paginatorInfo } = products! ?? {};
  const router = useRouter();
  const { data: shopData } = useShopQuery(router.query.shop as string, {
    enabled: !!router.query.shop,
  });

  const { t } = useTranslation();
  const { alignLeft, alignRight } = useIsRTL();

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
      title: t("table:table-item-shop"),
      dataIndex: "shop",
      key: "shop",
      width: 120,
      align: "center",
      ellipsis: true,
      render: (shop: Shop) => (
        <span className="whitespace-nowrap truncate">{shop?.name}</span>
      ),
    },
    {
      title: "Type de produit ",
      dataIndex: "product_type",
      key: "product_type",
      width: 120,
      align: "center",
      render: (product_type: string) => (
        <span className="whitespace-nowrap truncate">{product_type}</span>
      ),
    },
    {
      title: t("table:table-item-unit"),
      dataIndex: "price",
      key: "price",
      align: alignRight,
      width: 100,
      render: (value: number, record: Product) => {
        if (record?.product_type === ProductType.Variable) {
          const { price: max_price } = usePrice({
            amount: record?.max_price as number,
          });
          const { price: min_price } = usePrice({
            amount: record?.min_price as number,
          });
          return (
            <span
              className="whitespace-nowrap"
              title={`${min_price} - ${max_price}`}
            >{`${min_price} - ${max_price}`}</span>
          );
        } else {
          const { price } = usePrice({
            amount: value,
          });
          const { mutate } = useUpdateProductMutation();
          return <CurrencyInput value={value} onSave={
            (value: number) => {
              mutate({
                variables: {
                  id: record?.id,
                  input: {

                    discount: record.discount,
                    price: value
                  }
                }
              })
            }
          } />;
        }
      },
    },
    {
      title: t("table:table-item-discount"),
      dataIndex: "discount",
      key: "discount",
      align: alignRight,
      width: 150,
      render: (e: number, product: Product) => {
        const { mutate } = useUpdateProductMutation();
        return <CurrencyInput value={e} onSave={
          (value: number) => {
            mutate({
              variables: {
                id: product?.id,
                input: {
                  discount: value,
                  price: product?.price
                }
              }
            })
          }
        } />;
      },
    },
    {
      title: t("table:table-item-quantity"),
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
      width: 100,
    },
    {
      title: t("table:table-item-exchangeable"),
      dataIndex: "exchangeable",
      key: "exchangeable",
      align: "center",
      width: 80,
      render: (value: number, record: Product) => <div className="flex justify-center"><CheckBoxInput  record={record} /></div>

    },
    {
      title: t("table:table-item-status"),
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
    {
      title: "Google Marchand",
      dataIndex: "status",
      key: "status",
      align: "center",
      width: 100,
      render: (status: string,record: Product) => <GoogleMerchantAddButton product={record}/>
    },
    {
      title: t("table:table-item-actions"),
      dataIndex: "slug",
      key: "actions",
      align: "center",
      width: 80,
      render: (slug: string, record: Product) => (
        <ActionButtons
          id={record?.id}
          copyUrl={`${router.asPath}/${slug}/copy`}
          editUrl={`${router.asPath}/${slug}/edit`}
          deleteModalView="DELETE_PRODUCT"
        />
      ),
    },
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
          emptyText={t("table:empty-table-data")}
          data={data}
          rowKey="id"
          scroll={{ x: 900 }}
        />
      </div>

      {!!paginatorInfo.total && (
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
