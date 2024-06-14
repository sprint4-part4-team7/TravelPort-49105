import cartApi from '@/apis/cart';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface CartReservationByUserIdMutationProps {
  userId: any;
  cartIds: any;
}

const useCartReservationByUserIdMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      userId,
      cartIds,
    }: CartReservationByUserIdMutationProps) => {
      return cartApi.postCartReservation(userId, cartIds);
    },
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['useCartReservationByUserIdMutation'],
      });
    },
  });

  // 로딩 상태를 확인
  const isLoading = mutation.status === 'pending';

  // 'isLoading' 상태와 함께 'mutate' 함수도 함께 반환
  return { mutate: mutation.mutate, isLoading };
};

export default useCartReservationByUserIdMutation;
