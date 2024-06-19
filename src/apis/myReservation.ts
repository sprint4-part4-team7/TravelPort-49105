import { ReservStatusType, Reservation } from '@/constants/types';
import instance from '@/utils/axios';

interface GetMyReservation {
  reservations: Reservation[];
  totalCount: number;
}

export const getMyReservation = async (
  userId: number,
  isExpired?: 'true' | 'false',
  pageNum?: number,
  limit?: number,
): Promise<GetMyReservation> => {
  const response = await instance.get(
    `/reservation/user/${userId}?offset=${pageNum}&limit=${limit}&isExpired=${isExpired}`,
  );
  return response.data;
};

export const putMyReservation = async (
  reservationId: number,
  status: ReservStatusType,
): Promise<void> => {
  await instance.put(`/reservation/${reservationId}`, { status });
};

export const deleteMyReservation = async (reservationId: number) => {
  await instance.delete(`/reservation/${reservationId}`);
};
