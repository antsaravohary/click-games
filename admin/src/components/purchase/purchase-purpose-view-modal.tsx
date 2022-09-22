import PriceView from "@components/common/price-view";
import Trash from "@components/icons/trash";
import Button from "@components/ui/button";
import CurrencyInput from "@components/ui/currency-input";
import Input from "@components/ui/input";
import Label from "@components/ui/label";
import {
  useModalAction,
  useModalState,
} from "@components/ui/modal/modal.context";
import TextArea from "@components/ui/text-area";
import { useCreateMessageMutation } from "@data/message/use-create-message.mutation";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { useMemo, useRef, useState } from "react";
import { useQueryClient } from "react-query";

const PurchasePurposeViewModal = () => {
  const { data }: any = useModalState();
  const { closeModal } = useModalAction();
  const { mutate } = useCreateMessageMutation();
  const refText = useRef(null);
  const queryClient = useQueryClient();
  const { products } = data;
  const total = useMemo(() => {
    let total = 0;
    if (products) {
      products.forEach((p) => {
        total += p.total_price;
      });
    }
    return total;
  }, [products]);

  return (
    <div className="mt-5 bg-white p-8 rounded-md">
      <h2>Proposition</h2>

      {products.map((product: any) => (
        <div
          key={product.id}
          className="py-5 border-b border-gray-200 flex space-x-6"
        >
          <img
            src={product.gallery[0]?.thumbnail}
            alt={product.name}
            className="flex-none w-16 h-16 object-center object-cover bg-gray-100 rounded-lg "
          />

          <div className="flex-auto flex flex-col">
            <div>
              <h4 className="font-medium text-gray-900">{product.name}</h4>
              <p className=" text-sm text-gray-600"></p>
            </div>
            <div className="mt-2 flex-1 flex items-end">
              <dl className="flex text-sm divide-x divide-gray-200 space-x-4 sm:space-x-6">
                <div className="flex">
                  <dt className="font-medium text-gray-900">Quantité</dt>
                  <dd className="ml-2 text-gray-700">{product?.quantity}</dd>
                </div>
                <div className="pl-4 flex sm:pl-6">
                  <dt className="font-medium text-gray-900">Prix</dt>
                  <dd className="ml-2 text-gray-700">
                    <PriceView amount={product.price} />
                  </dd>
                </div>
                <div className="pl-4 flex sm:pl-6">
                  <dt className="font-medium text-gray-900">Total</dt>
                  <dd className="ml-2 text-gray-700">
                    <PriceView amount={product.total_price} />
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default PurchasePurposeViewModal;
