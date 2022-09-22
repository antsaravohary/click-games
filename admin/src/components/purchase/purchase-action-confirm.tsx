import Button from "@components/ui/button";
import { useModalAction } from "@components/ui/modal/modal.context";
import { useUpdatePurchaseMutation } from "@data/purchase/use-purchase-update.mutation";

const PurchaseActionConfirm = ({ id,purchase }: any) => {
  const {openModal}=useModalAction();
  const { mutate, isLoading } = useUpdatePurchaseMutation();
  const onValide = () => {
    mutate({
      variables: {
        id,
        input: {
          action: "admin_accept",
        },
      },
    });
  };
  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Accepter ce vente
        </h3>
        <div className="mt-2 max-w-xl text-sm text-gray-500">
          <p>
            Si vous accepter ce vente veuillez confirmer sinon donne votre
            proposition ci-dessous
          </p>
        </div>
        <div className="mt-5 flex space-x-4">
          <Button loading={isLoading} onClick={onValide}>
            Confirmer
          </Button>
          <Button className="bg-green-400 hover:bg-green-600"
                onClick={() => {
                  openModal("PURCHASE_PURPOSE_FORM", { ...purchase });
                }}
              >
                Proposer une autre offre
              </Button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseActionConfirm;
