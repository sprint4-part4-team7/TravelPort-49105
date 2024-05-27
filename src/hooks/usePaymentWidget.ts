import { useEffect, useRef } from 'react';
import { loadPaymentWidget, ANONYMOUS } from '@tosspayments/payment-widget-sdk';

interface PaymentWidget {
  renderPaymentMethods: (selector: string, options: any, config: any) => any;
  renderAgreement: (selector: string, options: any) => any;
  requestPayment: (options: any) => any;
}

const usePaymentWidget = (value: number) => {
  // value의 타입을 number로 지정
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

  const requestPayment = async (options: any) => {
    try {
      await paymentWidgetRef.current?.requestPayment(options);
    } catch (error) {
      // TODO: 에러처리하기
    }
  };

  return { requestPayment };
};

export default usePaymentWidget;
