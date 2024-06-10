import APPROVE from '@/assets/icons/check-circle.svg';
import ARROW from '@/assets/icons/arrowDown.svg';
import { useState } from 'react';
import Footer from '@/components/common/Footer';
import Layout from '@/components/common/layout/Layout';
import ReservationCard from '@/components/common/reservPagination/ResevationCard';

const ReservationManagement = () => {
  const [detail, setDetail] = useState(false);
  const [allApprove, setAllApprove] = useState(false);

  const handleDetail = () => {
    setDetail(!detail);
  };

  const handleAllApprove = () => {
    setAllApprove(!allApprove);
  };
  return (
    <>
      <Layout>
        <div className="flex flex-col gap-60 mt-60">
          <div className="flex flex-col gap-20">
            <div className="font-bold text-24">예약 관리</div>
            <input className="border-1 border-solid border-black-5 rounded-8 text-16" />
          </div>

          <div>
            <div className="flex py-24">
              <div className="flex justify-center items-center p-10 w-120 p-10 text-20 font-semibold">
                전체
              </div>
              <div className="flex justify-center items-center p-10 w-120 p-10 text-20 font-semibold">
                숙박
              </div>
              <div className="flex justify-center items-center p-10 w-120 p-10 text-20 font-semibold">
                체험
              </div>
              <div className="flex justify-center items-center p-10 w-120 p-10 text-20 font-semibold text-black-5">
                교통
              </div>
            </div>
            <div className="flex flex-col gap-24 border-1 border-solid border-black-7 rounded-8 p-16">
              <div className="flex gap-12">
                <div className="flex flex-col gap-12 w-full">
                  <div className="text-20 font-semibold">상품명</div>
                  <div className="text-14">상품 옵션</div>
                  <div className="text-16">예약 팀: n팀</div>
                </div>
                <button
                  type="button"
                  className="flex items-center justify-center"
                  onClick={handleDetail}
                >
                  {detail ? (
                    <img alt="openDetail" src={ARROW} />
                  ) : (
                    <img
                      className="-scale-y-100"
                      alt="closeDetail"
                      src={ARROW}
                    />
                  )}
                </button>
              </div>

              <div className="flex justify-end">
                {allApprove ? (
                  <div className="flex gap-10">
                    <button
                      type="button"
                      className="flex gap-4 items-center w-fit px-12 py-8 
                  font-semibold text-15 
                border-1 border-solid border-blue-6 rounded-8 text-blue-6"
                    >
                      승인됨
                    </button>
                    <button
                      type="button"
                      className="flex gap-4 items-center w-fit px-12 py-8 
                  font-semibold text-15 
                border-1 border-solid border-system-error rounded-8 text-system-error"
                      onClick={handleAllApprove}
                    >
                      승인 취소
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    className="flex gap-4 items-center w-fit px-12 py-8 
                  font-semibold text-15 
                border-1 border-solid border-blue-6 rounded-8 text-blue-6"
                    onClick={handleAllApprove}
                  >
                    모두 예약확정
                    <img alt="승인" src={APPROVE} />
                  </button>
                )}
              </div>
              {detail ? (
                <div className="flex flex-col gap-16">
                  <ReservationCard
                    id={1}
                    title="예약자명 / 예약 수량 / 예약 기간"
                    option="전화번호"
                    date="예약 신청일: 2023.01.01"
                  />
                  <ReservationCard
                    id={2}
                    title="예약자명 / 예약 수량 / 예약 기간"
                    option="전화번호"
                    date="2023.01.01"
                  />
                  <ReservationCard
                    id={3}
                    title="예약자명 / 예약 수량 / 예약 기간"
                    option="전화번호"
                    date="2023.01.01"
                  />
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </Layout>
      <Footer />
    </>
  );
};

export default ReservationManagement;
