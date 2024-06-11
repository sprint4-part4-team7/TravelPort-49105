import { useEffect, useState } from 'react';
// import info from '@/mocks/resevationInfo.json';
import { getMyReservation } from '@/apis/myReservation';
import { useUserStore } from '@/utils/zustand';
import { Reservation } from '@/constants/types';
import ReservationCard from '@/components/common/reservPagination/ResevationCard';
import ReservPagination from '@/components/common/reservPagination/ReservPagination';
import ReservChips from '@/components/myPage/ReservChips';
import ReservButton from '@/components/myPage/ReservButton';
import ReservButtonOutlined from './ReservButtonOutlined';

const MyResevation = () => {
  const [pageNum, setPageNum] = useState(1);
  const userInfo = useUserStore((state) => state.userInfo);
  const [myReservation, setMyReservation] = useState<Reservation[]>([]); // [Reservation

  const limit = 4;
  const start = (pageNum - 1) * limit;
  const end = start + limit;
  const slicedChildren = myReservation.slice(start, end);

  useEffect(() => {
    const fetchData = async () => {
      if (userInfo.id) {
        const response = await getMyReservation(userInfo.id);
        setMyReservation(response);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-48 w-full">
      <div className="text-20 font-semibold">예약 목록</div>
      {myReservation.length > 0 ? (
        <ReservPagination
          limit={limit}
          pageNum={pageNum}
          setPageNum={setPageNum}
          allCardNum={myReservation.length}
        >
          {slicedChildren.map((reservation) => (
            <ReservationCard
              id={reservation.id}
              date={reservation.timeTable?.targetDate}
              option={reservation.productOption?.optionName}
              title={reservation.productOption?.optionName}
              upperRight={<ReservChips status={reservation.reservationState} />}
              lowerRight={
                reservation.reservationState === 'rejected' ? (
                  <ReservButton status={reservation.reservationState} />
                ) : (
                  <ReservButtonOutlined />
                )
              }
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
