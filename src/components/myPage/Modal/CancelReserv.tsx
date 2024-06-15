import { useMutation } from '@tanstack/react-query';
import { putMyReservation } from '@/apis/myReservation';
import DefaultModal from '../../common/DefaultModal';

const CancelReserv = ({
  id: cancelId,
  closeModal,
}: {
  id: number;
  closeModal: () => void;
}) => {
  const mutateReserv = useMutation({
    mutationFn: (id: number) => putMyReservation(id, '예약 취소'),
  });
  const handleCancel = () => {
    mutateReserv.mutate(cancelId);
    closeModal();
  };
  return (
    <DefaultModal
      title="해당 예약을 취소하시겠습니까?"
      buttonText="취소하기"
      closeModal={closeModal}
      onConfirm={handleCancel}
    />
  );
};

export default CancelReserv;
