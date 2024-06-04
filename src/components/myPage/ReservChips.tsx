import approved from '@/assets/icons/status-approved.svg';
import pending from '@/assets/icons/status-pending.svg';
import rejected from '@/assets/icons/status-rejected.svg';

const ReservChips = ({ status }: { status: string }) => {
  let src;
  switch (status) {
    case 'approved':
      src = approved;
      break;
    case 'pending':
      src = pending;
      break;
    case 'rejected':
      src = rejected;
      break;
    default:
      src = '';
      break;
  }

  return <img src={src} alt={status} />;
};

export default ReservChips;
