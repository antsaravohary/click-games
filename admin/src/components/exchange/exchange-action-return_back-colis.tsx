import Button from "@components/ui/button";
import { useModalAction } from "@components/ui/modal/modal.context";
import { useUpdateExchangeMutation } from "@data/exchange/use-exchange-update.mutation";
import { useUpdateRepairMutation } from "@data/repair/use-repair-update.mutation";
import http from "@utils/api/http";
import { ROUTES } from "@utils/routes";
import { useQueryClient } from "react-query";

const ExchangeActionReturnBackColis = ({ exchange }: { exchange: any }) => {
  const { openModal } = useModalAction();
  const { mutate: update, isLoading } = useUpdateExchangeMutation();
  const queryClient = useQueryClient();
  const onValide = () => {
    if (exchange?.return_delivery?.weight !== null) {

      update({
        variables: {
          id: exchange?.id,
          input: {
            action: "shipping_return_packet",
          },
        },
      });
    } else {
      openModal("DELIVERY_FORM_MODAL", {
        onValide: (e: any) => {

          http.post("/generate-label-colissimo/" + exchange?.return_delivery?.id, { ...e, ref: exchange.ref }).then(
            () => { queryClient.invalidateQueries(ROUTES?.EXCHANGE); }
          );

        },
      });
    };
  }

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Envoie de colis de retour
        </h3>
        <div className="mt-2 max-w-xl text-sm text-gray-500">
          <p>Merci d'envoyer le colis au client</p>
        </div>
        <div className="mt-5">
          <Button loading={isLoading} onClick={onValide}>
            {exchange?.return_delivery?.weight !== null ? "Envoyer" : "Preparation du colis"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExchangeActionReturnBackColis;
