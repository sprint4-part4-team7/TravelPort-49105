import useCalendar from '@/hooks/useCalendar';
import CalendarCustom from '../components/common/CalendarCustom';

const Reservation = () => {
  const { selectedDate, setSelectedDate } = useCalendar();

  const startDate = new Date(2024, 4, 4);
  const endDate = new Date(2024, 7, 10);
  const holiday = [0];

  return (
    <div className="w-[30rem]">
      <CalendarCustom
        startDate={startDate}
        endDate={endDate}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        holiday={holiday}
      />
    </div>
  );
};

export default Reservation;
