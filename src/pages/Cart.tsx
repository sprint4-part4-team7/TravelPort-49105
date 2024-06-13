import React from 'react';
import Layout from '@/components/common/layout/Layout';
import Footer from '@/components/common/Footer';
import Button from '@/components/common/Button';
import CartList from '@/components/CartList';

const Cart = () => {
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
                <CartList />
                <CartList />
                <CartList />
                <CartList />
                <CartList />
                <CartList />
              </div>
              <div className="flex flex-col gap-16 w-322 tablet:w-full mobile:w-full">
                <div className="flex flex-col p-16 gap-36 bg-black-3">
                  <div className="flex flex-col gap-20 font-normal text-16 ">
                    <div className="flex items-center justify-between">
                      <p>상품 금액</p>
                      <p>100000원</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p>상품 할인 금액</p>
                      <p>0원</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="font-normal text-16">결제 예정 금액</p>
                    <p className="font-semibold text-20 ">100000원</p>
                  </div>
                </div>
                <div>
                  <Button buttonStyle="font-normal text-16 p-12">
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
