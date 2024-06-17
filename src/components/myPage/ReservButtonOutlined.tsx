import { ReactComponent as XIcon } from '@/assets/icons/x-square.svg';
import { ReactComponent as CheckIcon } from '@/assets/icons/check-circle.svg';
import { ReservStatusType } from '@/constants/types';
import { twMerge } from 'tailwind-merge';
import RESERV_STATUS from '@/constants/reserv';

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
    case RESERV_STATUS.FINISHED:
      text = '예약확정';
      base = 'bg-white border-blue-6 text-blue-6';
      hover = 'hover:bg-blue-1 hover:border-blue-6';
      icon = <CheckIcon />;
      break;
    case RESERV_STATUS.REJECTED:
      text = '거절하기';
      base = 'bg-white border-system-error-bg text-system-error';
      hover = hoverError;
      icon = <XIcon stroke="#ff4d4f" />;
      break;
    case RESERV_STATUS.CANCELED:
      text = '취소하기';
      icon = <XIcon stroke="#8C8C8C" />;
      break;
    case RESERV_STATUS.DELETED:
      text = '삭제하기';
      icon = <XIcon stroke="#8C8C8C" />;
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
