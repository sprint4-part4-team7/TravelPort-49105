import { loadPaymentWidget, ANONYMOUS } from '@tosspayments/payment-widget-sdk';
import { useEffect, useRef } from 'react';

interface PaymentWidget {
  renderPaymentMethods: (selector: string, options: any, config: any) => any;
  renderAgreement: (selector: string, options: any) => any;
  requestPayment: (options: any) => any;
}

const CheckoutPage = () => {
  const paymentWidgetRef = useRef<PaymentWidget | null>(null);
  const paymentMethodsWidgetRef = useRef<any>(null);
  const agreementWidgetRef = useRef<any>(null);

  useEffect(() => {
    (async () => {
      const paymentWidget = await loadPaymentWidget(
        process.env.REACT_APP_PAYMENT_WIDGET_KEY,
        ANONYMOUS,
      );

      if (paymentWidgetRef.current === null) {
        paymentWidgetRef.current = paymentWidget;
      }

      // 결제창 렌더링
      const paymentMethodsWidget =
        paymentWidgetRef?.current?.renderPaymentMethods(
          '#payment-method',
          { value: 1000 },
          { variantKey: 'DEFAULT' },
        );

      // 이용약관 렌더링
      agreementWidgetRef.current = paymentWidgetRef?.current?.renderAgreement(
        '#agreement',
        { variantKey: 'DEFAULT' },
      );

      paymentMethodsWidgetRef.current = paymentMethodsWidget;
    })();
  }, []);

  return (
    <div className="wrapper w-100">
      <div>상품이름: 7팀의 개멋찐 여행 상품</div>
      <br />
      <div>가격: 10,000원</div>
      <br />
      <div className="max-w-540 w-100">
        <div id="payment-method" className="w-100 " />
        <div id="agreement" className="w-100" />
        <div className="btn-wrapper w-100">
          <button
            type="button"
            className="btn primary w-100"
            onClick={async () => {
              const paymentWidget = paymentWidgetRef.current;

              try {
                // 결제하기
                await paymentWidget?.requestPayment({
                  orderId: 'CODEIT0001',
                  orderName: '7팀의 개멋찐 여행 상품',
                  customerName: '박지윤',
                  customerEmail: 'parkjiyun3706@gmail.com',
                  successUrl: `${window.location.origin}/payments/success${window.location.search}`,
                  failUrl: `${window.location.origin}/payments/fail${window.location.search}`,
                });
              } catch (error) {
                // TODO: 에러처리하기
              }
            }}
          >
            결제하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
