import Button from '../common/Button';

interface ReservationCardProps {
  reservation: {
    id: number;
    title: string;
    date: string;
    option: string;
    status: string;
  };
}

const ReservationCard = ({ reservation }: ReservationCardProps) => {
  const isDenied = reservation.status === '거절';

  return (
    <div
      className={`flex flex-row p-12 w-full h-120 justify-between border-1 border-black-5 rounded-9 ${isDenied ? 'bg-black-3' : ''}`}
    >
      <div className="flex flex-col justify-between">
        <div className="text-24">{reservation.title}</div>
        <div className="text-16">{reservation.option}</div>
        <div className="text-20">{reservation.date}</div>
      </div>
      <div className="flex flex-col justify-between">
        <div>{reservation.status}</div>
        {isDenied ? (
          <Button text="거절 사유" variant="cancel" />
        ) : (
          <Button text="예약 취소" />
        )}
      </div>
    </div>
  );
};

export default ReservationCard;
