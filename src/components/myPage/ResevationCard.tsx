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
  return (
    <div className="flex flex-col p-16 w-full max-w-834 gap-32 border-1 border-black-5 rounded-8">
      <div className="flex flex-col justify-between gap-32">
        <div className="flex flex-col gap-12">
          <div className="flex flex-row font-semibold justify-between">
            <div className="text-20">{reservation.title}</div>
            <div className="text-14 px-8 py-4">{reservation.status}</div>
          </div>
          <div className="text-16">{reservation.option}</div>
        </div>
        <div className="flex flex-row justify-between items-center">
          <div className="text-16">{reservation.date}</div>
          <div className="flex flex-row px-12 py-8 gap-4 text-14 font-semibold">
            후기 쓰기
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationCard;
