import { Dispatch, SetStateAction, useState } from 'react';

interface DatePickerValues {
  startDate: Date | null;
  setStartDate: Dispatch<SetStateAction<Date | null>>;
  endDate: Date | null;
  setEndDate: Dispatch<SetStateAction<Date | null>>;
  onChange: (dates: any) => void;
}

const useDatePicker = (): DatePickerValues => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

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
