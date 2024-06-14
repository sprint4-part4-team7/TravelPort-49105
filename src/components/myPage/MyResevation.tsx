import { useState } from 'react';
import { getMyReservation } from '@/apis/myReservation';
import { useUserStore } from '@/utils/zustand';
import { Reservation } from '@/constants/types';
import useModal from '@/hooks/useModal';
import { useQuery } from '@tanstack/react-query';
import ReservationCard from '@/components/common/reservPagination/ResevationCard';
import ReservPagination from '@/components/common/reservPagination/ReservPagination';
import ReservChips from '@/components/myPage/ReservChips';
import ReservButton from '@/components/myPage/ReservButton';
import ReservButtonOutlined from '@/components/myPage/ReservButtonOutlined';
import Modal from '@/components/common/Modal';
import CancelMessage from '@/components/myPage/CancelMessage';
import ReservChipsExpired from '@/components/myPage/ReservChipsExpired';

const MyResevation = ({
  isExpired = 'false',
}: {
  isExpired?: 'true' | 'false';
}) => {
  const userInfo = useUserStore((state) => state.userInfo);
  const [cancelMsg, setCancelMsg] = useState<string>('');
  const { isModalOpen, closeModal, openModal } = useModal();
  const [pageNum, setPageNum] = useState(1);

  const limit = 5;
  const isReservExpired = isExpired === 'true';

  const myReservation = useQuery({
    queryKey: ['myReservation', userInfo.id, pageNum, isExpired],
    queryFn: () => getMyReservation(userInfo.id, isExpired, limit, pageNum - 1),
    enabled: !!userInfo.id,
  });

  const handleShowCancelMsg = (msg: string) => {
    openModal();
    setCancelMsg(msg);
  };
  const handleReview = () => {
    alert('후기 작성');
  };
  const handleCancel = () => {
    alert('취소하기');
  };

  const upperRightChip = (state: string) => {
    return isReservExpired ? (
      <ReservChipsExpired status={state} />
    ) : (
      <ReservChips status={state} />
    );
  };

  const lowerRightButton = (state: string, cancelMessage: string) => {
    if (!isReservExpired) {
      return state === '예약 거절' ? (
        <ReservButton
          onClick={() => handleShowCancelMsg(cancelMessage || '')}
          status={state}
        />
      ) : (
        <ReservButtonOutlined status="예약 취소" onClick={handleCancel} />
      );
    }
    let buttonFnc;
    switch (state) {
      case '예약 완료':
        buttonFnc = () => handleReview();
        break;
      case '예약 거절':
        buttonFnc = () => handleShowCancelMsg(cancelMessage || '');
        break;
      default:
        buttonFnc = () => {};
    }
    return <ReservButton status={state} onClick={buttonFnc} />;
  };

  const myReservationData = myReservation.data as Reservation[];

  return (
    <div className="flex flex-col gap-48 w-full">
      <div className="text-20 font-semibold">예약 목록</div>
      {myReservationData?.length > 0 ? (
        <ReservPagination
          limit={limit}
          pageNum={pageNum}
          setPageNum={setPageNum}
          allCardNum={myReservationData.length}
        >
          {myReservationData.map((reservation) => (
            <ReservationCard
              key={reservation.id}
              id={reservation.id}
              date={reservation.timeTable?.targetDate}
              option={reservation.productOption?.optionName}
              title={reservation.productOption.product.name}
              upperRight={upperRightChip(
                reservation.reservationState || '예약 대기',
              )}
              lowerRight={lowerRightButton(
                reservation.reservationState || '예약 대기',
                reservation.cancelMsg || '',
              )}
            />
          ))}
        </ReservPagination>
      ) : (
        <div className="border-solid border-1 border-black-3 rounded-12 p-20">
          예약 목록이 없습니다.
        </div>
      )}
      <Modal isOpen={isModalOpen} closeModal={closeModal}>
        {!!cancelMsg && <CancelMessage cancelMsg={cancelMsg} />}
      </Modal>
    </div>
  );
};
export default MyResevation;
