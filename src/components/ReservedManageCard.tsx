/* eslint-disable no-nested-ternary */
// import DENIED from '@/assets/icons/x-square-red.svg';
// import CANCEL from '@/assets/icons/x-square.svg';
import { ReservProductOptionType, ReservStatusType } from '@/constants/types';
import instance from '@/utils/axios';
import { useState } from 'react';
import ARROW_UP_RIGHT from '@/assets/icons/arrow-up-right-blue.svg';
import useModal from '@/hooks/useModal';
import Button from '@/components/common/Button';
import ReservationCard from '@/components/common/reservPagination/ResevationCard';
import ReservChips from '@/components/myPage/ReservChips';
import ReservButtonOutlined from '@/components/myPage/ReservButtonOutlined';
import Modal from './common/Modal';
import RejectReservation from './myPage/Modal/RejectReservation';

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
  reservationState = 1,
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
    instance.put(`/reservation/${id}`, { reservationState: 2 });
    setState(2);
  };

  const handleReject = () => {
    instance.put(`/reservation/${id}`, { reservationState: 3 });
    setState(3);
  };

  const handleStandby = () => {
    instance.put(`/reservation/${id}`, { reservationState: 1 });
    setState(1);
  };

  return (
    <ReservationCard
      id={id}
      title={productOption.product.name}
      date={reserveDate}
      option={productOption.optionName}
      // schedule={`일정 : ${changeDateForm(timeTable.targetDate)}, ${timeTable.startTimeOnly} ~ ${timeTable.endTimeOnly}`}
      time={timeTable}
      userInfo={`예약자명 : ${user.name} / 전화번호 : ${user.phone}`}
      upperRight={<ReservChips status={state} />}
      lowerRight={
        state === 1 || state === null ? (
          <div className="flex flex-col mobile:flex-row gap-8 justify-end">
            <div className="absolute top-16 right-16 text-14 text-right font-semibold">
              대기중
            </div>
            <div className="flex gap-8 items-end tablet:flex-col mobile:justify-between">
              <ReservButtonOutlined status={2} onClick={handleApprove} />
              <ReservButtonOutlined status={3} onClick={handleReject} />
            </div>
          </div>
        ) : state === 2 ? (
          <div className="flex flex-col gap-8 justify-between">
            <div className="absolute top-16 right-16 text-14 text-right font-semibold">
              승인됨
            </div>
            <div className="flex gap-8 items-center">
              <ReservButtonOutlined status={4} onClick={handleStandby} />
              <ReservButtonOutlined status={3} onClick={handleReject} />
            </div>
          </div>
        ) : state === 3 ? (
          <div className="flex flex-col gap-8 justify-between">
            <div className="absolute top-16 right-16 text-14 text-right font-semibold">
              거절됨
            </div>
            <div className="flex gap-8 items-center">
              <ReservButtonOutlined status={4} onClick={handleStandby} />
              <Button
                variant="default"
                outlined
                buttonStyle="flex gap-4 text-14 p-8 w-fit h-fit font-semibold rounded"
                onClick={openModal}
              >
                거절 사유 작성
                <img alt="승인" src={ARROW_UP_RIGHT} width={16} height={16} />
              </Button>
              <Modal
                isOpen={isModalOpen}
                closeModal={closeModal}
                modal="w-full max-w-536"
              >
                <RejectReservation id={id} closeModal={closeModal} />
              </Modal>
            </div>
          </div>
        ) : state === 4 ? (
          <div className="flex flex-col gap-8 justify-between">
            <div className="absolute top-16 right-16 text-14 text-right font-semibold">
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
