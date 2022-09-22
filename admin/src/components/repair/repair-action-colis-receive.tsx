import Button from "@components/ui/button";
import { useUpdateRepairMutation } from "@data/repair/use-repair-update.mutation";

const RepairActionColisReceive = ({ id }: any) => {
  const { mutate, isLoading } = useUpdateRepairMutation();
  const onValide = () => {
    mutate({
      variables: {
        id,
        input: {
          action: "confirm_repair_receive",
        },
      },
    });
  };
  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Reception de colis
        </h3>
        <div className="mt-2 max-w-xl text-sm text-gray-500">
          <p>Merci de confirmer uniquement si vous avez réçu le colis</p>
        </div>
        <div className="mt-5">
          <Button loading={isLoading} onClick={onValide}>
            Confimer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RepairActionColisReceive;
