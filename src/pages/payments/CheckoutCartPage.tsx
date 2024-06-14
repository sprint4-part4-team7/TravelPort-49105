import React, { useState } from 'react';
import './Payments.css';

import { useCartStore, useUserStore } from '@/utils/zustand';
import usePaymentWidget from '@/hooks/usePaymentWidget';
import Layout from '@/components/common/layout/Layout';
import Footer from '@/components/common/Footer';
import CartPay from '@/components/CartPay';
import Pay from '@/components/Pay';

interface CartItem {
  cartId: number;
  price: number;
  count: number;
}

interface CheckedItems {
  [key: number]: boolean;
}

const CheckoutCartPage = () => {
  const { cartInfo } = useCartStore();
  const { userInfo } = useUserStore();

  const productName = `${cartInfo[0]}외 ${cartInfo.length}`;
  const customerName = userInfo?.realName || 'Unknown';
  const customerEmail = userInfo?.email || 'Unknown';

  // 모든 항목을 처음부터 체크된 상태로 초기화
  const initialCheckedItems = cartInfo.reduce(
    (acc: CheckedItems, item: CartItem) => {
      acc[item.cartId] = true;
      return acc;
    },
    {},
  );

  const [checkedItems, setCheckedItems] =
    useState<CheckedItems>(initialCheckedItems);

  // 체크박스 상태 변경 핸들러
  const handleCheckboxChange = (cartId: number, isChecked: boolean) => {
    setCheckedItems((prev) => ({
      ...prev,
      [cartId]: isChecked,
    }));
  };

  // 체크된 항목들의 총 금액 계산
  const totalAmount = cartInfo?.reduce((total, item) => {
    if (checkedItems[item.cartId]) {
      return total + item.price * item.count;
    }
    return total;
  }, 0);

  const { requestPayment } = usePaymentWidget(
    totalAmount,
    productName,
    customerName,
    customerEmail,
  );

  return (
    <>
      <Layout>
        <div className="border-b-2 border-solid border-black-12 mt-100">
          <div className="px-8 py-16 font-semibold text-22">1. 결제확인</div>
        </div>
        {cartInfo?.map((item: CartItem) => (
          <CartPay
            key={item.cartId}
            item={item}
            isChecked={checkedItems[item.cartId]}
            onCheckboxChange={handleCheckboxChange}
          />
        ))}
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

export default CheckoutCartPage;
