import { useState } from 'react';

const useDatePicker = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);

  // 여기서의 startDate는 위 state와 다름. 데이터 받아올 때의 startDate임.(상품 판매 시작 날짜)
  const maxStartDate =
    startDate && new Date().getTime() >= startDate.getTime()
      ? new Date()
      : startDate;
  const minEndDate =
    endDate && new Date().getTime() >= endDate.getTime() ? new Date() : endDate;

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
  };
};

export default useDatePicker;
