import { ReactNode } from 'react';

interface ReservationCardProps {
  id: number;
  title: string;
  date: string;
  option?: string;
  upperRight?: ReactNode;
  lowerRight?: ReactNode;
}

const ReservationCard = ({
  id,
  title,
  date,
  option,
  upperRight,
  lowerRight,
}: ReservationCardProps) => {
  return (
    <div
      id={id.toString()}
      className="flex flex-col p-16 w-full max-w-834 gap-32 border-1 border-black-5 rounded-8"
    >
      <div className="flex flex-col justify-between gap-32">
        <div className="flex flex-col gap-12">
          <div className="flex flex-row font-semibold justify-between">
            <div className="text-20">{title}</div>
            {upperRight}
          </div>
          <div className="text-16">{option}</div>
        </div>
        <div className="flex flex-row justify-between items-center">
          <div className="text-16">{date}</div>
          {lowerRight}
        </div>
      </div>
    </div>
  );
};

export default ReservationCard;
