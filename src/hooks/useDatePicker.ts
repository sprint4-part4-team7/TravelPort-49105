import { useState } from 'react';

const useDatePicker = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);

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
  };
};

export default useDatePicker;
