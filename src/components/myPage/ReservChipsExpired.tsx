import { ReservStatusType } from '@/constants/types';

const ReservChipsExpired = ({ status }: { status: ReservStatusType }) => {
  let color;
  let text;
  switch (status) {
    case '예약 대기':
      color = 'text-system-success';
      text = '구매완료';
      break;
    case '예약 완료':
      color = 'text-blue-6';
      text = '사용완료';
      break;
    case '예약 취소':
      color = 'text-black-6';
      text = '취소완료';
      break;
    case '예약 거절':
      color = 'text-system-error';
      text = '거절됨';
      break;
    default:
      color = 'text-black';
      text = '내역 없음';
  }

  return <div className={`p-4 text-14 font-semibold ${color}`}>{text}</div>;
};

export default ReservChipsExpired;
