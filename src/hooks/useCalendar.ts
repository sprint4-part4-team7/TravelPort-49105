import { useState } from 'react';

type DatePiece = Date | null;
type SelectedDate = DatePiece | [DatePiece, DatePiece];

const useCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<SelectedDate>(new Date());

  return {
    selectedDate,
    setSelectedDate,
  };
};

export default useCalendar;
