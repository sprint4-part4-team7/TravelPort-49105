/* eslint-disable no-nested-ternary */
import APPROVE from '@/assets/icons/check-circle.svg';
import DENIED from '@/assets/icons/x-square-red.svg';
import CANCEL from '@/assets/icons/x-square.svg';
import { ReservProductOptionType, ReservStatusType } from '@/constants/types';
import instance from '@/utils/axios';
import { useState } from 'react';
import Button from '@/components/common/Button';
import ReservationCard from '@/components/common/reservPagination/ResevationCard';
import ReservChips from '@/components/myPage/ReservChips';
import ReservButtonOutlined from '@/components/myPage/ReservButtonOutlined';

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
              {/* <Button
                variant="default"
                outlined
                buttonStyle="flex gap-4 text-14 px-12 min-w-96 py-8 font-semibold rounded-8"
                onClick={handleApprove}
              >
                승인하기
                <img alt="승인" src={APPROVE} width={16} height={16} />
              </Button> */}
              <ReservButtonOutlined status={2} onClick={handleApprove} />
              {/* <Button
                variant="default"
                outlined
                buttonStyle="flex gap-4 text-14 px-12 py-8 min-w-96 h-fit 
                          text-system-error font-semibold border-system-error rounded-8
                          hover:border-system-error hover:text-system-error-bg
                          active:border-system-error active:text-system-error"
                onClick={handleReject}
              >
                거절하기
                <img alt="거절" src={DENIED} width={16} height={16} />
              </Button> */}
              <ReservButtonOutlined status={3} onClick={handleReject} />
            </div>
          </div>
        ) : state === 2 ? (
          <div className="flex flex-col gap-8 justify-between">
            <div className="absolute top-16 right-16 text-14 text-right font-semibold">
              승인됨
            </div>
            <div className="flex gap-8 items-center">
              <Button
                variant="more"
                outlined
                buttonStyle="flex gap-4 text-14 px-12 h-fit py-8 font-semibold rounded-8"
                onClick={handleStandby}
              >
                취소하기
                <img alt="취소" src={CANCEL} width={16} height={16} />
              </Button>
              {/* <Button
                variant="default"
                outlined
                buttonStyle="flex gap-4 text-14 px-12 py-8 h-fit 
                          text-system-error font-semibold border-system-error rounded-8
                          hover:border-system-error hover:text-system-error-bg
                          active:border-system-error active:text-system-error"
                onClick={handleReject}
              >
                거절하기
                <img alt="거절" src={DENIED} width={16} height={16} />
              </Button> */}
              <ReservButtonOutlined status={3} onClick={handleReject} />
            </div>
          </div>
        ) : state === 3 ? (
          <div className="flex flex-col gap-8 justify-between">
            <div className="absolute top-16 right-16 text-14 text-right font-semibold">
              거절됨
            </div>
            <div className="flex gap-8 items-center">
              <Button
                variant="default"
                outlined
                buttonStyle="flex gap-4 text-14 px-12 h-fit py-8 font-semibold rounded-8"
              >
                취소 사유 작성
                <img alt="승인" src={APPROVE} width={16} height={16} />
              </Button>
              <Button
                variant="default"
                outlined
                buttonStyle="flex gap-4 text-14 px-12 py-8 h-fit 
                          text-system-error font-semibold border-system-error rounded-8
                          hover:border-system-error hover:text-system-error-bg
                          active:border-system-error active:text-system-error"
                onClick={handleStandby}
              >
                거절 취소
                <img alt="거절" src={DENIED} width={16} height={16} />
              </Button>
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
