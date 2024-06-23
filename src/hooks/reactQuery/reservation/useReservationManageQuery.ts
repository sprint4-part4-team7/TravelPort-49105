import { useQuery } from '@tanstack/react-query';
import reservationApi from '@/apis/reservation';

interface GetReservationManageProps {
  partnerId: number;
  categoryId: number;
  offset: number;
  limit: number;
  isNew: boolean;
}

interface ReservProps {
  reservations: any[];
  totalCount: number;
}

const useReservationManageQuery = ({
  partnerId,
  categoryId,
  offset,
  limit,
  isNew,
}: GetReservationManageProps) => {
  const order = isNew ? 'DESC' : 'ASC';
  const { data, isLoading, error } = useQuery({
    queryKey: [partnerId, categoryId, offset, isNew],
    queryFn: () =>
      reservationApi.getReservationManage({
        partnerId,
        categoryId,
        offset,
        limit,
        order,
      }),
  });

  const reservedData: ReservProps = data?.data ?? {
    reservations: [],
    totalCount: 0,
  };

  return { reservedData, isLoading, error };
};

export default useReservationManageQuery;
