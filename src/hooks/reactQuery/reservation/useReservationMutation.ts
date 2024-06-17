import { useMutation, useQueryClient } from '@tanstack/react-query';
import reservationApi from '@/apis/reservation';
import { useState } from 'react';
import { useCartStore } from '@/utils/zustand';

interface PostReservationProp {
  userId: number;
  productOptionId: number;
  timeTableId: number;
  reservationState: string;
  reservationPrice: number;
  ticketCount: number;
  cancelMsg: string;
}

const useReservationMutation = () => {
  const queryClient = useQueryClient();
  const [reservationResponse, setReservationResponse] = useState<any>(null);
  const resetCart = useCartStore((state) => state.resetCart);

  const mutation = useMutation({
    mutationFn: async ({
      userId,
      productOptionId,
      timeTableId,
      reservationState,
      reservationPrice,
      ticketCount,
      cancelMsg,
    }: PostReservationProp) => {
      return reservationApi.postReservation({
        userId,
        productOptionId,
        timeTableId,
        reservationState,
        reservationPrice,
        ticketCount,
        cancelMsg,
      });
    },
    onSuccess(data) {
      setReservationResponse(data);
      resetCart();
      queryClient.invalidateQueries({
        queryKey: [reservationApi.postReservation],
      });
    },
  });

  // 'status'를 사용하여 로딩 상태를 확인할 수 있다 !
  const isLoading = mutation.status === 'pending';

  const isError = mutation.status === 'error';

  // 'isLoading' 상태와 함께 'mutate' 함수도 함께 반환 !
  return { mutate: mutation.mutate, isLoading, reservationResponse, isError };
};

export default useReservationMutation;
