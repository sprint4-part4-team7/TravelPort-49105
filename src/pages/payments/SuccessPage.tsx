import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import './Payments.css';
import useReservationMutation from '@/hooks/reactQuery/reservation/useReservationMutation';
import { useEffect } from 'react';
import usePaymentPutMutation from '@/hooks/reactQuery/payment/usePaymentPutMutation';
import check from '@/assets/icons/check-circle-broken-pay.svg';
import {
  useCartStore,
  useReservationStore,
  useUserStore,
} from '@/utils/zustand';
import useCartReservationByUserIdMutation from '@/hooks/reactQuery/cart/useCartReservationByUserIdMutation';
import Layout from '@/components/common/layout/Layout';
import Button from '@/components/common/Button';
import Loading from '@/components/common/Loading';

const SuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { userInfo } = useUserStore();
  const { cartInfo } = useCartStore();
  const cartIds = cartInfo.map((item) => ({ cartId: item.cartId }));
  const { reservationInfo } = useReservationStore();
  const [searchParams] = useSearchParams();
  const paymentKey = searchParams.get('paymentKey') ?? '';
  const orderId = searchParams.get('orderId') ?? '';
  const amount = parseInt(searchParams.get('amount') ?? '0', 10);

  function confirm() {
    navigate('/');
  }

  const {
    mutate: createReservation,
    isLoading,
    // reservationResponse,
  } = useReservationMutation();
  // TODO: reservationResponse에서 paymentId 꺼내기 (지금은 대이터가 다 날아가서 확인 불가)
  const { mutate: sendPayments } = usePaymentPutMutation();
  const {
    mutate: cartReservation,
    datas,
    isLoading: cartLoading,
  } = useCartReservationByUserIdMutation();
  const paymentIds = datas && datas.paymentId;

  const cartReservationPost = async () => {
    const userId = userInfo?.id;
    cartReservation({
      userId,
      cartIds,
    });
  };

  const reservationPost = async () => {
    createReservation({
      userId: reservationInfo?.userId,
      productOptionId: reservationInfo?.productOptionId,
      timeTableId: reservationInfo?.timeTableId,
      reservationState: reservationInfo?.reservationState,
      reservationPrice: reservationInfo?.reservationPrice,
      ticketCount: reservationInfo?.ticketCount,
      cancelMsg: reservationInfo?.cancelMsg || '',
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

  const cartPaymentPut = async () => {
    sendPayments({
      paymentId: paymentIds,
      paymentKey,
      orderId,
      amount,
    });
  };

  useEffect(() => {
    if (cartInfo || datas || paymentIds) {
      cartReservationPost();
      cartPaymentPut();
      // TODO: cartReservationPost() 성공 시 delete 하기
    } else if (location.pathname === '/payments/success' && location.search) {
      reservationPost();
      paymentPut();
    }
  }, []);

  if (isLoading || cartLoading || !datas || paymentIds) return <Loading />;

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
