import { toast } from 'react-toastify';
import DefaultModal from '@/components/common/modal/DefaultModal';

const RejectReservation = ({
  closeModal,
  isOpen,
  handleState,
}: {
  closeModal: () => void;
  isOpen: boolean;
  handleState: () => void;
}) => {
  const handleReject = () => {
    handleState();
    toast.success('거절 처리되었습니다.');
    closeModal();
  };
  return (
    <DefaultModal
      isOpen={isOpen}
      title="예약 거절 시 되돌릴 수 없습니다."
      buttonText="거절하기"
      closeModal={closeModal}
      onConfirm={handleReject}
    >
      <div className="text-24 font-semibold pt-0 text-left">
        정말 거절하시겠습니까?
      </div>
    </DefaultModal>
  );
};

export default RejectReservation;
