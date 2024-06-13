/* eslint-disable react/no-array-index-key */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import { CardListsType, DetailData } from '@/constants/types';
import minus from '@/assets/icons/minus.svg';
import plus from '@/assets/icons/plus.svg';
import { useState } from 'react';
import { formatDate } from '@/utils/getDate';
import { useReservationStore } from '@/utils/zustand';
import useTimeTable from '@/hooks/useTimeTable';
import useDatePicker from '@/hooks/useDatePicker';
import Button from '../common/Button';
import '@/styles/ProductDetails.css';
import DatePickerCustom from './DatePickerCustom';

interface ReservationProps {
  product: DetailData;
  options: CardListsType[];
  categoryId: number;
}

const Reservation = ({ product, options, categoryId }: ReservationProps) => {
  const [selectedOption, setSelectedOption] = useState(0);
  const [optionId, setOptionId] = useState(0);
  const [ticketNum, setTicketNum] = useState(0);
  const {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    maxStartDate,
    minEndDate,
  } = useDatePicker(product.id);
  console.log(startDate, endDate, maxStartDate, minEndDate);
  const { table } = useTimeTable(optionId);

  const getTableId = (timeTable: any) => {
    if (!timeTable) return 0;

    for (let i = 0; i < timeTable?.length; i++) {
      if (timeTable[i].targetDate.includes(formatDate(startDate)))
        return timeTable[i].id;
    }
    return 0;
  };

  const handleClick = (id: number) => {
    setSelectedOption(id);
  };

  const filteredOption = options.filter(
    (option) => option.id === selectedOption,
  );

  const handleTicketMinus = () => {
    if (ticketNum <= 0) return;
    setTicketNum(ticketNum - 1);
  };
  const handleTicketPlus = () => {
    if (
      !filteredOption[0]?.userCount ||
      ticketNum >= filteredOption[0].userCount
    )
      return;
    setTicketNum(ticketNum + 1);
  };

  // 상태관리
  const setReservationInfo = useReservationStore(
    (state) => state.setReservationInfo,
  );
  const handleUpdate = () => {
    const newReservationInfo = {
      userId: 1,
      productOptionId: optionId,
      timeTableId: getTableId(table),
      reservationState: '예약 대기',
      reservationPrice: filteredOption[0].optionPrice * ticketNum,
      ticketCount: ticketNum,
      cancelMsg: '',
    };
    setReservationInfo(newReservationInfo);
  };

  return (
    <div className="mt-40">
      <h1 className="my-20 text-24 font-bold">일정을 선택하세요</h1>
      <hr className="mb-20" />
      <div className="w-full mb-60">
        <DatePickerCustom
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          categoryId={categoryId}
          maxStartDate={maxStartDate}
          minEndDate={minEndDate}
        />
      </div>

      <h1 className="my-20 text-24 font-bold">회차를 선택하세요</h1>
      <hr className="mb-20" />
      <div className="grid mx-auto grid-cols-3 mobile:grid-cols-2 gap-16 text-14 font-semibold mb-60 cursor-pointer">
        {options.map((option) => {
          if (option.userCount === 0) {
            return (
              <div
                key={option.id}
                className="line flex flex-col justify-center items-center bg-black-3 text-black-6 border-black-4 border-1 rounded-4 h-60"
              >
                <div>{option.optionName}</div>
                <div className="font-normal">마감</div>
              </div>
            );
          }
          return (
            <div
              key={option.id}
              className={`flex justify-center items-center border-black-4 border-1 rounded-4 h-60 flex-1 ${selectedOption === option.id ? 'bg-blue-6 text-white' : ''}`}
              onClick={() => {
                handleClick(option.id);
                setTicketNum(0);
                setOptionId(option.id);
              }}
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
              className="w-40 h-40 flex justify-center items-center border-solid border-1 border-black-4 rounded-l-4 hover:bg-blue-6 cursor-pointer"
            >
              <img src={minus} alt="마이너스아이콘" />
            </div>
            <div className="w-40 h-40 flex justify-center items-center border-solid border-y-1 border-black-4">
              {ticketNum}
            </div>
            <div
              onClick={() => handleTicketPlus()}
              className="w-40 h-40 flex justify-center items-center border-solid border-1 border-black-4 rounded-r-4 hover:bg-blue-6 cursor-pointer"
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
          <Button outlined>장바구니 담기</Button>
        </div>
        <div className="w-2/3">
          <Button onClick={handleUpdate}>결제하기</Button>
        </div>
      </div>
    </div>
  );
};

export default Reservation;
