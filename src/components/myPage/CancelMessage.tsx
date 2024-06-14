import Button from '../common/Button';

interface CancelMessageProps {
  cancelMsg: string;
  closeModal: () => void;
}

const CancelMessage = ({ cancelMsg, closeModal }: CancelMessageProps) => {
  return (
    <div className="w-475 flex flex-col gap-24 items-center">
      <span className="text-24">거절 사유</span>
      <div className="text-16 p-12 border-1 rounded-6">{cancelMsg}</div>
      <div className="flex flex-row w-full gap-12">
        <Button outlined onClick={closeModal}>
          닫기
        </Button>
      </div>
    </div>
  );
};

export default CancelMessage;
