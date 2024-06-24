import { useEffect, useRef } from 'react';
import { loadPaymentWidget, ANONYMOUS } from '@tosspayments/payment-widget-sdk';

interface PaymentWidget {
  renderPaymentMethods: (selector: string, options: any, config: any) => any;
  renderAgreement: (selector: string, options: any) => any;
  requestPayment: (options: any) => any;
}

const generateRandomString = () =>
  window.btoa(Math.random().toString()).slice(0, 20);

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
    const initializeWidget = async () => {
      const paymentWidget = await loadPaymentWidget(
        process.env.REACT_APP_PAYMENT_WIDGET_KEY!, // 이 값이 문자열인지 확인
        ANONYMOUS,
      );

      // 결제창 렌더링, value(paymentAmount)가 숫자인지 확인
      paymentMethodsWidgetRef.current = paymentWidget.renderPaymentMethods(
        '#payment-method',
        { value },
        { variantKey: 'DEFAULT' },
      );

      // 이용약관 렌더링
      agreementWidgetRef.current = paymentWidget.renderAgreement('#agreement', {
        variantKey: 'DEFAULT',
      });

      // 결제 위젯 인스턴스 저장
      paymentWidgetRef.current = paymentWidget;
    };

    const observer = new MutationObserver(() => {
      const paymentMethodElement = document.getElementById('payment-method');
      const agreementElement = document.getElementById('agreement');
      if (paymentMethodElement && agreementElement) {
        observer.disconnect();
        initializeWidget();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      // 컴포넌트 언마운트 시 결제 위젯 정리
      if (
        paymentMethodsWidgetRef.current &&
        typeof paymentMethodsWidgetRef.current.destroy === 'function'
      ) {
        paymentMethodsWidgetRef.current.destroy();
      }
      if (
        agreementWidgetRef.current &&
        typeof agreementWidgetRef.current.destroy === 'function'
      ) {
        agreementWidgetRef.current.destroy();
      }
      paymentWidgetRef.current = null;

      observer.disconnect();
    };
  }, [value, productName, customerName, customerEmail]);

  const requestPayment = async () => {
    const paymentOptions = {
      orderId: generateRandomString(),
      orderName: productName,
      customerName,
      customerEmail,
      successUrl: `${window.location.origin}/payments/success${window.location.search}`, // 결제 성공 시 리다이렉션될 URL
      failUrl: `${window.location.origin}/payments/fail${window.location.search}`, // 결제 실패 시 리다이렉션될 URL
    };

    try {
      await paymentWidgetRef.current?.requestPayment(paymentOptions);
    } catch (error) {
      // console.error(error);
    }
  };

  return { requestPayment };
};

export default usePaymentWidget;
