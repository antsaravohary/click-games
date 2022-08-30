import PriceView from "@components/common/price-view";
import { useGameSale } from "@contexts/game-sale.context";
import { useCreatePurchaseGameMutation } from "@data/purchase-game/use-create-purchase-game.mutation";
import { formatToPrice } from "@utils/use-price";
import { Button } from "..";

/* This example requires Tailwind CSS v2.0+ */
const products = [
  {
    id: 1,
    name: "Cold Brew Bottle",
    description:
      "This glass bottle comes with a mesh insert for steeping tea or cold-brewing coffee. Pour from any angle and remove the top for easy cleaning.",
    href: "#",
    quantity: 1,
    price: "$32.00",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/confirmation-page-05-product-01.jpg",
    imageAlt: "Glass bottle with black plastic pour top and mesh insert.",
  },
];

export default function GameToSaleStep3({ onSuccess }: any) {
  const { shipping, purchase_games, purchase_products, total_amount } =
    useGameSale();
  const { mutate, isLoading } = useCreatePurchaseGameMutation();
  const onValidate = () => {
    /*mutate({
     purchase_games:purchase_games,
     
  });*/
    const input = {
      purchase_products: purchase_products.map((p:any)=>({...p,id:undefined})),
    };
    mutate(input, {
      onSuccess: (e) => {
        onSuccess(e.ref);
      },
    });
  };
  return (
    <div className="bg-white">
      <div className="max-w-xl">
        <h1 className="text-md font-semibold uppercase tracking-wide text-indigo-600">
          Resumé
        </h1>
      </div>

      <div className="mt-5 border-t border-gray-200">
        <h2 className="sr-only">Vos vente</h2>

        <h3 className="sr-only">Items</h3>
        {purchase_products.map((purchase_product: any) => (
          <div
            key={purchase_product.id}
            className="py-5 border-b border-gray-200 flex space-x-6"
          >
            <img
              src={purchase_product.gallery[0]?.thumbnail}
              alt={purchase_product.name}
              className="flex-none w-16 h-16 object-center object-cover bg-gray-100 rounded-lg "
            />

            <div className="flex-auto flex flex-col">
              <div>
                <h4 className="font-medium text-gray-900">
                  {purchase_product.name}
                </h4>
                <p className=" text-sm text-gray-600"></p>
              </div>
              <div className="mt-2 flex-1 flex items-end">
                <dl className="flex text-sm divide-x divide-gray-200 space-x-4 sm:space-x-6">
                  <div className="flex">
                    <dt className="font-medium text-gray-900">Quantité</dt>
                    <dd className="ml-2 text-gray-700">
                      {purchase_product?.quantity}
                    </dd>
                  </div>
                  <div className="pl-4 flex sm:pl-6">
                    <dt className="font-medium text-gray-900">Prix</dt>
                    <dd className="ml-2 text-gray-700">
                      <PriceView amount={purchase_product.price} />
                    </dd>
                  </div>
                  <div className="pl-4 flex sm:pl-6">
                    <dt className="font-medium text-gray-900">Total</dt>
                    <dd className="ml-2 text-gray-700">
                      <PriceView amount={purchase_product.total_price} />
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button loading={isLoading} onClick={onValidate} className="mt-5 w-full">
        Valider
      </Button>
    </div>
  );
}
