/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DatePickerCustom.css';
import { ko } from 'date-fns/locale/ko';
import { format, getDay } from 'date-fns';

type DatePickerProps = {
  startDate: Date;
  setStartDate: React.Dispatch<React.SetStateAction<Date>>;
  endDate?: Date | null;
  setEndDate: React.Dispatch<React.SetStateAction<Date | null>>;
  categoryId: number;
};

const DatePickerCustom = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  categoryId,
}: DatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const isWeekday = (date: any) => {
    const day = getDay(date);
    return day !== 3 && day !== 6;
  };

  if (categoryId !== 1) setEndDate(null);

  const handleDateChange = (dates: [Date | null, Date | null] | Date) => {
    if (Array.isArray(dates)) {
      const [start, end] = dates;
      setStartDate(start as Date);
      setEndDate(end);
    } else {
      setStartDate(dates as Date);
      setEndDate(null);
    }
  };

  return (
    <div className="flex gap-10">
      <div className="date-picker-container relative">
        <button
          className="border-2 border-blue-6 p-10 rounded-4 bg-white text-14 max-w-300"
          onClick={handleClick}
        >
          {format(startDate, 'yyyy-MM-dd')}
          {endDate && ` - ${format(endDate, 'yyyy-MM-dd')}`}
        </button>
        <div className="absolute top-70 w-full">
          {isOpen && (
            <DatePicker
              locale={ko}
              selected={startDate}
              onChange={handleDateChange}
              selectsRange={categoryId === 1}
              selectsStart={categoryId !== 1}
              startDate={startDate}
              endDate={endDate}
              inline
              dateFormat="yyyy년 MM월 dd일"
              dateFormatCalendar="yyyy년 MM월"
              placeholderText="날짜를 선택하세요."
              filterDate={isWeekday}
              showMonthDropdown
              useShortMonthInDropdown
              showYearDropdown
              scrollableYearDropdown
              dropdownMode="select"
              // includeDateIntervals={[
              //   { start: subDays(new Date(), 5), end: addDays(new Date(), 5) },
              // ]}
              // minDate={}
              // maxDate={}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DatePickerCustom;
