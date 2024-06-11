import { Reservation } from '@/constants/types';
import instance from '@/utils/axios';

export const getMyReservation = async (
  userId: number,
): Promise<Reservation[]> => {
  const response = await instance.get(`/reservation/user/${userId}`);
  return response.data;
};

export const putMyReservation = async (
  reservationId: number,
  status: string,
): Promise<void> => {
  await instance.put(`/reservation/${reservationId}`, { status });
};
