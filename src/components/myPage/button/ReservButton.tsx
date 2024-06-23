import { ReactComponent as LinkIcon } from '@/assets/icons/arrowUpRight.svg';
import { ReactComponent as ReviewIcon } from '@/assets/icons/review.svg';
import RESERV_STATUS from '@/constants/Reserv';
import { useState } from 'react';

interface ReservButtonProps {
  status: number | null;
  onClick?: () => void;
}

const ReservButton = ({ status, onClick }: ReservButtonProps) => {
  const [isHover, setIsHover] = useState(false);
  let content;
  switch (status) {
    case RESERV_STATUS.FINISHED:
      content = (
        <>
          후기 쓰기
          <ReviewIcon stroke={isHover ? '#3065e8' : 'black'} />
        </>
      );
      break;
    case RESERV_STATUS.REJECTED:
      content = (
        <>
          거절 사유 보기
          <LinkIcon stroke={isHover ? '#3065e8' : 'black'} />
        </>
      );
      break;
    case RESERV_STATUS.REVIEWED:
      content = (
        <>
          후기 수정하기
          <LinkIcon stroke={isHover ? '#3065e8' : 'black'} />
        </>
      );
      break;
    default:
      content = '';
      break;
  }
  return (
    <button
      type="button"
      className="flex flex-row items-center gap-4 px-12 py-8 font-semibold text-14 hover:text-blue-6"
      onClick={onClick}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {content}
    </button>
  );
};
export default ReservButton;
