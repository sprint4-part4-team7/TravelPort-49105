import { useState } from 'react';
import info from '@/mocks/resevationInfo.json';
import ReservationCard from './ResevationCard';
import ReservPagination from '../common/ReservPagination';

const MyResevation = () => {
  const [pageNum, setPageNum] = useState(1);
  return (
    <div className="flex flex-col gap-48 w-full">
      <div className="text-20 font-semibold">예약 목록</div>
      {info.length > 0 ? (
        <ReservPagination
          limit={4}
          pageNum={pageNum}
          setPageNum={setPageNum}
          allCardNum={info.length}
        >
          {info.map((reservation) => (
            <ReservationCard reservation={reservation} />
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
