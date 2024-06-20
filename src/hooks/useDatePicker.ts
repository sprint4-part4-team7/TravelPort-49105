import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import useProductByIdQuery from './reactQuery/product/useProductByIdQuery';

interface DatePickerValues {
  startDate: Date | null;
  setStartDate: Dispatch<SetStateAction<Date | null>>;
  endDate: Date | null;
  setEndDate: Dispatch<SetStateAction<Date | null>>;
  maxStartDate?: Date; // maxStartDate가 undefined 또는 Date 타입일 수 있음
  minEndDate?: Date; // minEndDate가 undefined 또는 Date 타입일 수 있음
  holiday?: any; // holiday가 undefined일 수 있음
  onChange: (dates: any) => void;
}

const useDatePicker = (productId?: number): DatePickerValues => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [maxStartDate, setMaxStartDate] = useState<Date | undefined>();
  const [minEndDate, setMinEndDate] = useState<Date | undefined>();
  const [holiday, setHoliday] = useState<any>();

  const fetchProductDetails = async (pId: number) => {
    try {
      const { productByProductId } = await useProductByIdQuery(pId); // await 추가

      const leftDate = productByProductId?.startDate; // 상품 판매 시작 날짜
      const rightDate = productByProductId?.endDate; // 상품 판매 종료 날짜
      setMaxStartDate(
        leftDate && new Date().getTime() >= new Date(leftDate).getTime()
          ? new Date()
          : new Date(leftDate),
      );
      setMinEndDate(
        rightDate && new Date().getTime() >= new Date(rightDate).getTime()
          ? new Date()
          : new Date(rightDate),
      );
      setHoliday(productByProductId?.closedDay);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  useEffect(() => {
    if (productId) {
      fetchProductDetails(productId);
    }
  }, [productId]);

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
