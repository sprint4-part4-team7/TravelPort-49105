import { useNavigate, useSearchParams } from 'react-router-dom';
import './Payments.css';
import useReservationMutation from '@/hooks/reactQuery/reservation/useReservationMutation';
import { useEffect, useState } from 'react';
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

  const { userInfo } = useUserStore();
  const { cartInfo } = useCartStore();
  const cartIds = cartInfo.map((item) => ({ cartId: item.cartId }));
  const { reservationInfo } = useReservationStore();
  const [searchParams] = useSearchParams();
  const paymentKey = searchParams.get('paymentKey') ?? '';
  const orderId = searchParams.get('orderId') ?? '';
  const amount = parseInt(searchParams.get('amount') ?? '0', 10);

  const [isInitialized, setIsInitialized] = useState(false);
  const [isReservationPosted, setIsReservationPosted] = useState(false); // 상태 추가

  const confirm = () => {
    navigate('/');
  };

  const { mutate: createReservation, isLoading: reservationLoading } =
    useReservationMutation();
  const {
    mutate: cartReservation,
    datas: cartData,
    isLoading: cartLoading,
    pId,
  } = useCartReservationByUserIdMutation();
  const { mutate: sendPayments } = usePaymentPutMutation(cartIds);

  const handleCartReservationPost = async () => {
    const userId = userInfo?.id;
    if (userId) {
      cartReservation({
        userId,
        cartIds,
      });
    }
  };

  const handleReservationPost = async () => {
    if (reservationInfo.productOptionId !== 0 && !cartData) {
      createReservation({
        userId: reservationInfo.userId,
        productOptionId: reservationInfo.productOptionId,
        timeTableId: reservationInfo.timeTableId,
        reservationState: reservationInfo.reservationState,
        reservationPrice: reservationInfo.reservationPrice,
        ticketCount: reservationInfo.ticketCount,
        cancelMsg: reservationInfo.cancelMsg || '',
      });
      setIsReservationPosted(true);
    }
  };

  const handlePaymentPut = async (paymentId: number) => {
    sendPayments({
      paymentId,
      paymentKey,
      orderId,
      amount,
    });
  };

  useEffect(() => {
    if (!isInitialized && cartInfo.length > 0) {
      setIsInitialized(true);
      handleCartReservationPost();
    }
  }, [cartInfo, isInitialized]);

  useEffect(() => {
    if (cartData) {
      handlePaymentPut(pId);
    }
  }, [cartData, pId]);

  useEffect(() => {
    if (!cartData && !pId && !isReservationPosted) {
      handleReservationPost();
    }
  }, [cartData, pId, isReservationPosted]); // 의존성 배열에 isReservationPosted 추가

  if (reservationLoading || cartLoading) return <Loading />;

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
                onClick={confirm}
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
