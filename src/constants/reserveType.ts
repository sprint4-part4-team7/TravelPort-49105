export type ReserveStatusType =
  | '예약 대기'
  | '예약 완료'
  | '예약 취소'
  | '예약 거절'
  | '예약대기';

export type ReserveProductOptionType = {
  optionName: string;
  product: {
    name: string;
  };
};
