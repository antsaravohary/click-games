import Button from "@components/ui/button";
import { useModalAction } from "@components/ui/modal/modal.context";
import { useUpdateRepairMutation } from "@data/repair/use-repair-update.mutation";

const RepairActionReturnBackColis = ({ id }: { id: string }) => {
  const { openModal } = useModalAction();
  const { mutate: updateRepair, isLoading } = useUpdateRepairMutation();
  const onValide = () => {
    openModal("DELIVERY_FORM_MODAL", {
      onValide: (e: any) => {
        if (id) {
          updateRepair({
            variables: {
              id: id,
              input: {
                action: "shipping_return_packet",
                shipping_data: e,
              },
            },
          });
        }
      },
    });
  };
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
            Envoyer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RepairActionReturnBackColis;
