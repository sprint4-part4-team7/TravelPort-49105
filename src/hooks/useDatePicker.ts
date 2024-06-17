import { useState } from 'react';
import useProductByIdQuery from './reactQuery/product/useProductByIdQuery';

const useDatePicker = (productId?: number) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  let maxStartDate;
  let minEndDate;
  let holiday;
  if (productId) {
    const { productByProductId } = useProductByIdQuery(productId);
    const leftDate = productByProductId.startDate; // 상품 판매 시작 날짜
    const rightDate = productByProductId.endDate; // 상품 판매 종료 날짜
    maxStartDate =
      leftDate && new Date().getTime() >= new Date(leftDate).getTime()
        ? new Date()
        : new Date(leftDate);
    minEndDate =
      rightDate && new Date().getTime() >= new Date(rightDate).getTime()
        ? new Date()
        : new Date(rightDate);

    holiday = productByProductId.closedDay;
  }

  const onChange = (dates: any) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  return {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    onChange,
    maxStartDate,
    minEndDate,
    holiday,
  };
};

export default useDatePicker;
