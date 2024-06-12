import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import './Payments.css';
import useReservationMutation from '@/hooks/reactQuery/reservation/useReservationMutation';
import { useEffect } from 'react';
import usePaymentPutMutation from '@/hooks/reactQuery/payment/usePaymentPutMutation';
import check from '@/assets/icons/check-circle-broken-pay.svg';
import Layout from '@/components/common/layout/Layout';
import Button from '@/components/common/Button';

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
            <img src={check} alt="성공 아이콘" />
            <div className="mt-32 font-bold text-32">결제가 완료되었습니다</div>
            <div className="flex w-full gap-28 mt-100 mobile:flex-col">
              <Button outlined buttonStyle="w-320 h-48 text-16 font-normal">
                내 예약 현황으로
              </Button>
              <Button
                buttonStyle="w-320 h-48 text-16 font-normal"
                onClick={() => confirm()}
              >
                더 둘러보기
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SuccessPage;
