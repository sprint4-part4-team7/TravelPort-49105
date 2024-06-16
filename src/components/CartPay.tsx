/* eslint-disable @typescript-eslint/no-shadow */
import React, { useState, useEffect } from 'react';

const CartPay = ({
  item,
  isChecked: initialChecked,
  onCheckboxChange,
}: any) => {
  const [isChecked, setIsChecked] = useState(initialChecked);

  useEffect(() => {
    setIsChecked(initialChecked);
  }, [initialChecked]);

  const handleCheckboxChange = (e: any) => {
    const isChecked = e.target.checked;
    setIsChecked(isChecked);
    onCheckboxChange(item.cartId, isChecked);
  };

  return (
    <div className="flex items-center py-16 border-solid border-b-1 border-black-3">
      <div className="flex justify-between w-full mobile:flex-col">
        <div className="flex">
          {/* 체크박스 */}
          <div className="flex items-center justify-center mr-12">
            <input
              type="checkbox"
              className="w-20 h-20"
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
          </div>
          {/* 상품 이름, 옵션, 날짜 */}
          <div className="flex flex-col flex-grow">
            <div className="mb-6 font-normal text-18">{item?.name}</div>
            <div className="flex flex-row items-start gap-12 mobile:flex-col">
              <div className="flex flex-row items-start gap-8">
                <div className="font-normal text-16">옵션</div>
                <div className="px-8 py-4 font-normal border-solid text-11 bg-black-3 border-1 border-black-5 rounded-4">
                  {item?.option}
                </div>
              </div>
              <div className="flex flex-row items-start gap-8">
                <div className="font-normal text-16">날짜</div>
                <div className="px-8 py-4 font-normal border-solid text-11 bg-black-3 border-1 border-black-5 rounded-4">
                  {item?.day}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 카운트와 가격 (모바일 화면에서만 아래로 이동) */}
        <div className="flex items-center gap-5 ml-auto mobile:justify-between mobile:w-full mobile:mt-10">
          <div className="flex font-semibold text-20 ">
            {item.price.toLocaleString()}원
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPay;
