import React, { useEffect, useState } from 'react';
import './Payments.css';
import usePaymentWidget from '@/hooks/payments/usePaymentWidget';
import useProductOptionQuery from '@/hooks/reactQuery/productOption/useProductOptionQuery';
import useTimeTableQuery from '@/hooks/reactQuery/timeTable/useTimeTableQuery';
import {
  useCartStore,
  useReservationStore,
  useUserStore,
} from '@/utils/Zustand';
import Layout from '@/components/common/layout/Layout';
import Pay from '@/components/payments/Pay';
import OrderSummary from '@/components/payments/OrderSummary';
import Loading from '@/components/common/Loading';

const CheckoutPage = () => {
  const { reservationInfo } = useReservationStore();
  const resetCart = useCartStore((state) => state.resetCart);

  useEffect(() => {
    resetCart();
  }, []);

  const optionId = reservationInfo?.productOptionId;
  const timeTableId = reservationInfo?.timeTableId;

  const { data: timeTableData } = useTimeTableQuery(timeTableId);
  const {
    productOption,
    isLoading: productOptionLoading,
    refetch: refetchProductOption,
  } = useProductOptionQuery(optionId);
  const userCount = productOption?.userCount;

  const { userInfo } = useUserStore();

  const productName = productOption?.optionName || 'Unknown'; // 상품 이름
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
  const maxUserCount = productOption?.maxUserCount || Infinity;
  const [count, setCount] = useState(reservationInfo?.ticketCount || 1);
  const optionPrice = reservationInfo.reservationPrice;
  const price = productOption?.optionPrice;
  const [isChecked, setIsChecked] = useState(true);
  const [refreshData, setRefreshData] = useState(false);

  const totalAmount = isChecked ? optionPrice * count : 0;
  const days = totalAmount / (price * userCount);

  const day =
    productOption?.product?.categoryId === 1
      ? `${formattedDate} ~ ${days} 박`
      : `${formattedDate} ${timeTableData?.startTimeOnly} ~ ${timeTableData?.endTimeOnly}`;

  const optionName =
    productOption?.product?.categoryId === 1
      ? `${productOption?.optionName} ( ${maxUserCount} 인실 )`
      : `${productOption?.optionName}`;

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

  const { requestPayment } = usePaymentWidget(
    totalAmount,
    productName,
    customerName,
    customerEmail,
  );

  useEffect(() => {
    if (
      productOption &&
      (productOption.optionName === undefined ||
        productOption.optionPrice === undefined)
    ) {
      setRefreshData(true);
    }
  }, [productOption]);

  useEffect(() => {
    if (refreshData) {
      refetchProductOption();
      setRefreshData(false);
    }
  }, [refreshData, refetchProductOption]);

  if (productOptionLoading || !productOption || !timeTableData) {
    return <Loading />;
  }

  return (
    <Layout>
      <div className="border-b-2 border-solid border-black-12 mt-100">
        <div className="px-8 py-16 font-semibold text-22">1. 결제확인</div>
      </div>

      <OrderSummary
        productOptionData={productOption}
        count={count}
        decreaseCount={decreaseCount}
        increaseCount={increaseCount}
        optionPrice={optionPrice}
        day={day}
        onCheckedChange={handleCheckedChange}
        isChecked={isChecked}
        userCount={userCount}
        optionName={optionName}
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
  );
};

export default CheckoutPage;
