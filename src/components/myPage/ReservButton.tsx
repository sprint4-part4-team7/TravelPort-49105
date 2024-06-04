interface ReservButtonProps {
  status: string;
  onClick?: () => void;
}

const ReservButton = ({ status, onClick }: ReservButtonProps) => {
  return (
    <div
      className="flex flex-row px-12 py-8 gap-4 text-14 font-semibold"
      onClick={onClick}
    >
      {status === 'rejected' ? '거절 사유 보기' : '취소하기'}
    </div>
  );
};
export default ReservButton;
