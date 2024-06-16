import { ReactComponent as LinkIcon } from '@/assets/icons/arrow-up-right.svg';
import { ReactComponent as ReviewIcon } from '@/assets/icons/review.svg';
import { useState } from 'react';

interface ReservButtonProps {
  status: number | null;
  onClick?: () => void;
}

const ReservButton = ({ status, onClick }: ReservButtonProps) => {
  const [isHover, setIsHover] = useState(false);
  let content;
  switch (status) {
    case 2:
      content = (
        <>
          후기 쓰기
          <ReviewIcon stroke={isHover ? '#3065e8' : 'black'} />
        </>
      );
      break;
    // case '예약 대기':
    //   content = (
    //     <>
    //       후기 쓰기
    //       <ReviewIcon stroke={isHover ? '#3065e8' : 'black'} />
    //     </>
    //   );
    //   break;
    case 3:
      content = (
        <>
          거절 사유 보기
          <LinkIcon stroke={isHover ? '#3065e8' : 'black'} />
        </>
      );
      break;
    // case '예약 취소':
    //   content = '';
    //   break;
    default:
      content = '';
      break;
  }
  return (
    <button
      type="button"
      className="flex flex-row items-center px-12 py-8 gap-4 text-14 hover:text-blue-6 font-semibold"
      onClick={onClick}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {content}
    </button>
  );
};
export default ReservButton;
