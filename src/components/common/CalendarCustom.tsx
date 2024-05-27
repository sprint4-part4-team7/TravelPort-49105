import Calendar from 'react-calendar';
import { useState } from 'react';
import 'react-calendar/dist/Calendar.css';

type DatePiece = Date | null;
type SelectedDate = DatePiece | [DatePiece, DatePiece];

function CalendarCustom() {
  const [selectedDate, setSelectedDate] = useState<SelectedDate>(new Date());
  console.log(selectedDate, setSelectedDate);

  return (
    <div>
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        view="month"
        calendarType="gregory"
        showNeighboringMonth={false}
        // activeStartDate={new Date(2024, 5, 2)}
        defaultValue={[new Date(2024, 4, 4), new Date(2024, 7, 10)]}
        minDate={new Date(2024, 4, 4)}
        maxDate={new Date(2024, 7, 10)}
        tileDisabled={({ date, view }) =>
          view === 'month' && date.getDay() === 0
        }
        formatDay={(_, date) => date.toLocaleString('en', { day: 'numeric' })}
      />
    </div>
  );
}
export default CalendarCustom;
