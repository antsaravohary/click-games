import PriceView from "@components/common/price-view";
import Trash from "@components/icons/trash";
import CurrencyInput from "@components/ui/currency-input";
import Input from "@components/ui/input";
import Label from "@components/ui/label";
import { useModalAction, useModalState } from "@components/ui/modal/modal.context";
import TextArea from "@components/ui/text-area";
import { useCreateMessageMutation } from "@data/message/use-create-message.mutation";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { useMemo, useRef, useState } from "react";
import { useQueryClient } from "react-query";

const PurchaseEditModal = () => {
  const { data }: any = useModalState();
  const {closeModal}=useModalAction();
  const { mutate } = useCreateMessageMutation();
  const refText = useRef(null);
  const queryClient = useQueryClient();
  const [products, setProducts] = useState<any[]>(data.products);
  const total = useMemo(() => {
    let total = 0;
    if (products) {
      products.forEach((p) => {
        total += p.total_price;
      });
    }
    return total;
  }, [products]);
  const updatePrice = (price: number, idx: number) => {
    const newProduct = [...products];
    newProduct[idx].price = price;
    newProduct[idx].total_price = price * newProduct[idx].quantity;
    setProducts(newProduct);
  };
  const onValid = () => {
    mutate(
      {
        variables: {
          input: {
            text: refText.current.value,
            purchase_id: data.id,
            data: {
              type: "PPP",
              products,
            },
          },
        },
      },
      
      {onSuccess:()=>{
        closeModal();
      },
        onSettled: () => {
          queryClient.invalidateQueries([API_ENDPOINTS.PURCHASE, data.id]);
        },
      }
    );
  };
  return (
    <div className="mt-5 w-96">
      <h2 className="text-lg font-medium text-gray-900">Ventes</h2>
      {products?.length > 0 && (
        <div className="mt-4 bg-white border border-gray-200 rounded-lg shadow-sm">
          <h3 className="sr-only">Mes produit</h3>
          <ul role="list" className="divide-y divide-gray-200">
            {products.map((product: any, idx: number) => (
              <li key={product.id} className="flex py-6 px-4 sm:px-6">
                <div className="flex-shrink-0">
                  <img
                    src={product.gallery[0]?.thumbnail}
                    alt={product.name}
                    className="w-20 rounded-md"
                  />
                </div>

                <div className="ml-6 flex-1 flex flex-col">
                  <div className="flex">
                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm">
                        <div className="font-medium text-gray-700 hover:text-gray-800">
                          {product.name}
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
                    <div className="mt-1 flex-col text-sm font-medium text-gray-900">
                      <div className="flex items-center">
                        <div>Prix: </div>
                        <CurrencyInput
                          value={product.price}
                          onSave={(e: number) => {
                            updatePrice(e, idx);
                          }}
                        />
                      </div>
                      <div>
                        Total: <PriceView amount={product.total_price} />
                      </div>
                    </div>

                    <div className="ml-4">
                      <label htmlFor="quantity" className="sr-only">
                        Quantité
                      </label>
                      <select
                        id="quantity"
                        name="quantity"
                        value={product.quantity}
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
                <PriceView amount={total} />
              </dd>
            </div>
          </dl>
          <div className="mt-5 px-2">
            <Label>Message</Label>
            <TextArea ref={refText} name="text" />
          </div>

          <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
            <button
              onClick={onValid}
              className="w-full bg-accent border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
            >
              Proposer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default PurchaseEditModal;
