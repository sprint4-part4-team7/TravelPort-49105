import cartApi from '@/apis/cart';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

interface CartReservationByUserIdMutationProps {
  userId: any;
  cartIds: any;
}

const useCartReservationByUserIdMutation = () => {
  const queryClient = useQueryClient();
  const [datas, setData] = useState<any>();
  const [pId, setPaymnetId] = useState<number>(0);

  const mutation = useMutation({
    mutationFn: async ({
      userId,
      cartIds,
    }: CartReservationByUserIdMutationProps) => {
      return cartApi.postCartReservation(userId, cartIds);
    },
    onSuccess(data) {
      setData(data?.data[0]);
      setPaymnetId(data?.data[0].paymentId);
      queryClient.invalidateQueries({
        queryKey: ['getCartById'],
      });
    },
  });

  // 로딩 상태를 확인
  const isLoading = mutation.status === 'pending';

  // 'isLoading' 상태와 함께 'mutate' 함수도 함께 반환
  return { mutate: mutation.mutate, isLoading, datas, pId };
};

export default useCartReservationByUserIdMutation;
