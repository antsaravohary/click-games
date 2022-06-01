import Button from "@components/ui/button";
import { useModalAction } from "@components/ui/modal/modal.context";
import { useUpdateOrderMutation } from "@data/order/use-order-update.mutation";
import { Order } from "@ts-types/generated";
type Iprops = {
  order: Order|undefined;
};
const ButtonValidClickCollect = ({ order }: Iprops) => {
  const { openModal } = useModalAction();
  const { mutate: updateOrder, isLoading: updating } = useUpdateOrderMutation();
  const confirm = () => {
    const code_retrait =
      "S" + order?.shop_id + "C" + order?.id + Math.floor(order?.paid_total);
    updateOrder({
      variables: {
        id: order?.id as string,
        input: {
          status: order?.mode_click_collect === "full" ? "3" : undefined,
          code_click_collect: code_retrait,
        },
      },
    });
  };

  return (
    <div className="flex sm:mt-2">
      <Button onClick={confirm} loading={updating} disabled={updating}>
        <span className="block">Confirmer Click&Collect</span>
      </Button>
      <Button
        disabled={updating}
        className="bg-red-500 hover:bg-red-600 ml-2"
        onClick={() => openModal("REFUND_FORM", { order: order })}
      >
        <span className="block">Annuler</span>
      </Button>
    </div>
  );
};

export default ButtonValidClickCollect;
