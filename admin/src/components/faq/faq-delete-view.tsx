import ConfirmationCard from "@components/common/confirmation-card";
import {
  useModalAction,
  useModalState,
} from "@components/ui/modal/modal.context";
import { useDeleteFaqMutation } from "@data/faq/use-faq-delete.mutation";

const FaqDeleteView = () => {
  const { mutate: deleteFaq, isLoading: loading } =
  useDeleteFaqMutation();
  const { data } = useModalState();
  const { closeModal } = useModalAction();
  async function handleDelete() {
    deleteFaq(data);
    closeModal();
  }
  return (
    <ConfirmationCard
      onCancel={closeModal}
      onDelete={handleDelete}
      deleteBtnLoading={loading}
    />
  );
};

export default FaqDeleteView;
