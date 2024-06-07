/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import useCalendar from '@/hooks/useCalendar';
import { CardListsType, DetailData } from '@/constants/types';
import minus from '@/assets/icons/minus.svg';
import plus from '@/assets/icons/plus.svg';
import { useState } from 'react';
import CalendarCustom from '../common/CalendarCustom';
import Button from '../common/Button';

interface ReservationProps {
  product?: DetailData;
  options: CardListsType[];
}

const Reservation = ({ product, options }: ReservationProps) => {
  const { selectedDate, setSelectedDate } = useCalendar();
  const [selectedOption, setSelectedOption] = useState('');
  const [ticketNum, setTicketNum] = useState(0);

  const handleClick = (optionName: string) => {
    setSelectedOption(optionName);
  };

  const filteredOption = options.filter(
    (option) => option.optionName === selectedOption,
  );

  const handleTicketMinus = () => {
    if (ticketNum <= 0) return;
    setTicketNum(ticketNum - 1);
  };
  const handleTicketPlus = () => {
    if (ticketNum >= filteredOption[0].userCount) return;
    setTicketNum(ticketNum + 1);
  };

  const mockDate = '2024-05-27T03:05:19.935Z';
  const dateArray = mockDate.split('T')[0].split('-').map(Number);
  const startDate = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
  const endDate = new Date(2024, 7, 10);
  const holiday = ['0'].map(Number);
  return (
    <div className="mt-40">
      <h1 className="my-20 text-24 font-bold">일정을 선택하세요</h1>
      <hr className="mb-20" />
      <div className="w-full mb-60">
        <CalendarCustom
          startDate={startDate}
          endDate={endDate}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          holiday={holiday}
        />
      </div>

      <h1 className="my-20 text-24 font-bold">회차를 선택하세요</h1>
      <hr className="mb-20" />
      <div className="grid mx-auto grid-cols-3 gap-16 text-14 font-semibold mb-60 cursor-pointer">
        {options.map((option) => {
          if (option.userCount === 0) {
            return (
              <div className="flex flex-col justify-center items-center bg-black-3 text-black-6 border-black-4 border-1 rounded-4 h-60">
                <div>{option.optionName}</div>
                <div className="font-normal">마감</div>
              </div>
            );
          }
          return (
            <div
              className={`flex justify-center items-center border-black-4 border-1 rounded-4 h-60 flex-1 ${selectedOption === option.optionName ? 'bg-blue-6 text-white' : ''}`}
              onClick={() => handleClick(option.optionName)}
            >
              {option.optionName}
            </div>
          );
        })}
      </div>

      <h1 className="my-20 text-24 font-bold">수량을 선택하세요</h1>
      <hr className="mb-20" />
      <div className="flex justify-between mb-60">
        <div className="flex flex-col gap-8">
          <h2 className="text-20 font-semibold">{product?.name}</h2>
          <h3 className="text-17 font-semibold">
            {filteredOption.length &&
              filteredOption[0]?.optionPrice.toLocaleString()}
            원
          </h3>
        </div>
        <div className="flex flex-col gap-8">
          <div className="flex justify-end">
            <div
              onClick={() => handleTicketMinus()}
              className="w-40 h-40 flex justify-center items-center border-solid border-1 border-black-4 rounded-l-4 hover:bg-blue-6"
            >
              <img src={minus} alt="마이너스아이콘" />
            </div>
            <div className="w-40 h-40 flex justify-center items-center border-solid border-y-1 border-black-4">
              {ticketNum}
            </div>
            <div
              onClick={() => handleTicketPlus()}
              className="w-40 h-40 flex justify-center items-center border-solid border-1 border-black-4 rounded-r-4 hover:bg-blue-6"
            >
              <img src={plus} alt="플러스아이콘" />
            </div>
          </div>
          <h3 className="text-18 font-semibold text-end">
            {filteredOption.length &&
              (filteredOption[0].optionPrice * ticketNum).toLocaleString()}
            원
          </h3>
        </div>
      </div>
      <div className="flex gap-20 w-full pb-58">
        <div className="w-1/3">
          <Button outlined text="장바구니 담기" />
        </div>
        <div className="w-2/3">
          <Button text="결제하기" />
        </div>
      </div>
    </div>
  );
};

export default Reservation;
