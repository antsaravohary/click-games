import Button from "@components/ui/button";
import { useModalAction } from "@components/ui/modal/modal.context";
import { Order } from "@ts-types/custom.types";

type MyProps = {
  order: Order;
};

const AddNewTicket = ({ order }:MyProps) => {
  const { openModal } = useModalAction();

  return (
    <Button
      size="small"
      className="bg-red-800 hover:bg-red-500"
      onClick={() => openModal("ADD_TICKET",{order:order})}
      variant="normal"
    >
      Signaler
    </Button>
  );
};

export default AddNewTicket;
