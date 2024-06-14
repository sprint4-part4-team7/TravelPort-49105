import React, { useState } from 'react';
import minusPay from '@/assets/icons/minusPay.svg';
import plusPay from '@/assets/icons/plusPay.svg';
import useProductOptionQuery from '@/hooks/reactQuery/productOption/useProductOptionQuery';
import useTilmeTabaleQuery from '@/hooks/reactQuery/timeTable/useTimeTableQuery';

interface CartListProps {
  item: any;
  onSelect: (price: number, isSelected: boolean) => void;
}

const CartList = ({ item, onSelect }: CartListProps) => {
  console.log(item);
  const optionId = item?.productOption.id;
  const { productOption } = useProductOptionQuery(optionId);
  const timeTableId = item.timeTable.id;
  const { data: timeTableData } = useTilmeTabaleQuery(timeTableId);

  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    const year = date.getFullYear().toString().slice(2);
    const month = (date.getMonth() + 1).toString();
    const day = date.getDate().toString();
    return `${year}.${month}.${day}`;
  };

  const formattedDate = formatDate(timeTableData?.targetDate);

  const day =
    productOption?.product.categoryId === 1
      ? `${formattedDate}`
      : `${formattedDate} ${timeTableData?.startTimeOnly} ~ ${timeTableData?.endTimeOnly}`;

  const image = item?.productOption.product.thumbnail;
  const name = item?.productOption.product.name;
  const option = productOption?.optionName;
  const price = productOption?.optionPrice;
  const totalCout = item?.ticketCount;
  const maxCount = productOption?.maxUserCount;
  const [count, setCount] = useState(1);
  const [isSelected, setIsSelected] = useState(false);

  // useEffect(() => {
  //   if (isSelected) {
  //     const setCartInfo = useCartStore((state) => state.setCartInfo);
  //     const newCartInfo = {
  //       name,
  //       option,
  //       day,
  //       count,
  //       price,
  //       maxCount,
  //     };
  //     setCartInfo(newCartInfo);
  //   } else {
  //     const setCartInfo = useCartStore((state) => state.setCartInfo);
  //     const newCartInfo = {
  //       name: '',
  //       option: '',
  //       day: '',
  //       count: 0,
  //       price: 0,
  //       maxCount: 0,
  //     };
  //     setCartInfo(newCartInfo);
  //   }
  // }, [isSelected]);

  const handleSelect = () => {
    const newSelected = !isSelected;
    setIsSelected(newSelected);
    onSelect(price * count, newSelected);
  };

  const increaseCount = () => {
    setCount(count + 1);
  };

  const decreaseCount = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  return (
    <div className="flex items-center py-16 border-solid border-b-1 border-black-3">
      <div className="flex justify-between w-full mobile:flex-col">
        <div className="flex">
          <div className="flex items-center justify-center mr-12">
            <input
              type="checkbox"
              className="w-20 h-20"
              checked={isSelected}
              onChange={handleSelect}
            />
          </div>
          <div className="flex flex-col flex-grow">
            <div className="flex gap-12 mobile:flex-col">
              <div className="flex gap-12">
                <img
                  className="w-100 h-100"
                  src={image}
                  alt="예약 상품 이미지"
                />
                <div className="hidden mb-6 font-normal text-18 mobile:flex">
                  {name}
                </div>
              </div>
              <div>
                <div className="mb-6 font-normal text-18 mobile:hidden">
                  {name}
                </div>
                <div className="flex flex-row items-start gap-12 mobile:flex-col">
                  <div className="flex flex-row items-start gap-8">
                    <div className="font-normal text-16">옵션</div>
                    <div className="px-8 py-4 font-normal border-solid text-11 bg-black-3 border-1 border-black-5 rounded-4">
                      {option}
                    </div>
                  </div>
                  <div className="flex flex-row items-start gap-8">
                    <div className="font-normal text-16">날짜</div>
                    <div className="px-8 py-4 font-normal border-solid text-11 bg-black-3 border-1 border-black-5 rounded-4">
                      {day}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center ml-auto gap-60 mobile:justify-between mobile:w-full mobile:mt-40">
          <div className="flex gap-16 px-6 py-4 border-solid border-1 border-black-4 rounded-4">
            <button
              type="button"
              onClick={decreaseCount}
              className="outline-none"
              disabled={totalCout <= 1}
            >
              <img src={minusPay} alt="마이너스 아이콘" />
            </button>
            <div className="font-normal text-16">{totalCout}</div>
            <button
              type="button"
              onClick={increaseCount}
              className="outline-none"
              disabled={totalCout >= maxCount}
            >
              <img src={plusPay} alt="플러스 아이콘" />
            </button>
          </div>
          <div className="flex font-semibold text-18 ">
            {(price * count).toLocaleString()}원{' '}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartList;
