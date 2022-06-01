import ActionButtons from "@components/common/action-buttons";
import Input from "@components/ui/input";
import { usePopularProductsQuery } from "@data/analytics/use-popular-products.query";
import Pagination from "@components/ui/pagination";
import Image from "next/image";
import { useProductsQuery } from "@data/product/products.query";
import { useShopQuery } from "@data/shop/use-shop.query";
import { Product } from "@ts-types/generated";
import { useIsRTL } from "@utils/locals";
import { useRouter } from "next/router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import usePrice from "@utils/use-price";
import Badge from "@components/ui/badge/badge";
import { Table } from "@components/ui/table";
import { siteSettings } from "@settings/site.settings";
import { PlusIcon } from "@components/icons/plus-icon";
import Button from "@components/ui/button";
import { useModalAction, useModalState } from "@components/ui/modal/modal.context";

const ProductChoiceForm = () => {
  const [searchTerm, setSearchTerms] = useState("");
  const [page, setPage] = useState(1);
  const { t } = useTranslation();
  const {
    query: { shop },
  } = useRouter();
  const { data: shopData, isLoading: fetchingShop } = useShopQuery(
    shop as string
  );
  const { alignLeft, alignRight } = useIsRTL();
  const shopId = shopData?.shop?.id!;
  const {
    data: { products, setProducts,max_product, },
  } = useModalState();
  const {closeModal}=useModalAction();
  const [newProducts, setNewProducts] = useState(products);

  const {
    data,
    isLoading: loading,
    error,
  } = useProductsQuery(
    {
      text: searchTerm,
      limit: 10,
      shop_id: Number(shopId),
      page,
    },
    {
      enabled: Boolean(shopId),
    }
  );
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
        <>
        {newProducts.findIndex((n: { id: string; })=>n.id===record.id)===-1?
         <>{max_product>newProducts.length&& <button
          onClick={() => {
            if(max_product>newProducts.length){
              setNewProducts([...newProducts, record]);
            }
           
          }}
          className="rounded bg-accent text-white px-2 py-1"
          name="add"
        >
          + Ajouter
        </button>}
        </>:<button onClick={()=>{
            setNewProducts(newProducts.filter((p: { id: string; })=>p.id!=record.id));
        }}  className="rounded bg-red-600 text-white px-2 py-1" >  Retirer</button>
        }
        
        </>
      ),
    },
  ];

  columns = columns?.filter((column) => column?.key !== "shop");
  console.log("new product", newProducts);

  return (
    <div className="bg-white p-8">
      <Input
        name="text"
        value={searchTerm}
        onChange={(e) => setSearchTerms(e.currentTarget.value)}
        label="Rechercher votre produit"
        className="mb-8"
      />
      <div className="flex justify-between my-4">
        <h3 className="text-xl">
          Produit:{" "}
          <span className="text-gray-500">{`${newProducts.length}/${max_product}`}</span>
        </h3>
        <Button
          size="small"
          onClick={() => {
            setProducts(newProducts);
            closeModal();
          }}
          name="valide"
        >
          Validée
        </Button>
      </div>
      <Table
        /* @ts-ignore */
        columns={columns}
        emptyText={t("table:empty-table-data")}
        data={data?.products?.data}
        rowKey="id"
        scroll={{ x: 900 }}
      />
    </div>
  );
};

export default ProductChoiceForm;
