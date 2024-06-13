import React, { useState } from 'react';
import minusPay from '@/assets/icons/minusPay.svg';
import plusPay from '@/assets/icons/plusPay.svg';

const CartList = () => {
  // productOptionData?.userCount || 1
  const [count, setCount] = useState(1);
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
          {/* 체크박스 */}
          <div className="flex items-center justify-center mr-12">
            <input type="checkbox" className="w-20 h-20" />
          </div>
          {/* 상품 이름, 옵션, 날짜 */}
          <div className="flex flex-col flex-grow">
            <div className="flex gap-12 mobile:flex-col">
              <div className="flex gap-12">
                <img
                  className="w-100 h-100"
                  src="https://pix8.agoda.net/hotelImages/13870752/-1/46c49f5ed243a4cdb5350e7dc94e588a.png?ca=13&ce=1&s=1024x"
                  alt="예약 상품 이미지"
                />
                <div className="hidden mb-6 font-normal text-18 mobile:flex">
                  상품이름
                </div>
              </div>

              <div>
                <div className="mb-6 font-normal text-18 mobile:hidden">
                  상품이름
                </div>
                <div className="flex flex-row items-start gap-12 mobile:flex-col">
                  <div className="flex flex-row items-start gap-8">
                    <div className="font-normal text-16">옵션</div>
                    <div className="px-8 py-4 font-normal border-solid text-11 bg-black-3 border-1 border-black-5 rounded-4">
                      상품옵션
                    </div>
                  </div>
                  <div className="flex flex-row items-start gap-8">
                    <div className="font-normal text-16">날짜</div>
                    <div className="px-8 py-4 font-normal border-solid text-11 bg-black-3 border-1 border-black-5 rounded-4">
                      날짜
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 카운트와 가격 (모바일 화면에서만 아래로 이동) */}
        <div className="flex items-center ml-auto gap-60 mobile:justify-between mobile:w-full mobile:mt-40">
          <div className="flex gap-16 px-6 py-4 border-solid border-1 border-black-4 rounded-4">
            <button
              type="button"
              onClick={decreaseCount}
              className="outline-none"
              disabled={count <= 1}
            >
              <img src={minusPay} alt="마이너스 아이콘" />
            </button>
            <div className="font-normal text-16">{count}</div>
            <button
              type="button"
              onClick={increaseCount}
              className="outline-none"
              disabled={count >= 10}
            >
              <img src={plusPay} alt="플러스 아이콘" />
            </button>
          </div>
          <div className="flex font-semibold text-18 ">100000원</div>
        </div>
      </div>
    </div>
  );
};

export default CartList;
