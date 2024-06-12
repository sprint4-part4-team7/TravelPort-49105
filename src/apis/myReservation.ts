import { Reservation } from '@/constants/types';
import instance from '@/utils/axios';

export const getMyReservation = async (
  userId: number,
  isExpired?: 'true' | 'false',
  pageNum?: number,
  limit?: number,
): Promise<Reservation[]> => {
  const response = await instance.get(
    `/reservation/user/${userId}?offset=${pageNum}&limit=${limit}&isExpired=${isExpired}`,
  );
  return response.data;
};

export const putMyReservation = async (
  reservationId: number,
  status: string,
): Promise<void> => {
  await instance.put(`/reservation/${reservationId}`, { status });
};
