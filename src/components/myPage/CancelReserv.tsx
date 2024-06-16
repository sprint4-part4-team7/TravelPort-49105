import { useMutation } from '@tanstack/react-query';
import { putMyReservation } from '@/apis/myReservation';
import Button from '../common/Button';

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
    <div className="w-475 flex flex-col gap-24 items-center">
      <span className="text-16">해당 예약을 취소하시겠습니까?</span>
      <div className="flex flex-row w-full gap-12">
        <Button outlined onClick={closeModal}>
          닫기
        </Button>
        <Button onClick={handleCancel}>예약 취소</Button>
      </div>
    </div>
  );
};

export default CancelReserv;
