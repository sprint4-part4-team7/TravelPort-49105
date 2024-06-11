import { useMutation, useQueryClient } from '@tanstack/react-query';
import putPayment from '@/apis/payments';

interface PutPaymentParams {
  paymentId: number;
  paymentKey: string;
  orderId: string;
  amount: number;
}

const usePutPayment = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      paymentId,
      paymentKey,
      orderId,
      amount,
    }: PutPaymentParams) => {
      return putPayment(paymentId, paymentKey, orderId, amount);
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['payments'], // 여기에 적절한 queryKey를 사용하여 관련 쿼리를 무효화하세요.
      });
      alert('결제 확인 성공!');
    },
  });

  // 'status'를 사용하여 로딩 상태를 확인할 수 있다!
  const isLoading = mutation.status === 'pending';

  // 'isLoading' 상태와 함께 'mutate' 함수도 함께 반환!
  return { mutate: mutation.mutate, isLoading };
};

export default usePutPayment;
