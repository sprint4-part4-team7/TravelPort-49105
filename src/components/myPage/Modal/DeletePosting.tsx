import useProductDeleteMutation from '@/hooks/reactQuery/product/useProductDeleteMutation';
import DefaultModal from '@/components/common/DefaultModal';

const DeletePosting = ({
  id: productId,
  closeModal,
  isOpen,
}: {
  id: number;
  closeModal: () => void;
  isOpen: boolean;
}) => {
  const { mutate } = useProductDeleteMutation();

  const handleDelete = () => {
    mutate(productId);
    closeModal();
  };
  return (
    <DefaultModal
      isOpen={isOpen}
      title="해당 게시물을 삭제하시겠습니까?"
      buttonText="삭제하기"
      closeModal={closeModal}
      onConfirm={handleDelete}
    />
  );
};

export default DeletePosting;
