import approved from '@/assets/icons/status-chip-approved.svg';
import pending from '@/assets/icons/status-chip-pending.svg';
import rejected from '@/assets/icons/status-chip-rejected.svg';
import RESERV_STATUS from '@/constants/reserv';

const ReservChips = ({ status }: { status: number | null }) => {
  let src;
  let style =
    'flex justify-center items-center gap-4 px-8 py-4 text-14 font-semibold ';
  let text = '';
  switch (status) {
    case RESERV_STATUS.PENDING:
      src = pending;
      style += 'text-system-warning';
      text = '대기중';
      break;
    case RESERV_STATUS.FINISHED:
      src = approved;
      style += 'text-blue-6';
      text = '수락됨';
      break;
    case RESERV_STATUS.REJECTED:
      src = rejected;
      style += 'text-system-error';
      text = '거절됨';
      break;
    case RESERV_STATUS.DELETED:
      src = rejected;
      style += 'text-system-error';
      text = '취소됨';
      break;
    default:
      src = pending;
      break;
  }

  return (
    <div className={style}>
      <img src={src} alt="예약 상태" />
      {text}
    </div>
  );
};

export default ReservChips;
