import { ReactComponent as LinkIcon } from '@/assets/icons/arrow-up-right.svg';
import { ReactComponent as ReviewIcon } from '@/assets/icons/review.svg';
import { useState } from 'react';

interface ReservButtonProps {
  status: string;
  onClick?: () => void;
}

const ReservButton = ({ status, onClick }: ReservButtonProps) => {
  const [isHover, setIsHover] = useState(false);
  return (
    <button
      type="button"
      className="flex flex-row items-center px-12 py-8 gap-4 text-14 hover:text-blue-6 font-semibold"
      onClick={onClick}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {status === '예약 취소' ? (
        <>
          거절 사유 보기
          <LinkIcon stroke={isHover ? '#3065e8' : 'black'} />
        </>
      ) : (
        <>
          후기 쓰기
          <ReviewIcon stroke={isHover ? '#3065e8' : 'black'} />
        </>
      )}
    </button>
  );
};
export default ReservButton;
