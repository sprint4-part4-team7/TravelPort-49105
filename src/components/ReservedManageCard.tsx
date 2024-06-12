import APPROVE from '@/assets/icons/check-circle.svg';
import DENIED from '@/assets/icons/x-square-red.svg';
import {
  ReserveProductOptionType,
  ReserveStatusType,
} from '@/constants/reserveType';
import Button from '@/components/common/Button';

type ReserveProps = {
  id: number;
  reservationState: ReserveStatusType;
  productOption: ReserveProductOptionType;
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
  reservationState = '예약 대기',
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
  return (
    <div
      id={id.toString()}
      className="flex gap-12 p-16 justify-between items-center
                    border-1 border-solid border-black-6 rounded-8"
    >
      <div className="flex flex-col gap-12 ">
        <div className="text-20 font-semibold">
          상품명 : {productOption.product.name}
        </div>
        <div className="text-14 text-black-10">
          옵션명 : {productOption.optionName}, 일정 : {timeTable.targetDate},{' '}
          {timeTable.startTimeOnly} ~ {timeTable.endTimeOnly}
        </div>
        <div className="text-16 font-medium">
          예약자명 : {user.name} / 전화번호 : {user.phone}
        </div>
        <div className="text-12 font-medium text-black-6">
          예약일시 : {reserveDate}
        </div>
      </div>
      {(reservationState === '예약 대기' || reservationState === 'string') && (
        <div className="flex gap-8 items-center">
          <Button
            variant="default"
            outlined
            buttonStyle="flex gap-4 text-14 px-12 h-fit py-8 font-semibold rounded-8"
          >
            승인하기
            <img alt="승인" src={APPROVE} width={16} height={16} />
          </Button>
          <Button
            variant="default"
            outlined
            buttonStyle="flex gap-4 text-14 px-12 py-8 h-fit 
                        text-system-error font-semibold border-system-error rounded-8
                        hover:border-system-error hover:text-system-error-bg
                        active:border-system-error active:text-system-error"
          >
            거절하기
            <img alt="거절" src={DENIED} width={16} height={16} />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReservedManageCard;
