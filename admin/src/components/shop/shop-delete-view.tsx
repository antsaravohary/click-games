import ConfirmationCard from "@components/common/confirmation-card";
import {
  useModalAction,
  useModalState,
} from "@components/ui/modal/modal.context";
import { useDeleteShopMutation } from "@data/shop/use-shop-delete.mutation";

const ProductDeleteView = () => {
  const { mutate: deleteShop, isLoading: loading } = useDeleteShopMutation();
  const { data } = useModalState();
  const { closeModal } = useModalAction();
  async function handleDelete() {
    deleteShop(data, {
      onSettled: () => {
        closeModal();
      },
    });
  }
  return (
    <ConfirmationCard
      onCancel={closeModal}
      onDelete={handleDelete}
      deleteBtnLoading={loading}
    />
  );
};

export default ProductDeleteView;
