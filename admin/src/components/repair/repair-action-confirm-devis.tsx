import Button from "@components/ui/button";
import { useUpdateRepairMutation } from "@data/repair/use-repair-update.mutation";

const RepairActionConfirmDevis = ({ id, edit }: any) => {
  const { mutate, isLoading } = useUpdateRepairMutation();
  const onValide = () => {
    mutate({
      variables: {
        id,
        input: {
          action: "confirm_repair_items",
        },
      },
    });
  };
  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Verification
        </h3>
        <div className="mt-2 max-w-xl text-sm text-gray-500">
          <p>Merci de confirme quand le prix est bon</p>
        </div>
        <div className="mt-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button className="bg-green-500 hover:bg-green-800" onClick={edit}>Revoir les prix</Button>
            <Button loading={isLoading} onClick={onValide}>
              Confirmer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepairActionConfirmDevis;
