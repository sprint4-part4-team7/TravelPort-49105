import { useMutation, useQueryClient } from '@tanstack/react-query';
import putPayment from '@/apis/payments';
import useCartDeleteByCartIdMutation from '@/hooks/reactQuery/cart/useCartDeleteByCartIdMutation';

interface PutPaymentParams {
  paymentId: number;
  paymentKey: string;
  orderId: string;
  amount: number;
}

const usePutPayment = (cartIds?: { cartId: number }[]) => {
  const queryClient = useQueryClient();
  const { mutate: cartDelete } = useCartDeleteByCartIdMutation();

  const mutation = useMutation({
    mutationFn: async ({
      paymentId,
      paymentKey,
      orderId,
      amount,
    }: PutPaymentParams) => {
      if (!paymentId) return null;
      return putPayment(paymentId, paymentKey, orderId, amount);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getCartById'],
      });

      if (cartIds && cartIds.length > 0) {
        cartIds.forEach(({ cartId }) => {
          cartDelete(cartId);
        });
      }

      alert('결제 확인 성공!');
    },
  });

  // 'status'를 사용하여 로딩 상태를 확인할 수 있다!
  const isLoading = mutation.status === 'pending';

  // 'isLoading' 상태와 함께 'mutate' 함수도 함께 반환!
  return { mutate: mutation.mutate, isLoading };
};

export default usePutPayment;
