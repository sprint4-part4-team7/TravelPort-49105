import instance from '@/utils/axios';

const getReservationUser = ({ userId }) => {
  return instance({
    url: `/reservation/use/${userId}`,
    method: 'GET',
  });
};

const getReservationProductOption = ({ productOptionId }) => {
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
}) => {
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

const deleteReservation = ({ reservationId }) => {
  return instance({
    url: `/reservation/${reservationId}`,
    method: 'DELETE',
  });
};

export default {
  getReservationUser,
  getReservationProductOption,
  postReservation,
  deleteReservation,
};
