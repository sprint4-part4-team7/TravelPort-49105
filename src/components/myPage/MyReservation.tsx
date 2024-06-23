import { useState } from 'react';
import { getMyReservation } from '@/apis/myReservation';
import { useUserStore } from '@/utils/Zustand';
import { Reservation } from '@/constants/Types';
import useModal from '@/hooks/useModal';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import RESERV_STATUS from '@/constants/Reserv';
import ReservationCard from '@/components/common/pagination/reservPagination/ReservationCard';
import ReservPagination from '@/components/common/pagination/reservPagination/ReservPagination';
import ReservChips from '@/components/myPage/ReservChips';
import ReservButton from '@/components/myPage/button/ReservButton';
import ReservButtonOutlined from '@/components/myPage/button/ReservButtonOutlined';
import CheckCancelMsg from '@/components/myPage/modal/CheckCancelMsg';
import ReservChipsExpired from '@/components/myPage/ReservChipsExpired';
import CancelReserv from '@/components/myPage/modal/CancelReserv';
import Loading from '../common/Loading';
import Button from '../common/button/Button';

const MyReservation = ({
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

  const LIMIT = 4;
  const isReservExpired = isExpired === 'true';

  const { isPending, data: myReservation } = useQuery({
    queryKey: ['myReservation', userInfo.id, pageNum, isExpired],
    queryFn: () => getMyReservation(userInfo.id, isExpired, pageNum - 1, LIMIT),
    enabled: !!userInfo.id,
  });
  const myReservationData = myReservation?.reservations as Reservation[];

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

  const upperRightChip = (state: number | null) => {
    return isReservExpired ? (
      <ReservChipsExpired status={state} />
    ) : (
      <ReservChips status={state} />
    );
  };

  const lowerRightButton = (
    state: number | null,
    cancelMessage: string,
    cancelId: number,
    reviewId?: number,
    reviewedId?: number,
  ) => {
    if (!isReservExpired) {
      return state === RESERV_STATUS.REJECTED ? (
        <ReservButton
          onClick={() => handleShowCancelMsg(cancelMessage || '')}
          status={state}
        />
      ) : (
        <ReservButtonOutlined
          status={RESERV_STATUS.CANCELED}
          onClick={() => handleCancel(cancelId)}
        />
      );
    }

    let buttonFnc;
    switch (state) {
      case RESERV_STATUS.PENDING:
        buttonFnc = () => handleReview(reviewId || 0);
        break;
      case RESERV_STATUS.REJECTED:
        buttonFnc = () => handleShowCancelMsg(cancelMessage || '');
        break;
      case RESERV_STATUS.CANCELED:
        buttonFnc = () => handleCancel(cancelId);
        break;
      case RESERV_STATUS.FINISHED:
        buttonFnc = () => handleReview(reviewId || 0);
        break;
      case RESERV_STATUS.REVIEWED:
        buttonFnc = () => handleReview(reviewedId || 0);
        break;
      default:
        buttonFnc = () => {};
    }

    return state === RESERV_STATUS.PENDING ? (
      <ReservButtonOutlined
        status={RESERV_STATUS.CANCELED}
        onClick={() => handleCancel(cancelId)}
      />
    ) : (
      <ReservButton status={state} onClick={buttonFnc} />
    );
  };
  if (isPending) {
    return (
      <div className="w-full">
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full gap-48">
      <div className="font-semibold text-20">예약 목록</div>
      {!!myReservation?.totalCount && myReservation?.totalCount >= 0 ? (
        <ReservPagination
          limit={LIMIT}
          pageNum={pageNum}
          setPageNum={setPageNum}
          allCardNum={myReservation?.totalCount || 0}
        >
          {myReservationData.map((reservation) => (
            <ReservationCard
              key={reservation.id}
              id={reservation.id}
              title={reservation.productOption.product.name}
              date={reservation.createdAt}
              time={reservation.timeTable}
              option={reservation.productOption?.optionName}
              userInfo={`파트너명 : ${reservation.productOption.product.user.name || '없음'} / 전화번호 : ${reservation.productOption.product.user.phone || '없음'}`}
              upperRight={upperRightChip(reservation.reservationState || 1)}
              lowerRight={lowerRightButton(
                reservation.reservationState || RESERV_STATUS.PENDING,
                reservation.cancelMsg || '',
                reservation.id,
                reservation.productOptionId,
                reservation.review?.id,
              )}
            />
          ))}
        </ReservPagination>
      ) : (
        <div className="flex flex-col items-center gap-16 px-16 py-24 font-medium text-center border-solid text-24 border-1 border-black-4 rounded-8">
          <span>앗! 예약한 내용이 없어요!</span>
          <span className="mb-16 text-16">둘러보며 예약해보세요!</span>
          <Button
            variant="floating"
            width="w-375 mobile:w-1/2"
            onClick={() => navigate('/')}
          >
            둘러보러 가기
          </Button>
        </div>
      )}
      {!!cancelMsg && (
        <CheckCancelMsg
          isOpen={isModalOpen}
          cancelMsg={cancelMsg}
          closeModal={closeModal}
        />
      )}
      {!!cancelReserv && (
        <CancelReserv
          isOpen={isModalOpen}
          id={cancelReserv}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};
export default MyReservation;
