import { useQuery } from '@tanstack/react-query';
import reservationApi from '@/apis/reservation';

interface GetReservationManageProps {
  partnerId: number;
  categoryId: number;
}

const useReservationManageQuery = ({
  partnerId,
  categoryId,
}: GetReservationManageProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [partnerId, categoryId],
    queryFn: () =>
      reservationApi.getReservationManage({ partnerId, categoryId }),
  });

  const reservedData = data?.data ?? [];

  return { reservedData, isLoading, error };
};

export default useReservationManageQuery;
