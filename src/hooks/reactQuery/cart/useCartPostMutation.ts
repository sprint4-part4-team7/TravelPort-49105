import cartApi from '@/apis/cart';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface CartPostMutationProps {
  userId: number;
  productOptionId: number;
  timeTableId: number;
  ticketCount: number;
}

const useCartPostMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      userId,
      productOptionId,
      timeTableId,
      ticketCount,
    }: CartPostMutationProps) => {
      return cartApi.postCart(
        userId,
        productOptionId,
        timeTableId,
        ticketCount,
      );
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['useCartPostMutation'],
      });
    },
  });
  // 로딩 상태를 확인
  const isLoading = mutation.status === 'pending';

  // 'isLoading' 상태와 함께 'mutate' 함수도 함께 반환
  return { mutate: mutation.mutate, isLoading };
};

export default useCartPostMutation;
