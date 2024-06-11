/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import './Payments.css';
import usePaymentWidget from '@/hooks/usePaymentWidget';
import useProductOptionQuery from '@/hooks/reactQuery/product/useProductionOptionQuery';
import useTilmeTabaleOptionQuery from '@/hooks/reactQuery/timeTable/useTilmeTabaleOptionQuery';
import minusPay from '@/assets/icons/minusPay.svg';
import plusPay from '@/assets/icons/plusPay.svg';
import Layout from '@/components/common/layout/Layout';
import Footer from '@/components/common/Footer';
import Pay from '@/components/Pay';

const CheckoutPage = () => {
  const paymentAmount = 10000; // 결제 금액
  const productName = '7팀의 짱멋찐 여행 상품'; // 상품 이름
  const customerName = '박지윤'; // 고객 이름
  const customerEmail = 'parkjiyun3706@gmail.com'; // 고객 이메일
  const optionId = 4;

  const { requestPayment } = usePaymentWidget(
    paymentAmount,
    productName,
    customerName,
    customerEmail,
  );
  const {
    productionOption: productOptionData,
    isLoading,
    error,
  } = useProductOptionQuery(optionId);

  const [count, setCount] = useState(productOptionData?.userCount || 1);
  const optionPrice = productOptionData?.optionPrice || 0;
  const maxUserCount = productOptionData?.maxUserCount || Infinity;

  const increaseCount = () => {
    setCount(count + 1);
  };

  const decreaseCount = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const { data: timeTableOptionData } = useTilmeTabaleOptionQuery(optionId);

  if (isLoading) return <h1>loading...</h1>;
  if (error) return <h1>error...</h1>;

  return (
    <>
      <Layout>
        <div className="border-b-2 border-solid border-black-12 mt-100">
          <div className="px-8 py-16 font-semibold text-22">1. 결제확인</div>
        </div>

        <div className="flex items-center py-16 border-solid border-b-1 border-black-3">
          <div className="flex justify-between w-full mobile:flex-col">
            <div className="flex">
              {/* 체크박스 */}
              <div className="flex items-center justify-center mr-12">
                <input type="checkbox" className="w-20 h-20" />
              </div>
              {/* 상품 이름, 옵션, 날짜 */}
              <div className="flex flex-col flex-grow">
                <div className="mb-6 font-normal text-18">
                  {productOptionData?.product.name}
                </div>
                <div className="flex flex-row items-start gap-12 mobile:flex-col">
                  <div className="flex flex-row items-start gap-8">
                    <div className="font-normal text-16">옵션</div>
                    <div className="px-8 py-4 font-normal border-solid text-11 bg-black-3 border-1 border-black-5 rounded-4">
                      {productOptionData?.optionName}
                    </div>
                  </div>
                  <div className="flex flex-row items-start gap-8">
                    <div className="font-normal text-16">날짜</div>
                    <div className="px-8 py-4 font-normal border-solid text-11 bg-black-3 border-1 border-black-5 rounded-4">
                      24.06.12 ~ 24.06.13
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
                  disabled={count >= maxUserCount}
                >
                  <img src={plusPay} alt="플러스 아이콘" />
                </button>
              </div>
              <div className="flex font-semibold text-18 ">
                {(optionPrice * count).toLocaleString()}원
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-20 font-semibold mt-28 text-17 mb-100">
          <div>최종 결제 금액</div>
          <div className="ml-2">{(optionPrice * count).toLocaleString()}원</div>
        </div>

        <div className="border-b-2 border-solid border-black-12">
          <div className="px-8 py-16 font-semibold text-22">2. 결제수단</div>
        </div>

        <div className="flex flex-col items-center w-full ">
          <div className="w-570 mobile:w-400">
            <Pay requestPayment={requestPayment} />
          </div>
        </div>
      </Layout>
      <Footer />
    </>
  );
};

export default CheckoutPage;
