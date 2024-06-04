import { useState } from 'react';
import info from '@/mocks/resevationInfo.json';
import ReservationCard from '@/components/common/reservPagination/ResevationCard';
import ReservPagination from '@/components/common/reservPagination/ReservPagination';
import ReservChips from '@/components/myPage/ReservChips';
import ReservButton from '@/components/myPage/ReservButton';

const ResevationPaginationExample = () => {
  const [pageNum, setPageNum] = useState(1);

  // 예시를 위해 mock 데이터를 쪼개는 용도로 사용
  // 실제로는 서버에서 받아온 데이터를 사용
  const limit = 4;
  const start = (pageNum - 1) * limit;
  const end = start + limit;
  const slicedChildren = info.slice(start, end);

  return (
    <div className="flex flex-col gap-48 w-full">
      <div className="text-20 font-semibold">예약 목록</div>
      {info.length > 0 ? (
        // 페이지네이션으로 설정한 뒤 한 번 감싸준다
        <ReservPagination
          limit={limit}
          pageNum={pageNum}
          setPageNum={setPageNum}
          allCardNum={info.length}
        >
          {/* 불러온 데이터를 map으로 돌려서 ReservationCard로 만들어준다 */}
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
export default ResevationPaginationExample;
