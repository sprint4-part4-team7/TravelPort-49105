/* eslint-disable react/no-array-index-key */
/* eslint-disable array-callback-return */
import { CardListsType, DetailData } from '@/constants/Types';
import minus from '@/assets/icons/minus.svg';
import plus from '@/assets/icons/plus.svg';
import { useEffect, useState } from 'react';
import { formatDate } from '@/utils/GetDate';
import { useReservationStore, useUserStore } from '@/utils/Zustand';
import useTimeTable from '@/hooks/timeTable/useTimeTable';
import useDatePicker from '@/hooks/functionHooks/useDatePicker';
import { useNavigate } from 'react-router-dom';
import useCartPostMutation from '@/hooks/reactQuery/cart/useCartPostMutation';
import useModal from '@/hooks/functionHooks/useModal';
import RESERV_STATUS from '@/constants/Reserv';
import { toast } from 'react-toastify';
import instance from '@/utils/Axios';
import Button from '@/components/common/button/Button';
import '@/styles/productDetails.css';
import DatePickerCustom from './DatePickerCustom';
import DefaultModal from '../common/modal/DefaultModal';

interface ReservationProps {
  product: DetailData;
  options: CardListsType[];
  categoryId: number;
}

const Reservation = ({ product, options, categoryId }: ReservationProps) => {
  const [selectedOption, setSelectedOption] = useState(0);
  const [optionId, setOptionId] = useState(0);
  const [ticketNum, setTicketNum] = useState(0);
  const [isDisabled, setIsDisabled] = useState(true);
  const [diffDay, setDiffDay] = useState(0);
  const [remainCounts, setRemainCounts] = useState<number[]>([]);

  const { isModalOpen, openModal, closeModal } = useModal();
  const { table } = useTimeTable(optionId);

  const { userInfo } = useUserStore();
  const navigate = useNavigate();

  const optionTitle = categoryId === 1 ? '객실 종류' : '옵션';

  const {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    maxStartDate,
    minEndDate,
  } = useDatePicker(product?.id);

  useEffect(() => {
    if (
      ticketNum === 0 ||
      selectedOption === 0 ||
      (categoryId === 1 && !endDate) ||
      (categoryId === 2 && !startDate)
    )
      setIsDisabled(true);
    else setIsDisabled(false);

    if (startDate && endDate) {
      const diffTime = endDate.getTime() - startDate.getTime();
      const difference = diffTime / (1000 * 60 * 60 * 24);
      setDiffDay(difference);
    }
  }, [
    ticketNum,
    selectedOption,
    startDate,
    endDate,
    categoryId,
    isDisabled,
    diffDay,
  ]);

  const getTableId = (timeTable: any) => {
    if (!timeTable || !startDate) return 0;

    for (let i = 0; i < timeTable?.length; i++) {
      if (timeTable[i].targetDate?.includes(formatDate(startDate))) {
        return timeTable[i].id;
      }
    }
    return 0;
  };

  const getOptionRemainsByTable = (timeTable: any) => {
    if (startDate) {
      for (let i = 0; i < timeTable?.length; i++) {
        if (timeTable[i].targetDate?.includes(formatDate(startDate))) {
          return timeTable[i].remainCount;
        }
      }
    }
    return 0;
  };

  const fetchRemainCounts = async (optionIds: number[]) => {
    const newRemainCounts = await Promise.all(
      optionIds.map(async (id) => {
        const response = await instance.get(`/timeTable/productOption/${id}`);
        const tableData = response.data;
        return getOptionRemainsByTable(tableData);
      }),
    );
    setRemainCounts(newRemainCounts);
  };

  useEffect(() => {
    if (startDate && endDate) {
      const newOptionIds = options.map((option) => option.id);
      fetchRemainCounts(newOptionIds);
    } else {
      setRemainCounts([]);
    }
  }, [startDate, endDate, options]);

  const handleClick = (id: number) => {
    setSelectedOption(id);
  };

  const filteredOption =
    options && options?.filter((option) => option?.id === selectedOption);

  const handleTicketMinus = () => {
    if (ticketNum <= 0) return;
    setTicketNum(ticketNum - 1);
  };
  const handleTicketPlus = () => {
    if (ticketNum >= remainCounts[selectedOption - 1]) return;
    setTicketNum(ticketNum + 1);
  };

  // 상태관리
  const setReservationInfo = useReservationStore(
    (state) => state.setReservationInfo,
  );
  const handleUpdate = () => {
    if (!userInfo.id) {
      toast.error('로그인이 필요합니다.');
      navigate('/login');
      return;
    }
    const newReservationInfo = {
      userId: userInfo.id,
      productOptionId: optionId,
      timeTableId: getTableId(table),
      reservationState: RESERV_STATUS.PENDING,
      reservationPrice: filteredOption[0].optionPrice * ticketNum * diffDay,
      ticketCount: ticketNum,
      cancelMsg: '',
    };
    setReservationInfo(newReservationInfo);

    navigate('/payments');
  };

  const { mutate } = useCartPostMutation();
  const handleCartUpdate = () => {
    if (!userInfo.id) {
      toast.error('로그인이 필요합니다.');
      navigate('/login');
      return;
    }

    mutate({
      userId: userInfo.id,
      productOptionId: optionId,
      timeTableId: getTableId(table),
      ticketCount: ticketNum,
    });
  };

  return (
    <div className="mt-40">
      <h1 className="my-20 font-bold text-24">일정을 선택하세요</h1>
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

      <h1 className="my-20 font-bold text-24">{optionTitle}를 선택하세요</h1>
      <hr className="mb-20" />
      <div className="grid grid-cols-3 gap-16 mx-auto font-semibold cursor-pointer mobile:grid-cols-2 text-14 mb-60">
        {options.map((option, idx) => {
          if (remainCounts[idx] === 0) {
            return (
              <div
                key={option.id}
                className="flex flex-col items-center justify-center line bg-black-3 text-black-6 border-black-4 border-1 rounded-4 h-60"
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

      <h1 className="my-20 font-bold text-24">수량을 선택하세요</h1>
      <hr className="mb-20" />
      <div className="flex justify-between mb-60">
        <div className="flex flex-col gap-8">
          <h2 className="font-semibold text-20">{product?.name}</h2>
          <h3 className="font-semibold text-17">
            {filteredOption.length &&
              filteredOption[0]?.optionPrice.toLocaleString()}
            원
          </h3>
        </div>
        <div className="flex flex-col gap-8">
          <div className="flex justify-end">
            <div
              onClick={() => handleTicketMinus()}
              className="flex items-center justify-center w-40 h-40 border-solid cursor-pointer border-1 border-black-4 rounded-l-4 hover:bg-blue-6"
            >
              <img src={minus} alt="마이너스아이콘" />
            </div>
            <div className="flex items-center justify-center w-40 h-40 border-solid border-y-1 border-black-4">
              {ticketNum}
            </div>
            <div
              onClick={() => handleTicketPlus()}
              className="flex items-center justify-center w-40 h-40 border-solid cursor-pointer border-1 border-black-4 rounded-r-4 hover:bg-blue-6"
            >
              <img src={plus} alt="플러스아이콘" />
            </div>
          </div>
          <h3 className="font-semibold text-18 text-end">
            {filteredOption.length &&
              (categoryId === 1
                ? (
                    filteredOption[0].optionPrice *
                    ticketNum *
                    diffDay
                  ).toLocaleString()
                : (filteredOption[0].optionPrice * ticketNum).toLocaleString())}
            원
          </h3>
        </div>
      </div>
      <div className="flex w-full gap-20 pb-58">
        <div className="w-1/3">
          <Button
            outlined
            disabled={isDisabled}
            onClick={() => {
              openModal();
              handleCartUpdate();
            }}
          >
            장바구니 담기
          </Button>
        </div>
        <DefaultModal
          title="장바구니로 이동하시겠습니까?"
          isOpen={isModalOpen}
          closeModal={() => {
            closeModal();
          }}
          onConfirm={() => {
            closeModal();
            navigate('/cart');
          }}
        />
        <div className="w-2/3">
          <Button onClick={handleUpdate} disabled={isDisabled}>
            결제하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Reservation;
