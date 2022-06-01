import { useProductQuery } from "@data/game/product.query";
import { siteSettings } from "@settings/site.settings";

const StripeSessionProductView = ({ product_id,product}:{ product_id: string,product:any}) => {
  const { data } = useProductQuery(product_id);
  return (
    <div className="py-4 flex">
      <img
        className="h-10 w-10 rounded-full"
        src={data?.image?.thumbnail ?? siteSettings.product.placeholder}
        alt=""
      />
      <div className="ml-3">
        <p className="text-sm font-medium text-gray-900">{data?.name}</p>
        <p className="text-sm text-gray-500">Quantité: {product?.order_quantity}</p>
      </div>
    </div>
  );
};

export default StripeSessionProductView;
