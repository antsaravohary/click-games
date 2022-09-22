import Button from "@components/ui/button";
import CurrencyInput from "@components/ui/currency-input";
import Input from "@components/ui/input";
import { useUpdateExchangeMutation } from "@data/exchange/use-exchange-update.mutation";
import { useUpdateRepairMutation } from "@data/repair/use-repair-update.mutation";
import { useState } from "react";

const ExchangeActionValidate = ({ id, price }: any) => {
  const { mutate, isLoading } = useUpdateExchangeMutation();
  const [amount, setAmount] = useState(price);
  const onValide = () => {
    mutate({
      variables: {
        id,
        input: {
          action: "confirm_exchange",
          amount: amount
        },
      },
    });
  };
  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Validation d'échange.
        </h3>
        <div className="mt-2 max-w-xl text-sm text-gray-500">
          <p>Merci de verifié le prix et validée l'échange</p>
        </div>
        <Input
          label="Prix d'échange"
          name="price"
          value={amount}
          onChange={(e) => setAmount(e?.currentTarget?.value)}
          type="number"
          variant="outline"
          className="mb-5 mt-5 w-1/4"
        />
        <div className="mt-5">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button className="bg-red-500 hover:bg-red-800" onClick={() => { }}>Réfuser</Button>
            <Button loading={isLoading} onClick={onValide}>
              Confirmer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExchangeActionValidate;
