/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DatePickerCustom.css';
import { ko } from 'date-fns/locale/ko';
import { format, getDay } from 'date-fns';

type DatePickerProps = {
  startDate: Date;
  endDate: Date | null;
  onChange: (dates: any) => void;
};

const DatePickerCustom = ({
  startDate,
  endDate,
  onChange,
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
              onChange={onChange}
              selectsRange
              startDate={startDate}
              endDate={endDate}
              inline
              dateFormat="yyyy년 MM월 dd일"
              dateFormatCalendar="yyyy년 MM월"
              placeholderText="날짜를 선택하세요."
              filterDate={isWeekday}
              highlightDates={[new Date()]}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DatePickerCustom;
