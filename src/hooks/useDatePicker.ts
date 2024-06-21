import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import useProductByIdQuery from './reactQuery/product/useProductByIdQuery';

interface DatePickerValues {
  startDate: Date | null;
  setStartDate: Dispatch<SetStateAction<Date | null>>;
  endDate: Date | null;
  setEndDate: Dispatch<SetStateAction<Date | null>>;
  maxStartDate?: Date;
  minEndDate?: Date;
  holiday?: any;
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
      const { productByProductId } = useProductByIdQuery(pId);

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
    } catch (error: any) {
      toast.error(error);
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
