/* eslint-disable no-nested-ternary */
import { ReservProductOptionType, ReservStatusType } from '@/constants/Types';
import instance from '@/utils/Axios';
import { useState } from 'react';
import ARROW_UP_RIGHT from '@/assets/icons/arrowUpRightBlue.svg';
import useModal from '@/hooks/functionHooks/useModal';
import RESERV_STATUS from '@/constants/Reserv';
import Button from '@/components/common/button/Button';
import ReservationCard from '@/components/common/pagination/reservPagination/ReservationCard';
import ReservChips from '@/components/myPage/ReservChips';
import ReservButtonOutlined from '@/components/myPage/button/ReservButtonOutlined';
import Modal from '@/components/common/modal/Modal';
import WriteRejectReason from '@/components/myPage/modal/WriteRejectReason';
import RejectReservation from '@/components/myPage/modal/RejectReservation';

type ReserveProps = {
  id: number;
  reservationState: ReservStatusType;
  productOption: ReservProductOptionType;
  user: { name: string; phone: string };
  reserveDate: string;
  timeTable: {
    targetDate: string;
    startTimeOnly: string;
    endTimeOnly: string;
  };
};

const ReservedManageCard = ({
  id,
  reservationState = RESERV_STATUS.PENDING,
  productOption = {
    optionName: '',
    product: {
      name: '',
    },
  },
  user = { name: '', phone: '' },
  reserveDate = '',
  timeTable = { targetDate: '', startTimeOnly: '', endTimeOnly: '' },
}: ReserveProps) => {
  const [state, setState] = useState<ReservStatusType>(reservationState);

  const { isModalOpen, openModal, closeModal } = useModal();

  const handleApprove = () => {
    instance.put(`/reservation/${id}`, {
      reservationState: RESERV_STATUS.FINISHED,
    });
    setState(RESERV_STATUS.FINISHED);
  };

  const handleReject = () => {
    instance.put(`/reservation/${id}`, {
      reservationState: RESERV_STATUS.REJECTED,
    });
    setState(RESERV_STATUS.REJECTED);
  };

  const handleStandby = () => {
    instance.put(`/reservation/${id}`, {
      reservationState: RESERV_STATUS.PENDING,
    });
    setState(RESERV_STATUS.PENDING);
  };

  return (
    <ReservationCard
      id={id}
      title={productOption.product.name}
      date={reserveDate}
      option={productOption.optionName}
      time={timeTable}
      userInfo={`예약자명 : ${user.name} / 전화번호 : ${user.phone}`}
      upperRight={<ReservChips status={state} />}
      lowerRight={
        state === RESERV_STATUS.PENDING ? (
          <div className="flex flex-col justify-end gap-8 mobile:flex-row">
            <div className="absolute font-semibold text-right top-16 right-16 text-14">
              대기중
            </div>
            <div className="flex items-end gap-8 tablet:flex-col mobile:justify-between">
              <ReservButtonOutlined
                status={RESERV_STATUS.FINISHED}
                onClick={handleApprove}
              />
              <ReservButtonOutlined
                status={RESERV_STATUS.REJECTED}
                onClick={openModal}
              />
              <RejectReservation
                closeModal={closeModal}
                isOpen={isModalOpen}
                handleState={handleReject}
              />
            </div>
          </div>
        ) : state === RESERV_STATUS.FINISHED ? (
          <div className="flex flex-col justify-between gap-8">
            <div className="absolute font-semibold text-right top-16 right-16 text-14">
              승인됨
            </div>
            <div className="flex items-end gap-8 tablet:flex-col mobile:justify-between">
              <ReservButtonOutlined
                status={RESERV_STATUS.CANCELED}
                onClick={handleStandby}
              />
              <ReservButtonOutlined
                status={RESERV_STATUS.REJECTED}
                onClick={handleReject}
              />
            </div>
          </div>
        ) : state === RESERV_STATUS.REJECTED ? (
          <div className="flex flex-col justify-between gap-8">
            <div className="absolute font-semibold text-right top-16 right-16 text-14">
              거절됨
            </div>
            <div className="flex items-end gap-8 tablet:flex-col mobile:justify-between">
              <Button
                variant="default"
                outlined
                buttonStyle="flex gap-4 text-14 py-8 px-12 w-auto font-semibold rounded"
                onClick={openModal}
              >
                사유 작성
                <img alt="팝업" src={ARROW_UP_RIGHT} width={16} height={16} />
              </Button>
              <Modal
                isOpen={isModalOpen}
                closeModal={closeModal}
                modal="w-full max-w-536"
              >
                <WriteRejectReason id={id} closeModal={closeModal} />
              </Modal>
            </div>
          </div>
        ) : state === RESERV_STATUS.CANCELED ? (
          <div className="flex flex-col justify-between gap-8">
            <div className="absolute font-semibold text-right top-16 right-16 text-14">
              예약 취소함
            </div>
          </div>
        ) : (
          ''
        )
      }
    />
  );
};

export default ReservedManageCard;
