import DefaultModal from '../../common/DefaultModal';

interface CancelMessageProps {
  cancelMsg: string;
  closeModal: () => void;
}

const CheckCancelMsg = ({ cancelMsg, closeModal }: CancelMessageProps) => {
  return (
    <DefaultModal title="거절 사유" closeModal={closeModal}>
      <div className="w-full text-16 h-150 p-12 border-1 rounded-6">
        {cancelMsg}
      </div>
    </DefaultModal>
  );
};

export default CheckCancelMsg;
