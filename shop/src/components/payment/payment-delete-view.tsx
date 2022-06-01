import ConfirmationCard from "@components/common/confirmation-card";
import {
  useModalAction,
  useModalState,
} from "@components/ui/modal/modal.context";
import { useStripeCardDelete } from "@data/stripe/use-stripe-card-delete-mutation";

const PaymentDeleteView = () => {
  const { data } = useModalState();
  const { closeModal } = useModalAction();
  const { mutate: detete, isLoading } = useStripeCardDelete();

  function handleDelete() {
    detete(data?.id);
    return closeModal();
  }
  return (
    <ConfirmationCard
      onCancel={closeModal}
      onDelete={handleDelete}
      deleteBtnLoading={isLoading}
    />
  );
};

export default PaymentDeleteView;
