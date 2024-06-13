import { ReactComponent as XIcon } from '@/assets/icons/x-square.svg';
import { ReactComponent as CheckIcon } from '@/assets/icons/check-circle.svg';
import { ReservStatusType } from '@/constants/types';
import { twMerge } from 'tailwind-merge';

interface ReservButtonOutlinedProps {
  status: ReservStatusType;
  onClick?: () => void;
}

const ReservButtonOutlined = ({
  onClick,
  status,
}: ReservButtonOutlinedProps) => {
  let icon;
  let text = '';
  let base = 'border-black-5 text-black-6';
  let hover;

  const hoverError =
    'hover:border-system-error hover:text-system-error hover:bg-system-error-bg';

  switch (status) {
    case '예약 취소':
      text = '취소하기';
      icon = <XIcon stroke="#8C8C8C" />;
      break;
    case '예약 거절':
      text = '거절하기';
      base = 'bg-white border-system-error-bg text-system-error';
      hover = hoverError;
      icon = <XIcon stroke="#ff4d4f" />;
      break;
    case '예약 완료':
      text = '예약확정';
      base = 'bg-white border-blue-6 text-blue-6';
      hover = 'hover:bg-blue-1 hover:border-blue-6';
      icon = <CheckIcon />;
      break;
    case '예약 삭제':
      text = '삭제하기';
      hover = hoverError;
      icon = <XIcon stroke="#ff4d4f" />;
      break;
    default:
      break;
  }

  const className = twMerge(
    'flex flex-row border-1 bg-white border-black-5 rounded-4 items-center px-12 py-8 gap-4 font-semibold hover:border-black-6 hover:bg-black-4',
    base,
    hover,
  );

  return (
    <button type="button" onClick={onClick} className={`${className} text-14`}>
      {text}
      {icon}
    </button>
  );
};

export default ReservButtonOutlined;
