import { useState } from 'react';
import info from '@/mocks/resevationInfo.json';
import ReservationCard from './ResevationCard';
import ReservPagination from '../common/ReservPagination';
import ReservChips from './ReservChips';
import ReservButton from './ReservButton';

const MyResevation = () => {
  const [pageNum, setPageNum] = useState(1);

  const limit = 4;
  const start = (pageNum - 1) * limit;
  const end = start + limit;
  const slicedChildren = info.slice(start, end);

  return (
    <div className="flex flex-col gap-48 w-full">
      <div className="text-20 font-semibold">예약 목록</div>
      {info.length > 0 ? (
        <ReservPagination
          limit={limit}
          pageNum={pageNum}
          setPageNum={setPageNum}
          allCardNum={info.length}
        >
          {slicedChildren.map((reservation) => (
            <ReservationCard
              id={reservation.id}
              date={reservation.date}
              option={reservation.option}
              title={reservation.title}
              upperRight={<ReservChips status={reservation.status} />}
              lowerRight={<ReservButton status={reservation.status} />}
            />
          ))}
        </ReservPagination>
      ) : (
        <div className="border-solid border-1 border-black-3 rounded-12 p-20">
          예약 목록이 없습니다.
        </div>
      )}
    </div>
  );
};
export default MyResevation;
