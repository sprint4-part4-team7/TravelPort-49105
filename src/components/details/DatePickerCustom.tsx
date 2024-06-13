/* eslint-disable prefer-const */
/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DatePickerCustom.css';
import { ko } from 'date-fns/locale/ko';
import { addDays, format, getDay, isBefore, subDays } from 'date-fns';

type DatePickerProps = {
  startDate: Date;
  setStartDate: React.Dispatch<React.SetStateAction<Date>>;
  endDate?: Date | null;
  setEndDate: React.Dispatch<React.SetStateAction<Date | null>>;
  categoryId: number;
  maxStartDate?: Date | null;
  minEndDate?: Date | null;
  holiday?: string[];
};

const DatePickerCustom = ({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  categoryId,
  maxStartDate = null,
  minEndDate = null,
  holiday = [],
}: DatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  // 휴일
  const isHoliday = (date: any) => {
    const day = getDay(date);
    return holiday.map(Number).includes(day);
  };

  // 오늘 이전 날
  const isPastDate = (date: Date) => {
    const today = new Date();
    return isBefore(date, today);
  };

  // 휴일, 오늘 이전 날 제외한 날
  const isWeekday = (date: Date) => {
    return !isHoliday(date) && !isPastDate(date);
  };

  // 첫 번째 휴일 전 날
  const findFirstHolidayBeforeEndDate = (start: Date, end: Date) => {
    let current = start;
    while (isBefore(current, end)) {
      if (isHoliday(current)) {
        return subDays(current, 1);
      }
      current = addDays(current, 1);
    }
    return end;
  };

  // start, end date update
  const handleDateChange = (dates: [Date, Date | null] | Date) => {
    if (Array.isArray(dates)) {
      let [start, end] = dates;
      if (categoryId === 1 && start && end) {
        end = findFirstHolidayBeforeEndDate(start, end);
      }
      setStartDate(start);
      setEndDate(end);
    } else {
      setStartDate(dates);
      setEndDate(null);
    }
  };

  // 숙박이 아닐 경우 endDate = null
  if (categoryId !== 1) setEndDate(null);

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
              minDate={maxStartDate}
              maxDate={minEndDate}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DatePickerCustom;
