import { useState } from 'react';
import { getMyReservation } from '@/apis/myReservation';
import { useUserStore } from '@/utils/zustand';
import { Reservation } from '@/constants/types';
import useModal from '@/hooks/useModal';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import ReservationCard from '@/components/common/reservPagination/ResevationCard';
import ReservPagination from '@/components/common/reservPagination/ReservPagination';
import ReservChips from '@/components/myPage/ReservChips';
import ReservButton from '@/components/myPage/ReservButton';
import ReservButtonOutlined from '@/components/myPage/ReservButtonOutlined';
import Modal from '@/components/common/Modal';
import CheckCancelMsg from '@/components/myPage/modal/CheckCancelMsg';
import ReservChipsExpired from '@/components/myPage/ReservChipsExpired';
import CancelReserv from './modal/CancelReserv';

const MyResevation = ({
  isExpired = 'false',
}: {
  isExpired?: 'true' | 'false';
}) => {
  const userInfo = useUserStore((state) => state.userInfo);
  const [cancelMsg, setCancelMsg] = useState<string>('');
  const [cancelReserv, setCancelReserv] = useState<number>(0);
  const { isModalOpen, closeModal, openModal } = useModal();
  const [pageNum, setPageNum] = useState(1);
  const navigate = useNavigate();

  const limit = 5;
  const isReservExpired = isExpired === 'true';

  const myReservation = useQuery({
    queryKey: ['myReservation', userInfo.id, pageNum, isExpired],
    queryFn: () => getMyReservation(userInfo.id, isExpired, limit, pageNum - 1),
    enabled: !!userInfo.id,
  });
  const myReservationData = myReservation.data as Reservation[];

  const handleShowCancelMsg = (msg: string) => {
    openModal();
    setCancelMsg(msg || '거절 사유가 없습니다');
  };
  const handleReview = (id: number) => {
    navigate(`/review/${id}`);
  };
  const handleCancel = (id: number) => {
    openModal();
    setCancelReserv(id);
  };

  const upperRightChip = (state: string) => {
    return isReservExpired ? (
      <ReservChipsExpired status={state} />
    ) : (
      <ReservChips status={state} />
    );
  };

  const lowerRightButton = (
    state: string,
    cancelMessage: string,
    cancelId: number,
    reviewId?: number,
  ) => {
    if (!isReservExpired) {
      return state === '예약 거절' ? (
        <ReservButton
          onClick={() => handleShowCancelMsg(cancelMessage || '')}
          status={state}
        />
      ) : (
        <ReservButtonOutlined
          status="예약 취소"
          onClick={() => handleCancel(cancelId)}
        />
      );
    }

    let buttonFnc;
    switch (state) {
      case '예약 완료':
        buttonFnc = () => handleReview(reviewId || 0);
        break;
      case '예약 거절':
        buttonFnc = () => handleShowCancelMsg(cancelMessage || '');
        break;
      case '예약 취소':
        buttonFnc = () => handleCancel(cancelId);
        break;
      default:
        buttonFnc = () => {};
    }

    return state === '예약 대기' ? (
      <ReservButtonOutlined
        status="예약 취소"
        onClick={() => handleCancel(cancelId)}
      />
    ) : (
      <ReservButton status={state} onClick={buttonFnc} />
    );
  };

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
              title={reservation.productOption.product.name}
              date={reservation.createdAt}
              time={reservation.timeTable}
              option={reservation.productOption?.optionName}
              userInfo={`파트너명 : ${reservation.productOption.product.user.name} / 전화번호 : ${reservation.productOption.product.user.phone || '없음'}`}
              upperRight={upperRightChip(
                reservation.reservationState || '예약 대기',
              )}
              lowerRight={lowerRightButton(
                reservation.reservationState || '예약 대기',
                reservation.cancelMsg || '',
                reservation.id,
                reservation.productOptionId,
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
        {!!cancelMsg && (
          <CheckCancelMsg cancelMsg={cancelMsg} closeModal={closeModal} />
        )}
        {!!cancelReserv && (
          <CancelReserv id={cancelReserv} closeModal={closeModal} />
        )}
      </Modal>
    </div>
  );
};
export default MyResevation;
