import { useEffect, useState } from 'react';
import { getMyReservation } from '@/apis/myReservation';
import { useUserStore } from '@/utils/zustand';
import { Reservation } from '@/constants/types';
import useModal from '@/hooks/useModal';
import ReservationCard from '@/components/common/reservPagination/ResevationCard';
import ReservPagination from '@/components/common/reservPagination/ReservPagination';
import ReservChips from '@/components/myPage/ReservChips';
import ReservButton from '@/components/myPage/ReservButton';
import ReservButtonOutlined from './ReservButtonOutlined';
import Modal from '../common/Modal';
import CancelMessage from './CancelMessage';
import ReservChipsExpired from './ReservChipsExpired';

const MyResevation = ({
  isExpired = 'false',
}: {
  isExpired?: 'true' | 'false';
}) => {
  const [pageNum, setPageNum] = useState(1);
  const userInfo = useUserStore((state) => state.userInfo);
  const [myReservation, setMyReservation] = useState<Reservation[]>([]); // [Reservation

  const isReservExpired = isExpired === 'true';
  const limit = 4;
  const start = (pageNum - 1) * limit;
  const end = start + limit;
  const slicedChildren = myReservation.slice(start, end);
  const [cancelMsg, setCancelMsg] = useState<string>('');
  const { isModalOpen, closeModal, openModal } = useModal();

  useEffect(() => {
    const fetchData = async () => {
      if (userInfo.id) {
        const response = await getMyReservation(userInfo.id, isExpired);
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
              title={reservation.productOption.product.name}
              upperRight={
                isReservExpired ? (
                  <ReservChipsExpired status={reservation.reservationState} />
                ) : (
                  <ReservChips status={reservation.reservationState} />
                )
              }
              lowerRight={
                reservation.reservationState === '예약 거절' ? (
                  <ReservButton
                    onClick={() => {
                      openModal();
                      setCancelMsg(reservation.cancelMsg || '');
                    }}
                    status={reservation.reservationState}
                  />
                ) : (
                  <ReservButtonOutlined status="예약 취소" />
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
      <Modal isOpen={isModalOpen} closeModal={closeModal}>
        <CancelMessage cancelMsg={cancelMsg} />
      </Modal>
    </div>
  );
};
export default MyResevation;
