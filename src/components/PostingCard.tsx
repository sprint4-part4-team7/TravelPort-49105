import changeDateForm from '@/utils/changeDateForm';
import { ReactNode } from 'react';

interface PostingCardProps {
  id: number;
  title: string;
  postingDate: string;
  salePeriod?: {
    startDate: string;
    endDate: string;
  };
  option?: string;
  upperRight?: ReactNode;
  lowerRight?: ReactNode;
}

const PostingCard = ({
  id = 0,
  title,
  postingDate,
  salePeriod,
  option,
  upperRight,
  lowerRight,
}: PostingCardProps) => {
  const duration =
    salePeriod?.startDate && salePeriod?.endDate
      ? `${changeDateForm(salePeriod?.startDate)} ~ ${changeDateForm(salePeriod?.endDate)}`
      : salePeriod?.startDate || salePeriod?.endDate || '';
  const salePeriodStr = `판매 기간 : ${duration}`;
  const postingDateStr = `게시일 : ${changeDateForm(postingDate)}`;
  return (
    <div
      id={id ? id.toString() : 'undefined'}
      className="flex flex-col p-16 w-full max-w-834 gap-32 border-1 border-black-5 rounded-8"
    >
      <div className="flex flex-col justify-between gap-32">
        <div className="flex flex-col gap-12">
          <div className="flex flex-row font-semibold justify-between">
            <div className="text-20 font-semibold">상품명 : {title}</div>
            <div className="text-16 font-semibold">{upperRight}</div>
          </div>
          <div className="flex flex-col gap-6">
            {option && (
              <div className="text-14 text-black-10">옵션명 : {option}</div>
            )}
            {salePeriod && (
              <div className="text-14 text-black-10">{salePeriodStr}</div>
            )}
          </div>
        </div>
        <div className="flex flex-row justify-between items-center">
          <div className="text-16">{postingDateStr}</div>
          {lowerRight}
        </div>
      </div>
    </div>
  );
};

export default PostingCard;
