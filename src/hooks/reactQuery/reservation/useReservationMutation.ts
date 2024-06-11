import { useMutation, useQueryClient } from '@tanstack/react-query';
import reservationApi from '@/apis/reservation';

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
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [reservationApi.postReservation],
      });
    },
  });

  // 'status'를 사용하여 로딩 상태를 확인할 수 있다 !
  const isLoading = mutation.status === 'pending';

  // 'isLoading' 상태와 함께 'mutate' 함수도 함께 반환 !
  return { mutate: mutation.mutate, isLoading };
};

export default useReservationMutation;
