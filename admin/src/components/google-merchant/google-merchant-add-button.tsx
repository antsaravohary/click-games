import { UpdateArrowIcon } from "@components/icons/update-arrow";
import Button from "@components/ui/button";
import Loader from "@components/ui/loader/loader";
import { Product } from "@ts-types/generated";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import http from "@utils/api/http";
import { formatDate } from "@utils/format-date";
import { useState } from "react";
import { useQueryClient } from "react-query";
type props = {
    product: Product;
}

export default function GoogleMerchantAddButton({ product }: props) {
    const [loading, setLoading] = useState(false);
    const queryClient = useQueryClient();
    const add = () => {
        setLoading(true);

        http.post("product-ads/google-merchant/add/" + product.id).then(
            () => { }
        ).catch(() => { }).finally(() => {

            queryClient.invalidateQueries(API_ENDPOINTS.PRODUCTS).finally(() => {
                setLoading(false);
            });

        })
    }
    if (loading) {
        return <Button
            variant="outline" size="small"><Loader className="h-5 w-5" simple /></Button>
    }

    return (
        <>
            {(product.product_ads == null || product.product_ads?.google_merchant_at == null) ? <Button
                onClick={add}
                variant="outline" size="small">Ajouter</Button> : <Button
                    disabled={!product?.product_ads?.google_merchant_need_update}
                    onClick={add}
                    variant="outline" size="small"><span className="text-xs mr-2">{formatDate(product.product_ads.google_merchant_at)}</span> {!!product?.product_ads?.google_merchant_need_update && <UpdateArrowIcon width={16} height={16} />} </Button>}

        </>)
}