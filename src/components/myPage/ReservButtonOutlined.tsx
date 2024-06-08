import { ReactComponent as XIcon } from '@/assets/icons/x-square.svg';

interface ReservButtonOutlinedProps {
  onClick?: () => void;
}

const ReservButtonOutlined = ({ onClick }: ReservButtonOutlinedProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-row border-1 rounded-4 items-center px-12 py-8 gap-4 text-14 text-black-6 font-semibold border-black-5 hover:border-black-6 bg-white hover:bg-black-4"
    >
      취소하기
      <XIcon />
    </button>
  );
};

export default ReservButtonOutlined;
