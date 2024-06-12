import React, { useState } from 'react';
import './Payments.css';
import usePaymentWidget from '@/hooks/usePaymentWidget';
import useProductOptionQuery from '@/hooks/reactQuery/product/useProductionOptionQuery';
import useTilmeTabaleQuery from '@/hooks/reactQuery/timeTable/useTimeTableQuery';
import useTilmeTabaleOptionQuery from '@/hooks/reactQuery/timeTable/useTilmeTabaleOptionQuery';
import { useReservationStore, useUserStore } from '@/utils/zustand';
import Layout from '@/components/common/layout/Layout';
import Footer from '@/components/common/Footer';
import Pay from '@/components/Pay';
import OrderSummary from '@/components/OrderSummary';

const CheckoutPage = () => {
  const { reservationInfo } = useReservationStore();
  const optionId = reservationInfo?.productOptionId;

  const { data: timeTableOptionData } = useTilmeTabaleOptionQuery(optionId);
  const { data: timeTableData } = useTilmeTabaleQuery(2);
  const {
    productionOption: productOptionData,
    isLoading,
    error,
  } = useProductOptionQuery(optionId);
  const { userInfo } = useUserStore();

  const productName = productOptionData?.optionName || 'Unknown'; // 상품 이름
  const customerName = userInfo?.realName || 'Unknown'; // 고객 이름
  const customerEmail = userInfo?.email || 'Unknown'; // 고객 이메일

  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    const year = date.getFullYear().toString().slice(2);
    const month = (date.getMonth() + 1).toString();
    const day = date.getDate().toString();
    return `${year}.${month}.${day}`;
  };

  const formattedDate = formatDate(timeTableData?.targetDate);

  const day =
    productOptionData?.product.categoryId === 1
      ? `${formattedDate} ( ${timeTableOptionData?.length}박 )`
      : `${formattedDate} ${timeTableData?.startTimeOnly} ~ ${timeTableData?.endTimeOnly}`;

  const [count, setCount] = useState(productOptionData?.userCount || 1);
  const optionPrice = productOptionData?.optionPrice || 0;
  const maxUserCount = productOptionData?.maxUserCount || Infinity;
  const [isChecked, setIsChecked] = useState(true);

  const handleCheckedChange = (checked: boolean) => {
    setIsChecked(checked);
  };

  const increaseCount = () => {
    setCount(count + 1);
  };

  const decreaseCount = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const totalAmount = isChecked ? optionPrice * count : 0;

  const { requestPayment } = usePaymentWidget(
    totalAmount,
    productName,
    customerName,
    customerEmail,
  );

  if (isLoading) return <h1>loading...</h1>;
  if (error) return <h1>error...</h1>;

  return (
    <>
      <Layout>
        <div className="border-b-2 border-solid border-black-12 mt-100">
          <div className="px-8 py-16 font-semibold text-22">1. 결제확인</div>
        </div>

        <OrderSummary
          productOptionData={productOptionData}
          count={count}
          decreaseCount={decreaseCount}
          increaseCount={increaseCount}
          optionPrice={optionPrice}
          maxUserCount={maxUserCount}
          day={day}
          onCheckedChange={handleCheckedChange}
          isChecked={isChecked}
        />

        <div className="flex justify-end gap-20 font-semibold mt-28 text-17 mb-100">
          <div>최종 결제 금액</div>
          <div className="ml-2">{totalAmount.toLocaleString()}원</div>
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
