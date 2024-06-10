import APPROVE from '@/assets/icons/check-circle.svg';
import Footer from '@/components/common/Footer';
import Layout from '@/components/common/layout/Layout';
import ReservationCard from '@/components/common/reservPagination/ResevationCard';

const ReservationManagement = () => {
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
              <div className="p-10 text-20 font-semibold">전체</div>
              <div className="p-10 text-20 font-semibold">숙박</div>
              <div className="p-10 text-20 font-semibold">체험</div>
              <div className="p-10 text-20 font-semibold text-black-5">
                교통
              </div>
            </div>
            <div className="flex flex-col gap-24 border-1 border-solid border-black-7 rounded-8 p-16">
              <div className="flex flex-col gap-12">
                <div className="text-20 font-semibold">상품명</div>
                <div className="text-16">상품 옵션</div>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="flex gap-4 items-center w-fit px-12 py-8 text-15 
                border-1 border-solid border-blue-6 rounded-8 text-blue-6"
                >
                  모두 예약확정
                  <img alt="승인" src={APPROVE} />
                </button>
              </div>

              <div className="flex flex-col gap-16">
                <ReservationCard id={1} title="test" date="2023.01.01" />
                <ReservationCard id={2} title="test2" date="2023.01.01" />
                <ReservationCard id={3} title="test3" date="2023.01.01" />
              </div>
            </div>
          </div>
        </div>
      </Layout>
      <Footer />
    </>
  );
};

export default ReservationManagement;
