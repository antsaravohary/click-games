import Button from "@components/ui/button";
import CurrencyInput from "@components/ui/currency-input";
import Input from "@components/ui/input";
import { useUpdateExchangeMutation } from "@data/exchange/use-exchange-update.mutation";
import { useUpdateRepairMutation } from "@data/repair/use-repair-update.mutation";
import { useState } from "react";

const ExchangeActionReceive = ({ id }: any) => {
  const { mutate, isLoading } = useUpdateExchangeMutation();
  const onValide = () => {
    mutate({
      variables: {
        id,
        input: {
          action: "confirm_exchange_receive",
        },
      },
    });
  };
  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Validation de reception de colis
        </h3>
        <div className="mt-2 max-w-xl text-sm text-gray-500">
          <p>Merci de valider uniquement si vous avez réçu le colis</p>
        </div>

        <div className="mt-5">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button loading={isLoading} onClick={onValide}>
              Confirmer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExchangeActionReceive;
