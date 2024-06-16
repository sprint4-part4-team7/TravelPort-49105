const ReservChipsExpired = ({ status }: { status: number | null }) => {
  let color;
  let text;
  switch (status) {
    case null:
      color = 'text-system-success';
      text = '구매완료';
      break;
    case 1:
      color = 'text-system-success';
      text = '구매완료';
      break;
    case 2:
      color = 'text-blue-6';
      text = '사용완료';
      break;
    case 3:
      color = 'text-system-error';
      text = '거절됨';
      break;
    case 4:
      color = 'text-black-6';
      text = '취소완료';
      break;
    default:
      color = 'text-black';
      text = '내역 없음';
  }

  return <div className={`p-4 text-14 font-semibold ${color}`}>{text}</div>;
};

export default ReservChipsExpired;
