import approved from '@/assets/icons/status-chip-approved.svg';
import pending from '@/assets/icons/status-chip-pending.svg';
import rejected from '@/assets/icons/status-chip-rejected.svg';

const ReservChips = ({ status }: { status: string }) => {
  let src;
  let style =
    'flex justify-center items-center gap-4 px-8 py-4 text-14 font-semibold ';
  let text = '';
  switch (status) {
    case '예약 완료':
      src = approved;
      style += 'text-blue-6';
      text = '수락됨';
      break;
    case '예약 대기':
      src = pending;
      style += 'text-system-warning';
      text = '대기중';
      break;
    case '예약 거절':
      src = rejected;
      style += 'text-system-error';
      text = '거절됨';
      break;
    case '예약 취소':
      src = rejected;
      style += 'text-system-error';
      text = '취소됨';
      break;
    default:
      src = '';
      break;
  }

  return (
    <div className={style}>
      <img src={src} alt={status} />
      {text}
    </div>
  );
};

export default ReservChips;
