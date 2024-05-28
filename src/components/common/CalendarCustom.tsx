/* eslint-disable no-undef */
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

type DatePiece = Date | null;
type SelectedDate = DatePiece | [DatePiece, DatePiece];

interface CalendarCustomProps {
  startDate: Date;
  endDate: Date;
  selectedDate: SelectedDate;
  setSelectedDate: React.Dispatch<React.SetStateAction<SelectedDate>>;
}

const CalendarCustom = ({
  startDate,
  endDate,
  selectedDate,
  setSelectedDate,
}: CalendarCustomProps) => {
  return (
    <div>
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        view="month"
        calendarType="gregory"
        showNeighboringMonth={false}
        minDate={startDate}
        maxDate={endDate}
        tileDisabled={({ date, view }) =>
          view === 'month' && date.getDay() === 0
        }
        formatDay={(_, date) => date.toLocaleString('en', { day: 'numeric' })}
      />
    </div>
  );
};
export default CalendarCustom;
