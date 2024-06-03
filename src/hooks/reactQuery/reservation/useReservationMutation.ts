import { useMutation, useQueryClient } from '@tanstack/react-query';
import reservationApi from '@/apis/reservation.api';

interface PostReservationProp {
  userId: number;
  productOptionId: number;
  timeTableId: number;
  reservationState: number;
  reservationPrice: number;
  ticketCount: number;
  cancelMsg: string;
}

const useReservationMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
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
      alert('성공 !');
    },
  });
};

export default useReservationMutation;
