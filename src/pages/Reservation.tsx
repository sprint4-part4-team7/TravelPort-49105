import useCalendar from '@/hooks/useCalendar';
import CalendarCustom from '../components/common/CalendarCustom';

const Reservation = () => {
  const { selectedDate, setSelectedDate } = useCalendar();

  const mockDate = '2024-05-27T03:05:19.935Z';
  const dateArray = mockDate.split('T')[0].split('-').map(Number);
  const startDate = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
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
