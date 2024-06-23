import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import ReservApi from '@/apis/reservation';
import TextBox from '@/components/common/input/TextBox';
import Button from '@/components/common/button/Button';

interface Reject {
  cancelMsg: string;
}

const RejectReservation = ({
  id: reservationId,
  closeModal,
}: {
  id: number;
  closeModal: () => void;
}) => {
  const { register, handleSubmit, setValue, watch } = useForm<Reject>({
    defaultValues: { cancelMsg: '' },
  });

  const mutateCancelMsg = useMutation({
    mutationFn: (data: { reservationId: number; cancelMsg: string }) =>
      ReservApi.putCancelMsg(data),
    onSuccess: () => {
      // 성공 시 모달을 닫습니다.
      closeModal();
    },
  });

  const handleSave = async (data: Reject) => {
    mutateCancelMsg.mutate({
      reservationId,
      cancelMsg: data.cancelMsg,
    });
  };

  const cancelMsgValue = watch('cancelMsg');

  return (
    <div className="flex flex-col gap-48">
      <TextBox
        id="rejectReservation"
        labelName="거절 사유"
        textSize={18}
        mb={16}
        textLimit={100}
        placeholder="거절 사유를 작성해주세요"
        value={cancelMsgValue}
        onChange={(e) => setValue('cancelMsg', e.target.value)}
        register={register('cancelMsg', {
          required: '거절 사유를 작성해주세요',
        })}
      />
      <div className="flex justify-between gap-16">
        <Button isCancel onClick={closeModal}>
          취소
        </Button>
        <Button onClick={handleSubmit(handleSave)}>거절 사유 보내기</Button>
      </div>
    </div>
  );
};

export default RejectReservation;
