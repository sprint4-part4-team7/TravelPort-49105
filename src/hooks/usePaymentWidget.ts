import { useEffect, useRef } from 'react';
import { loadPaymentWidget, ANONYMOUS } from '@tosspayments/payment-widget-sdk';

interface PaymentWidget {
  renderPaymentMethods: (selector: string, options: any, config: any) => any;
  renderAgreement: (selector: string, options: any) => any;
  requestPayment: (options: any) => any;
}

const usePaymentWidget = (
  value: number,
  productName: string,
  customerName: string,
  customerEmail: string,
) => {
  const paymentWidgetRef = useRef<PaymentWidget | null>(null);
  const paymentMethodsWidgetRef = useRef<any>(null);
  const agreementWidgetRef = useRef<any>(null);

  useEffect(() => {
    (async () => {
      const paymentWidget = await loadPaymentWidget(
        process.env.REACT_APP_PAYMENT_WIDGET_KEY!,
        ANONYMOUS,
      );

      if (!paymentWidgetRef.current) {
        paymentWidgetRef.current = paymentWidget;
      }

      // 결제창 렌더링, value(paymentAmount) 사용
      paymentMethodsWidgetRef.current = paymentWidget.renderPaymentMethods(
        '#payment-method',
        { value },
        { variantKey: 'DEFAULT' },
      );

      // 이용약관 렌더링
      agreementWidgetRef.current = paymentWidget.renderAgreement('#agreement', {
        variantKey: 'DEFAULT',
      });
    })();
  }, [value]);

  const requestPayment = async () => {
    const paymentOptions = {
      orderId: 'CODEIT0001',
      orderName: productName,
      customerName,
      customerEmail,
      successUrl: `${window.location.origin}/payments/success${window.location.search}`, // 결제 성공 시 리다이렉션될 URL
      failUrl: `${window.location.origin}/payments/fail${window.location.search}`, // 결제 실패 시 리다이렉션될 URL
    };

    try {
      await paymentWidgetRef.current?.requestPayment(paymentOptions);
    } catch (error) {
      // TODO: 에러 작성하기
    }
  };

  return { requestPayment };
};

export default usePaymentWidget;
