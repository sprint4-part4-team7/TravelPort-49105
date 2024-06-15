import React, { useEffect, useState } from 'react';
import useCartByUserIdQuery from '@/hooks/reactQuery/cart/useCartByUserIdQuery';
import { useUserStore, useCartStore } from '@/utils/zustand';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/common/layout/Layout';
import Footer from '@/components/common/Footer';
import Button from '@/components/common/Button';
import CartList from '@/components/CartList';
import Loading from '@/components/common/Loading';

interface CartInfo {
  cartId: number;
  name: string;
  option: string;
  day: any;
  count: any;
  price: any;
  maxCount: number;
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

  useEffect(() => {
    if (cartData) {
      setCartItems(cartData);
    }
  }, [cartData]);

  const handleDelete = (cartId: number) => {
    setCartItems(cartItems.filter((item: any) => item.id !== cartId));
  };

  const handleSelect = (item: CartInfo, isSelected: boolean) => {
    setSelectedTotal((prevTotal) =>
      isSelected
        ? prevTotal + item.price * item.count
        : prevTotal - item.price * item.count,
    );

    setSelectedItems((prevSelectedItems) => {
      if (isSelected) {
        return [...prevSelectedItems, item];
      }
      return prevSelectedItems.filter(
        (selectedItem) => selectedItem.name !== item.name,
      );
    });
  };

  const handleCheckout = () => {
    setCartInfo(selectedItems);
    navigate('/payments/cart');
  };

  if (isLoading) return <Loading />;

  return (
    <div>
      <Layout>
        <div className="">
          <div className="flex flex-col w-full gap-12 ">
            <div className="border-b-2 border-solid border-black-12 mt-100">
              <div className="px-8 py-16 font-semibold text-22">장바구니</div>
            </div>
            <div className="flex tablet:flex-col mobile:flex-col gap-90">
              <div className="w-full mb-100">
                {cartData.map((item: any) => {
                  return (
                    <CartList
                      key={item.id}
                      item={item}
                      onSelect={handleSelect}
                      onDelete={handleDelete}
                    />
                  );
                })}
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
                  <Button
                    buttonStyle="font-normal text-16 p-12"
                    onClick={handleCheckout}
                  >
                    결제하기
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
      <Footer />
    </div>
  );
};

export default Cart;
