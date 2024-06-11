import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import './Payments.css';
import useReservationMutation from '@/hooks/reactQuery/reservation/useReservationMutation';
import { useEffect } from 'react';
import usePaymentPutMutation from '@/hooks/reactQuery/payment/usePaymentPutMutation';
import Layout from '@/components/common/layout/Layout';

const SuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [searchParams] = useSearchParams();
  const paymentKey = searchParams.get('paymentKey') ?? '';
  const orderId = searchParams.get('orderId') ?? '';
  const amount = parseInt(searchParams.get('amount') ?? '0', 10);

  function confirm() {
    navigate('/');
  }

  const { mutate: createReservation, isLoading } = useReservationMutation();
  const { mutate: sendPayments } = usePaymentPutMutation();

  const reservationPost = async () => {
    createReservation({
      userId: 1,
      productOptionId: 1,
      timeTableId: 1,
      reservationState: '예약 완료',
      reservationPrice: 30000,
      ticketCount: 0,
      cancelMsg: '오꼐이 ~!',
    });
  };

  const paymentPut = async () => {
    sendPayments({
      paymentId: 3,
      paymentKey,
      orderId,
      amount,
    });
  };

  useEffect(() => {
    if (location.pathname === '/payments/success' && location.search) {
      reservationPost();
      paymentPut();
    }
  }, []);

  if (isLoading) return <h1>loading...</h1>;

  return (
    <Layout>
      <div className="w-full">
        <div className="flex flex-col items-center w-full max-w-xl mx-auto">
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-semibold text-center">
              결제 요청까지 성공했어요.
            </h2>
            <br />
            <h4 className="text-lg text-center">
              <div>상품이름 : 7팀의 개멋찐 여행 상품</div>
              <br />
              <div>금액: 10,000원</div>
            </h4>
            <br />
            <button
              type="button"
              className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded cursor-pointer btn"
              onClick={confirm}
            >
              결제 승인 버튼 클릭
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SuccessPage;
