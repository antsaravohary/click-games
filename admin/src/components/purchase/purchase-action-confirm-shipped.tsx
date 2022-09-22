import Button from "@components/ui/button";
import { useUpdatePurchaseMutation } from "@data/purchase/use-purchase-update.mutation";

const PurchaseActionConfirmShipped = ({ id }: any) => {
  const { mutate, isLoading } = useUpdatePurchaseMutation();
  const onValide = () => {
    mutate({
      variables: {
        id,
        input: {
          action: "packet_received",
        },
      },
    });
  };
  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
        Confirmation de colis
        </h3>
        <div className="mt-2 max-w-xl text-sm text-gray-500">
          <p>Merci de confirme quand vous avez réçu le colis</p>
        </div>
        <div className="mt-5">
         
            <Button  loading={isLoading} onClick={onValide}>
              Confirmer
            </Button>
         
        </div>
      </div>
    </div>
  );
};

export default PurchaseActionConfirmShipped;
