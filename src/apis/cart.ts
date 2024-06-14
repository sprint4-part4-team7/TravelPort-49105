import instance from '@/utils/axios';

const getCartById = (userId: number) => {
  return instance({
    url: `/cart/user/${userId}`,
    method: 'GET',
  });
};

const postCart = (
  userId: number,
  productOptionId: number,
  timeTableId: number,
  ticketCount: number,
) => {
  return instance({
    url: `/cart`,
    method: 'POST',
    data: {
      userId,
      productOptionId,
      timeTableId,
      ticketCount,
    },
  });
};

const postCartReservation = (userId: number, cartId: number) => {
  return instance({
    url: `/cart/reservation?userId=${userId}`,
    method: 'POST',
    data: {
      cartId,
    },
  });
};

const deleteCartById = (cartId: number) => {
  return instance({
    url: `/cart/${cartId}`,
    method: 'DELETE',
  });
};

export default { getCartById, postCart, deleteCartById, postCartReservation };
