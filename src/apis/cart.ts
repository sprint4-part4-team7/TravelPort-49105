import instance from '@/utils/Axios';

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
  price: number,
) => {
  return instance({
    url: `/cart`,
    method: 'POST',
    data: {
      userId,
      productOptionId,
      timeTableId,
      ticketCount,
      price,
    },
  });
};

const postCartReservation = (userId: number, cartIds: number) => {
  return instance({
    url: `/cart/reservation?userId=${userId}`,
    method: 'POST',
    data: cartIds,
  });
};

const deleteCartById = (cartId: number) => {
  return instance({
    url: `/cart/${cartId}`,
    method: 'DELETE',
  });
};

export default { getCartById, postCart, deleteCartById, postCartReservation };
