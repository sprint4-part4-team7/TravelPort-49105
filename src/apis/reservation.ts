import instance from '@/utils/axios';

interface GetReservationUserProps {
  userId: number;
}

interface GetReservationProductOptionProps {
  productOptionId: number;
}

interface GetReservationManageProps {
  partnerId: number;
  categoryId: number;
}

interface PostReservationProps {
  userId: number;
  productOptionId: number;
  timeTableId: number;
  reservationState: string;
  reservationPrice: number;
  ticketCount: number;
  cancelMsg: string;
}

interface DeleteReservationProps {
  reservationId: number;
}

const getReservationUser = ({ userId }: GetReservationUserProps) => {
  return instance({
    url: `/reservation/use/${userId}`,
    method: 'GET',
  });
};

const getReservationManage = ({
  partnerId,
  categoryId,
}: GetReservationManageProps) => {
  return instance({
    url: `/reservation/partner/${partnerId}/category/${categoryId}`,
    method: 'GET',
  });
};

const getReservationProductOption = ({
  productOptionId,
}: GetReservationProductOptionProps) => {
  return instance({
    url: `/reservation/productOption${productOptionId}`,
    method: 'GET',
  });
};

const postReservation = ({
  userId,
  productOptionId,
  timeTableId,
  reservationState,
  reservationPrice,
  ticketCount,
  cancelMsg,
}: PostReservationProps) => {
  return instance({
    url: '/reservation',
    method: 'POST',
    data: {
      userId,
      productOptionId,
      timeTableId,
      reservationState,
      reservationPrice,
      ticketCount,
      cancelMsg,
    },
  });
};

const deleteReservation = ({ reservationId }: DeleteReservationProps) => {
  return instance({
    url: `/reservation/${reservationId}`,
    method: 'DELETE',
  });
};

export default {
  getReservationUser,
  getReservationProductOption,
  getReservationManage,
  postReservation,
  deleteReservation,
};
