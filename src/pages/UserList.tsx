import { useState } from 'react';
import CalendarCustom from '../components/common/CalendarCustom';

type DatePiece = Date | null;
type SelectedDate = DatePiece | [DatePiece, DatePiece];

function UserList() {
  const [selectedDate, setSelectedDate] = useState<SelectedDate>(new Date());
  console.log(selectedDate, setSelectedDate);

  const startDate = new Date(2024, 4, 4);
  const maxStartDate =
    new Date().getTime() >= startDate.getTime() ? new Date() : startDate;
  const endDate = new Date(2024, 7, 10);
  const minEndDate =
    new Date().getTime() >= endDate.getTime() ? new Date() : endDate;
  return (
    <CalendarCustom
      startDate={maxStartDate}
      endDate={minEndDate}
      selectedDate={selectedDate}
      setSelectedDate={setSelectedDate}
    />
  );
}

export default UserList;
