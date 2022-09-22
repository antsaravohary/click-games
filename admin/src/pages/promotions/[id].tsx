import Layout from "@components/layouts/admin";
import PromotionDetail from "@components/promotion/promotion-detail";
import PromotionProductListDetail from "@components/promotion/promotion-product-list-detail";
import Button from "@components/ui/button";
import { useUpdatePromotionMutation } from "@data/promotion/use-promotion-update.mutation";
import { usePromotionQuery } from "@data/promotion/use-promotion.query";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";

export default function Promotion() {
  const { query } = useRouter();
  const {
    data,
    isLoading: loading,
    error,
  } = usePromotionQuery(query.id as string);
  const { mutate: updatPromotion } = useUpdatePromotionMutation();
  return (
    <div className="container">
      <PromotionDetail promotion={data?.promotion} />

      <PromotionProductListDetail products={data?.promotion?.products} />
      
      {data?.promotion?.status === "pending" && (
        <Button
          name="confirmer"
          onClick={() => {
            updatPromotion({
              variables: {
                id: query.id as string,
                input: {
                  action: "promotion_valide",
                },
              },
            });
          }}
        >
          Confirmer
        </Button>
      )}
    </div>
  );
}

Promotion.Layout = Layout;

export const getServerSideProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "form", "table"])),
  },
});
