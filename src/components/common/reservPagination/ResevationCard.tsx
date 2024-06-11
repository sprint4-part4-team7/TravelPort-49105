import getDate from '@/utils/getDate';
import { ReactNode } from 'react';

interface ReservationCardProps {
  id: number;
  title?: string;
  date: string;
  time?: {
    startTimeOnly: string;
    endTimeOnly: string;
  };
  option?: string;
  schedule?: string;
  userInfo?: string;
  upperRight?: ReactNode;
  lowerRight?: ReactNode;
}

const ReservationCard = ({
  id,
  title,
  date,
  time,
  option,
  schedule,
  userInfo,
  upperRight,
  lowerRight,
}: ReservationCardProps) => {
  const formattedDate = getDate(date);
  const duration =
    time?.startTimeOnly && time.endTimeOnly
      ? `${time?.startTimeOnly} ~ ${time?.endTimeOnly}`
      : time?.startTimeOnly || time?.endTimeOnly || '';

  return (
    <div
      id={id.toString()}
      className="flex flex-col p-16 w-full max-w-834 gap-32 border-1 border-black-5 rounded-8"
    >
      <div className="flex flex-col justify-between gap-32">
        <div className="flex flex-col gap-12">
          <div className="flex flex-row font-semibold justify-between">
            <div className="text-20 font-semibold">{title}</div>
            <div className="text-16 font-semibold">{upperRight}</div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="text-14 text-black-10">{option}</div>
            <div className="text-14 text-black-10">{schedule}</div>
          </div>
          <div className="text-16 font-medium">{userInfo}</div>
        </div>
        <div className="flex flex-row justify-between items-center">
          <div className="text-16">{`${formattedDate} ${duration}`}</div>
          {lowerRight}
        </div>
      </div>
    </div>
  );
};

export default ReservationCard;
