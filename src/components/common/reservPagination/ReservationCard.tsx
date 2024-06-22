import changeDateForm from '@/utils/changeDateForm';
import { ReactNode } from 'react';

interface ReservationCardProps {
  id: number;
  title: string;
  date: string;
  time?: {
    targetDate: string;
    startTimeOnly: string;
    endTimeOnly: string;
  };
  option?: string;
  userInfo?: string;
  upperRight?: ReactNode;
  lowerRight?: ReactNode;
}

const ReservationCard = ({
  id = 0,
  title,
  date,
  time,
  option,
  userInfo,
  upperRight,
  lowerRight,
}: ReservationCardProps) => {
  const formattedDate = changeDateForm(time?.targetDate || '');
  let duration =
    time?.startTimeOnly && time.endTimeOnly
      ? `${time?.startTimeOnly} ~ ${time?.endTimeOnly}`
      : time?.startTimeOnly || time?.endTimeOnly || '';
  if (duration === '00:00 ~ 23:59') duration = '1일권';
  const schedule = `일정 : ${formattedDate}${duration ? ', ' : ''}${duration}`;

  const reservDate = `예약일시 : ${changeDateForm(date)}`;

  return (
    <div
      id={id ? id.toString() : 'undefined'}
      className="flex flex-col p-16 w-full gap-32 border-1 border-black-5 rounded-8"
    >
      <div className="flex flex-col justify-between gap-32">
        <div className="flex flex-col gap-12">
          <div className="flex flex-row font-semibold justify-between">
            <div className="text-20 font-semibold">상품명 : {title}</div>
            <div className="text-16 font-semibold">{upperRight}</div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="text-14 text-black-10">옵션명 : {option}</div>
            <div className="text-14 text-black-10">{schedule}</div>
          </div>
          <div className="text-16 font-medium">{userInfo}</div>
        </div>
        <div className="flex flex-row justify-between items-center">
          <div className="text-16">{reservDate}</div>
          {lowerRight}
        </div>
      </div>
    </div>
  );
};

export default ReservationCard;
