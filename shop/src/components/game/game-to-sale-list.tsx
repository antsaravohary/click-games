import PriceView from "@components/common/price-view";
import Trash from "@components/icons/trash";
import { useModalAction } from "@components/ui/modal/modal.context";
import { useGameSale } from "@contexts/game-sale.context";
import { formatToPrice } from "@utils/use-price";
import { Key } from "react";
import { Button, Input } from "..";
import GameToSaleItem from "./game-to-sale-item";
const products = [
  {
    id: 1,
    title: "Basic Tee",
    href: "#",
    price: "$32.00",
    color: "Black",
    size: "Large",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/checkout-page-02-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
  },
  // More products...
];
const GameToSaleList = () => {
  const { openModal } = useModalAction();
  const {
    purchase_games,
    purchase_products,
    amount,
    total_amount,
    setStep,
    updateQuantity,
  } = useGameSale();
  return (
    <>
      <Button size="small" onClick={() => openModal("GAME_SALE_ADD_FORM")}>
        <span className="text-lg mr-2">+</span> Ajouter un produit
      </Button>
      <section aria-labelledby="cart-heading mt-5">
        <div className="mt-5">
          <h2 className="text-lg font-medium text-gray-900">Ventes</h2>
          {purchase_products?.length > 0 && (
            <div className="mt-4 bg-white border border-gray-200 rounded-lg shadow-sm">
              <h3 className="sr-only">Mes produit</h3>
              <ul role="list" className="divide-y divide-gray-200">
                {purchase_products.map((purchase_product: any) => (
                  <li
                    key={purchase_product.id}
                    className="flex py-6 px-4 sm:px-6"
                  >
                    <div className="flex-shrink-0">
                      <img
                        src={purchase_product.gallery[0]?.thumbnail}
                        alt={purchase_product.name}
                        className="w-20 rounded-md"
                      />
                    </div>

                    <div className="ml-6 flex-1 flex flex-col">
                      <div className="flex">
                        <div className="min-w-0 flex-1">
                          <h4 className="text-sm">
                            <div className="font-medium text-gray-700 hover:text-gray-800">
                              {purchase_product.name}
                            </div>
                          </h4>
                          {/**
                             * <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                            <p className="mt-1 text-sm text-gray-500">{product.size}</p>
                             */}
                        </div>

                        <div className="ml-4 flex-shrink-0 flow-root">
                          <button
                            type="button"
                            className="-m-2.5 bg-white p-2.5 flex items-center justify-center text-gray-400 hover:text-gray-500"
                          >
                            <span className="sr-only">supprimer</span>
                            <Trash className="h-5 w-5" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="flex-1 pt-2 flex items-end justify-between">
                        <p className="mt-1 text-sm font-medium text-gray-900">
                          <PriceView amount={purchase_product.total_price} />
                        </p>

                        <div className="ml-4">
                          <label htmlFor="quantity" className="sr-only">
                            Quantité
                          </label>
                          <select
                            id="quantity"
                            onChange={(e) =>
                              updateQuantity(
                                {quantity:e.currentTarget.value,
                                id:purchase_product.id}
                              )
                            }
                            name="quantity"
                            value={purchase_product.quantity}
                            className="rounded-md border border-gray-300 text-base font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          >
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                            <option value={6}>6</option>
                            <option value={7}>7</option>
                            <option value={8}>8</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <dl className="border-t border-gray-200 py-6 px-4 space-y-6 sm:px-6">
                {/** <div className="flex items-center justify-between">
                <dt className="text-sm">Subtotal</dt>
                <dd className="text-sm font-medium text-gray-900">$64.00</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-sm">Shipping</dt>
                <dd className="text-sm font-medium text-gray-900">$5.00</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-sm">Taxes</dt>
                <dd className="text-sm font-medium text-gray-900">$5.52</dd>
              </div>*/}
                <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                  <dt className="text-base font-medium">Total</dt>
                  <dd className="text-base font-medium text-gray-900">
                    <PriceView amount={total_amount} />
                  </dd>
                </div>
              </dl>

              <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                
                <button
                onClick={()=>setStep(2)}
                  type="submit"
                  className="w-full bg-accent border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                >
                  Suivant
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};
export default GameToSaleList;
