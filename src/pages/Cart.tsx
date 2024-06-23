/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// Cart.tsx
import React, { useCallback, useEffect, useState } from 'react';
import useCartByUserIdQuery from '@/hooks/reactQuery/cart/useCartByUserIdQuery';
import { useUserStore, useCartStore } from '@/utils/zustand';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/common/layout/Layout';
import Button from '@/components/common/button/Button';
import CartList from '@/components/cart/CartList';
import Loading from '@/components/common/Loading';

export interface CartInfo {
  cartId: number;
  name: string;
  option: string;
  day: any;
  count: number;
  price: number;
  maxCount: number;
  categoryId: number;
}

const Cart = () => {
  const navigate = useNavigate();
  const { userInfo } = useUserStore();
  const userId = userInfo?.id;
  const { cartData, isLoading } = useCartByUserIdQuery(userId);
  const [selectedItems, setSelectedItems] = useState<CartInfo[]>([]);
  const [selectedTotal, setSelectedTotal] = useState(0);
  const setCartInfo = useCartStore((state) => state.setCartInfo);
  const [cartItems, setCartItems] = useState<any>([]);
  const [totalPay, setTotalPay] = useState(0);
  const [totalCount, setTotalCount] = useState(1);

  useEffect(() => {
    if (cartData) {
      setCartItems(cartData);
    }
  }, [cartData]);

  const handlePriceChange = (totalPrice: number, count: number) => {
    setTotalPay(totalPrice);
    setTotalCount(count);
  };

  const handleDelete = (cartId: number) => {
    setCartItems(cartItems.filter((item: any) => item.id !== cartId));
  };

  const handleSelect = useCallback((item: CartInfo, isSelected: boolean) => {
    if (isSelected) {
      setSelectedItems((prevSelectedItems) => [...prevSelectedItems, item]);
      setSelectedTotal((prevTotal) => prevTotal + item.price * item.count);
    } else {
      setSelectedItems((prevSelectedItems) =>
        prevSelectedItems.filter(
          (selectedItem) => selectedItem.cartId !== item.cartId,
        ),
      );
      setSelectedTotal((prevTotal) => prevTotal - item.price * item.count);
    }
  }, []);

  const handleCheckout = () => {
    setCartInfo(selectedItems);
    navigate('/payments/cart');
  };

  if (isLoading) return <Loading />;
  return (
    <Layout>
      <div className="">
        <div className="flex flex-col w-full gap-12 ">
          <div className="border-b-2 border-solid border-black-12 mt-100">
            <div className="px-8 py-16 font-semibold text-22">장바구니</div>
          </div>
          <div className="flex tablet:flex-col mobile:flex-col gap-90">
            <div className="w-full mb-100">
              {cartData && cartData.length === 0 ? (
                <div className="flex items-center justify-center px-8 font-semibold pt-86 text-22 text-black-5">
                  장바구니가 비어있어요
                </div>
              ) : (
                cartData.map((item: CartInfo) => (
                  <CartList
                    key={item.cartId}
                    item={item}
                    onSelect={handleSelect}
                    onDelete={handleDelete}
                    onPriceChange={handlePriceChange}
                  />
                ))
              )}
            </div>
            <div className="flex flex-col gap-16 w-322 tablet:w-full mobile:w-full">
              <div className="flex flex-col p-16 gap-36 bg-black-3">
                <div className="flex flex-col gap-20 font-normal text-16 ">
                  <div className="flex items-center justify-between">
                    <p>상품 금액</p>
                    <p>{selectedTotal.toLocaleString()}원</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p>상품 할인 금액</p>
                    <p>0원</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="font-normal text-16">결제 예정 금액</p>
                  <p className="font-semibold text-20 ">
                    {selectedTotal.toLocaleString()}원
                  </p>
                </div>
              </div>
              <div>
                {selectedTotal === 0 ? (
                  <Button
                    buttonStyle="font-normal text-16 p-12"
                    onClick={handleCheckout}
                    disabled
                  >
                    결제하기
                  </Button>
                ) : (
                  <Button
                    buttonStyle="font-normal text-16 p-12"
                    onClick={handleCheckout}
                  >
                    결제하기
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
