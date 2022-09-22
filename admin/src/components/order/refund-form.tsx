import Button from "@components/ui/button";
import {
  useModalAction,
  useModalState,
} from "@components/ui/modal/modal.context";
import { useCreateRefundMutation } from "@data/refund/use-refund-create.mutation";
import usePrice from "@utils/use-price";
import { useRouter } from "next/router";
import { createRef, useState } from "react";
import RefundCreateSuccess from "./refund-create-success";

const RefundForm = () => {
  const [success, setSuccess] = useState(false);
  const {
    data: { order },
  } = useModalState();
  const { closeModal } = useModalAction();
  const router = useRouter();
  const {
    query: { shop },
  } = useRouter();
  const { price } = usePrice({
    amount: order.amount,
  });
  const { mutate: createRefund, isLoading: creatingRefund } =
    useCreateRefundMutation();
  const handleConfirme = () => {
    createRefund(
      {
        variables: {
          input: {
            amount: order?.amount,
            order_id: order?.id,
            reason: "Annulation de la commande",
            shop_id: order?.shop_id,
          },
        },
      },
      {
        onSuccess: () => {
          setSuccess(true);
        },
      }
    );
  };
  if (success) {
    return <RefundCreateSuccess/>;
  }
  return (
    <div className="bg-white w-full rounded p-8 ">
      <div>
        <h3 className="text-lg leading-6 font-medium text-red-600">
          Annulation de la commande
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Commande N°{order.ref}
        </p>
      </div>
      <div className="py-2 sm:grid  sm:grid-cols-2 sm:gap-4">
        <dt className="text-sm font-medium text-gray-500">Client</dt>
        <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 ">
          <span className="flex-grow">{order.customer.name}</span>
        </dd>
      </div>
      <div className="py-2 sm:grid sm:grid-cols-2 sm:gap-4">
        <dt className="text-sm font-medium text-gray-500">Boutique</dt>
        <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 ">
          <span className="flex-grow">{shop}</span>
        </dd>
      </div>
      <div className="py-2 sm:grid sm:grid-cols-2 sm:gap-4">
        <dt className="text-sm font-medium text-gray-500">
          Montant de la commande
        </dt>
        <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 ">
          <span className="flex-grow">{price}</span>
        </dd>
      </div>
      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <Button
          onClick={handleConfirme}
          type="button"
          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
          loading={creatingRefund}
        >
          Confirmer
        </Button>
        <button
          onClick={() => closeModal()}
          type="button"
          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
        >
          Annuler
        </button>
      </div>
    </div>
  );
};

export default RefundForm;
