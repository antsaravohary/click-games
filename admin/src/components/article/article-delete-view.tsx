import ConfirmationCard from "@components/common/confirmation-card";
import {
  useModalAction,
  useModalState,
} from "@components/ui/modal/modal.context";
import { useDeleteArticleMutation } from "@data/article/use-article-delete.mutation";

const ArticleDeleteView = () => {
  const { mutate: deleteArticle, isLoading: loading } =
  useDeleteArticleMutation();
  const { data } = useModalState();
  const { closeModal } = useModalAction();
  async function handleDelete() {
    deleteArticle(data);
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

export default ArticleDeleteView;
