import { useMutation, useQueryClient } from '@tanstack/react-query';
import { putMyReservation } from '@/apis/myReservation';
import { toast } from 'react-toastify';
import RESERV_STATUS from '@/constants/reserv';
import DefaultModal from '../../common/modal/DefaultModal';

const CancelReserv = ({
  id: cancelId,
  closeModal,
  isOpen,
}: {
  id: number;
  closeModal: () => void;
  isOpen: boolean;
}) => {
  const queryClient = useQueryClient();
  const mutateReserv = useMutation({
    mutationFn: (id: number) => putMyReservation(id, RESERV_STATUS.CANCELED),
    onSuccess: () => {
      toast.success('예약이 취소되었습니다');
      queryClient.invalidateQueries({
        queryKey: ['myReservation'],
      });
    },
    onError: () => toast.error('예약 취소에 실패했습니다'),
  });
  const handleCancel = () => {
    mutateReserv.mutate(cancelId);
    closeModal();
  };
  return (
    <DefaultModal
      isOpen={isOpen}
      title="해당 예약을 취소하시겠습니까?"
      buttonText="취소하기"
      closeModal={closeModal}
      onConfirm={handleCancel}
    />
  );
};

export default CancelReserv;
