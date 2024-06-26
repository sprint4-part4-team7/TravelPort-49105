import RESERV_STATUS from '@/constants/Reserv';

const ReservChipsExpired = ({ status }: { status: number | null }) => {
  let color;
  let text;
  switch (status) {
    case RESERV_STATUS.PENDING:
      color = 'text-system-success';
      text = '구매완료';
      break;
    case RESERV_STATUS.FINISHED:
      color = 'text-blue-6';
      text = '사용완료';
      break;
    case RESERV_STATUS.REJECTED:
      color = 'text-system-error';
      text = '거절됨';
      break;
    case RESERV_STATUS.CANCELED:
      color = 'text-black-6';
      text = '취소완료';
      break;
    case RESERV_STATUS.REVIEWED:
      color = 'text-blue-6';
      text = '리뷰완료';
      break;

    default:
      color = 'text-black';
      text = '내역 없음';
  }

  return <div className={`p-4 text-14 font-semibold ${color}`}>{text}</div>;
};

export default ReservChipsExpired;
