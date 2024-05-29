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
  holiday: number[];
}

const CalendarCustom = ({
  startDate,
  endDate,
  selectedDate,
  setSelectedDate,
  holiday,
}: CalendarCustomProps) => {
  const maxStartDate =
    new Date().getTime() >= startDate.getTime() ? new Date() : startDate;
  const minEndDate =
    new Date().getTime() >= endDate.getTime() ? new Date() : endDate;

  return (
    <Calendar
      onChange={setSelectedDate}
      value={selectedDate}
      view="month"
      calendarType="gregory"
      showNeighboringMonth={false}
      minDate={maxStartDate}
      maxDate={minEndDate}
      tileDisabled={({ date, view }) => {
        return (
          holiday.length > 0 &&
          view === 'month' &&
          holiday.includes(date.getDay())
        );
      }}
      formatDay={(_, date) => date.toLocaleString('en', { day: 'numeric' })}
    />
  );
};
export default CalendarCustom;
